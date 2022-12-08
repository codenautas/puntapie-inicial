"use strict";

// import * as Path from 'path';
import { AppBackend, ExpressPlus, Context, Request, 
    ClientModuleDefinition, OptsClientPage, MenuDefinition, MenuInfoBase
} from "backend-plus";
import * as MiniTools from 'mini-tools';

// import {changing} from 'best-globals';

import {ProceduresPuntapieInicial} from "./procedures-puntapie-inicial";

import { ejemplo_noticias } from './table-ejemplo_noticias';
import { ejemplo_vinculos } from './table-ejemplo_vinculos';
import { usuarios   } from './table-usuarios';

import {staticConfigYaml} from './def-config';

function json(sql:string, orderby:string){
    return `COALESCE((SELECT jsonb_agg(to_jsonb(j.*) ORDER BY ${orderby}) from (${sql}) as j),'[]'::jsonb)`
}


export class AppPuntapieInicial extends AppBackend{
    constructor(){
        super();
    }
    async postConfig(){
        await super.postConfig();
    }
    configStaticConfig(){
        super.configStaticConfig();
        this.setStaticConfig(staticConfigYaml);
    }
    addSchrödingerServices(mainApp:ExpressPlus, baseUrl:string){
        var be=this;
        if(baseUrl=='/'){
            baseUrl='';
        }   
        mainApp.get(baseUrl+'/pub',async function(req,res,_next){
            // @ts-ignore useragent existe
            var {useragent} = req;
            var htmlMain=be.mainPage({useragent}, false, {skipMenu:true}).toHtmlDoc();
            MiniTools.serveText(htmlMain,'html')(req,res);
        });
        super.addSchrödingerServices(mainApp, baseUrl);
    }
    addUnloggedServices(mainApp:ExpressPlus, baseUrl:string){
        var be=this;
        if(baseUrl=='/'){
            baseUrl='';
        }   
        mainApp.get(baseUrl+'/ejemplo_publicaciones.js',async function(req,res,_next){
            var publicaciones = await be.inDbClient(req as Request, async function(client){
                var result = await client.query(`
                    SELECT url, titulo, texto, formato, fecha, autor, 
                            ${json(`SELECT vinculo, orden FROM ejemplo_vinculos v WHERE v.url=n.url `,'orden')} as vinculos
                        FROM ejemplo_noticias n
                        WHERE publicar
                            AND fecha <= current_date
                        ORDER BY fecha DESC
                `).fetchAll();
                console.log(result);
                return result.rows;
            });
            console.log(publicaciones);
            var publicaciones_js = 'var ejemplo_publicaciones = '+JSON.stringify(publicaciones);
            console.log(publicaciones_js);
            MiniTools.serveText(publicaciones_js,'text/javascript')(req, res);
        });
        super.addUnloggedServices(mainApp, baseUrl);
    }
    async getProcedures(){
        var be = this;
        return [
            ...await super.getProcedures(),
            ...ProceduresPuntapieInicial
        ].map(be.procedureDefCompleter, be);
    }
    getMenu(context:Context):MenuDefinition{
        var menuContent:MenuInfoBase[]=[
            {menuType:'menu', name:'redaccion', label:'redacción',  menuContent:[
                {menuType:'table', name:'ejemplo_noticias', label:'noticias', selectedByDefault:true},
                {menuType:'proc' , name:'ejemplo_publicar_propios', label:'publicar'},
            ]},
        ];
        if(context.user && context.user.rol=="admin"){
            menuContent.push(
                {menuType:'menu', name:'config', label:'configurar', menuContent:[
                    {menuType:'table', name:'usuarios'  },
                ]}
            )
        };
        return {menu:menuContent};
    }
    clientIncludes(req:Request|null, opts:OptsClientPage):ClientModuleDefinition[]{
        var UsandoREact = true;
        var menuedResources:ClientModuleDefinition[]=req && opts && !opts.skipMenu ? [
            { type:'js' , src:'client.js' },
        ]:[
            {type:'js' , src:'unlogged.js' },
        ];
        var list: ClientModuleDefinition[] = [
            ...(UsandoREact?[
                { type: 'js', module: 'react', modPath: 'umd', fileDevelopment:'react.development.js', file:'react.production.min.js' },
                { type: 'js', module: 'react-dom', modPath: 'umd', fileDevelopment:'react-dom.development.js', file:'react-dom.production.min.js' },
                { type: 'js', module: '@mui/material', modPath: 'umd', fileDevelopment:'material-ui.development.js', file:'material-ui.production.min.js' },
                { type: 'js', module: 'material-styles', fileDevelopment:'material-styles.development.js', file:'material-styles.production.min.js' },
                { type: 'js', module: 'clsx', file:'clsx.min.js' },
                { type: 'js', module: 'redux', modPath:'../dist', fileDevelopment:'redux.js', file:'redux.min.js' },
                { type: 'js', module: 'react-redux', modPath:'../dist', fileDevelopment:'react-redux.js', file:'react-redux.min.js' },
            ]:[]) satisfies ClientModuleDefinition[],
            ...super.clientIncludes(req, opts),
            ...(UsandoREact?[
                { type: 'js', module: 'redux-typed-reducer', modPath:'../dist', file:'redux-typed-reducer.js' },
                { type: 'js', src: 'adapt.js' },
            ]:[])  satisfies ClientModuleDefinition[],
            { type: 'js', src: 'ejemplo_publicaciones.js' },
            { type: 'js', src: 'pub-puntapie-inicial.js' },
            { type: 'css', file: 'pub-puntapie-inicial.css' },
            { type: 'css', file: 'menu.css' },
            ... menuedResources
        ] satisfies ClientModuleDefinition[];
        return list;
    }
    prepareGetTables(){
        super.prepareGetTables();
        this.getTableDefinition={
            ... this.getTableDefinition,
            usuarios  ,    
            ejemplo_noticias,    
            ejemplo_vinculos,    
        }
    }       
}
