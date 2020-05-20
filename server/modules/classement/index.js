'use strict';
const { QueryTypes } = require('sequelize');
const baseUrl = '/classement';
let lang = 'fr';

const register = async (server, options) => {
    server.route({
        path: baseUrl,
        method: 'GET',
        handler: async function (request, h) {
            const id_organisation = 1;
            const id_user = 1;
            const db = request.getDb('odyssee_teams');
            const params = request.query;
            let replacements = {}, order_query = '', oneResult = false;
            switch (params.mode) {
                case 'point':
                    order_query = 'nb_point';
                    break;
                case 'xp':
                    order_query = 'nb_xp';
                    break;
                default:
                    return { results: false };
            }
            if (!params.monde) {
                replacements['organisation'] = id_organisation;
            }
            let main_query = `
                WITH w0 AS (
                    SELECT DISTINCT a.id_user, TRIM(a.nom) , a.niveau, a.nb_point, a.nb_xp, a.nb_reponse, a.nb_reponse_ok, a.nb_questionnaire_complete
                    FROM public.t_user a 
                    WHERE a.actif AND a.id_role=1 ` + (params.monde ? `` : ` AND a.id_organisation=:organisation`) + `
                ), w_medaille AS (
                    SELECT DISTINCT a.id_user, COUNT(*) AS nb
                    FROM public.h_gain_medaille a
                    GROUP BY a.id_user
                )
                SELECT DISTINCT row_number() OVER (ORDER BY `+ order_query + `) AS rang, a.*, COALESCE(b.nb, 0) AS nb_medaille
                FROM w0 a
                    LEFT JOIN w_medaille b ON a.id_user=b.id_user
                WHERE true `;
            return db.sequelize.query(main_query, { replacements: replacements, type: QueryTypes.SELECT }).then(result => {
                if (params.user) {
                    return result.filter(c => c.id_user === id_user)[0];
                }
                return result;
            });
        }
    });
};
exports.plugin = {
    register,
    pkg: require('./package.json')
};
