"use strict";

import {TableDefinition, TableContext} from "./types-puntapie-inicial";

export function ejemplo_noticias(context:TableContext):TableDefinition{
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
            {name:'fecha'            , typeName:'date'    , nullable:false},
            {name:'formato'          , typeName:'text'    , options:['plano', 'md', 'html', 'jade']},
            {name:'texto'            , typeName:'text'    },
            {name:'publicar'         , typeName:'boolean' , editable:admin },
            {name:'autor'            , typeName:'text'    },
            {name:'redactor'         , typeName:'text'    , editable:false, specialColumn:'currentUsername'},
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
            where:admin || context.forDump?'true':`(redactor = ${context.be.db.quoteNullable(context.user.usuario)} OR publicar)`
        }
    };
}
