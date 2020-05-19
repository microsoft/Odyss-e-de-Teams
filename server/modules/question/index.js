'use strict';
const { QueryTypes } = require('sequelize');
const baseUrl = '/question';
let lang = 'fr';

const register = async (server, options) => {
    server.route({
        path: baseUrl + '/questionnaire',
        method: 'GET',
        handler: function (request, h) {
            /* const db = request.getDb('odyssee_teams');
            const params = request.query;
            let limit_query = '', and_query = '', replacements = {};
            if (params.limit && params.limit > 0) {
                limit_query = ' LIMIT :limit';
                replacements['limit'] = +params.limit;
            }
            if (params.query) {
                and_query = " AND LOWER(TRIM(a.nom)) LIKE :q";
                replacements['q'] = params.query + '%';
            }
            return db.sequelize.query("SELECT a.id_activite, TRIM(a.nom) AS nom FROM t_activite a WHERE a.actif" + and_query + " ORDER BY a.ordre" + limit_query,{
                replacements: replacements, type: QueryTypes.SELECT
            }).then(result => {
                return {
                    results: result
                };
            }); */
            return [];
        }
    });
    server.route({
        path: baseUrl + '/modules',
        method: 'GET',
        handler: function (request, h) {
            const db = request.getDb('odyssee_teams');
            let replacements = { lang: lang };
            
            return db.sequelize.query("SELECT DISTINCT a.id_module, TRIM(b.nom) AS nom FROM public.t_module a INNER JOIN public.t_libelle_i18n b ON a.id_module=b.id_table AND TRIM(b.code)='MODULE' AND TRIM(b.lang)=:lang WHERE a.actif ORDER BY TRIM(b.nom)",{
                replacements: replacements, type: QueryTypes.SELECT
            }).then(result => {
                return {
                    results: result
                };
            });
        }
    });
    server.route({
        path: baseUrl + '/niveaux',
        method: 'GET',
        handler: function (request, h) {
            const db = request.getDb('odyssee_teams');
            let replacements = { lang: lang };
            
            return db.sequelize.query("SELECT a.id_niveau, TRIM(b.nom) AS nom FROM public.t_niveau a INNER JOIN public.t_libelle_i18n b ON a.id_niveau=b.id_table AND TRIM(b.code)='NIVEAU' AND TRIM(b.lang)=:lang WHERE a.actif ORDER BY a.ordre",{
                replacements: replacements, type: QueryTypes.SELECT
            }).then(result => {
                return {
                    results: result
                };
            });
        }
    });
};
exports.plugin = {
    register,
    pkg: require('./package.json')
};
