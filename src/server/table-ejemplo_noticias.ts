"use strict";

import {TableDefinition, TableContext, AppBackend} from "./types-puntapie-inicial";

export function getPolicies(be:AppBackend){
    return {
        select:{ using: `${be.dbUserRolExpr} = 'admin' or redactor = ${be.dbUserNameExpr} or publicar`},
        all:{ using: `${be.dbUserRolExpr} = 'admin' or redactor = ${be.dbUserNameExpr} and publicar is not true` }
    }
}

export function ejemplo_noticias(context:TableContext):TableDefinition{
    var be = context.be;
    var admin = context.user.rol==='admin';
    var redactor = context.user.rol==='redactor';
    return {
        name:'ejemplo_noticias',
        elementName:'noticia', 
        title:'Noticias', // solo si es distinto al "name", si es igual se puede omitir
        editable:admin || redactor,
        fields:[
            {name:'url'              , typeName:'text'    }, 
            {name:'titulo'           , typeName:'text'    , nullable:false},
            {name:'fecha'            , typeName:'date'    , nullable:false, specialDefaultValue:'current_date'},
            {name:'formato'          , typeName:'text'    , options:['plano', 'md', 'html', 'jade']},
            {name:'texto'            , typeName:'text'    },
            {name:'publicar'         , typeName:'boolean' , editable:admin },
            {name:'autor'            , typeName:'text'    },
            {name:'redactor'         , typeName:'text'    , editable:false, specialValueWhenInsert:'currentUsername'},
        ],
        primaryKey:['url'],
        foreignKeys:[
            {references:'usuarios', fields:[{source:'redactor', target:'usuario'}]}
        ],
        constraints:[
            {constraintType:'unique', fields:['titulo']}
        ],
        detailTables:[
            {table:'ejemplo_vinculos', fields:['url'], abr:'V'}
        ],
        sql:{
            /* 
               ATENCIÓN
               --------
               Las pólicies son algo nuevo en backend-plus, utilizan las policies de PostgreSQL: https://www.postgresql.org/docs/9.5/ddl-rowsecurity.html
               Permiten cambiar los permisos en función del contenido de cada registro.

               Como son nuevas es complicado de usarlas, hay que definir todo a mano.
               Más adelante la forma de hacer esto puede cambiar o pueden haber herramientas que lo hagan más simple.
               
            */
            policies:getPolicies(be)
        }
    };
}
