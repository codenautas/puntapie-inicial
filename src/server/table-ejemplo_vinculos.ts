"use strict";

import {TableDefinition, TableContext} from "./types-puntapie-inicial";

export function ejemplo_vinculos(context:TableContext):TableDefinition{
    var admin = context.user.rol==='admin';
    var redactor = context.user.rol==='redactor';
    return {
        name:'ejemplo_vinculos',
        elementName:'vínculo', 
        title:'vínculos', // solo si es distinto al "name", si es igual se puede omitir
        editable:admin || redactor,
        fields:[
            {name:'url'              , typeName:'text'    }, 
            {name:'orden'            , typeName:'bigint'  , nullable:false, specialDefaultValue:'next_number'},
            {name:'vinculo'          , typeName:'text'    , nullable:false},
        ],
        primaryKey:['url','vinculo'],
        foreignKeys:[
            {references:'ejemplo_noticias', fields:['url']}
        ],
        constraints:[
            {constraintType:'unique', fields:['url','vinculo']}
        ],
        sortColumns:[{column:'url', order:1},{column:'orden', order:1}]
    };
}
