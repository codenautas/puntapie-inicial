"use strict";

import { ProcedureContext, ProcedureDef } from './types-puntapie-inicial';

export const ProceduresPuntapieInicial:ProcedureDef[] = [
    {
        action:'ejemplo_publicar_propios',
        parameters:[
            {name:'hasta_fecha', typeName:'date', specialDefaultValue:'current_date'}
        ],
        proceedLabel:'publicar',
        coreFunction:async function(context:ProcedureContext, parameters:any){
            const {client} = context;
            var result = await client.query(`
                UPDATE ejemplo_noticias
                    SET publicar = TRUE
                    WHERE publicar IS NOT TRUE
                        AND redactor = $1
                        AND current_date <= $2
                    RETURNING TRUE
            `,[context.username, parameters.hasta_fecha]).fetchAll();
            return !result.rows.length ? 'No había noticias sin publicar hasta esa fecha para usted':(
                result.rows.length==1?'se publicó una noticia':'se publicaron '+result.rows.length+' noticias'
            );
        }
    },
];
