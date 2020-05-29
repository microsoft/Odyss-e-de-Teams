'use strict';
const { QueryTypes } = require('sequelize');
const baseUrl = '/question';
let lang = 'fr';

const register = async (server, options) => {
    server.route({
        path: baseUrl + '/quizz',
        method: 'GET',
        handler: async function (request, h) {
            const db = request.getDb("odyssee_teams");
            const User = db.getModel("User");
            if (!request.state.oid_ad) {
                return false;
            }
            let currentUserByAD = await User.findOne({
                where: {
                oid_ad: request.state.oid_ad,
                },
            });
            if (!currentUserByAD) {
                return false;
            }
            let replacements = {
                'limit': 3
            };
            let main_query = `
                SELECT DISTINCT a.id_question, a.id_module, a.id_thematique, a.id_niveau, a.id_mecanique, TRIM(a.nom) AS nom FROM public.t_question a WHERE a.actif LIMIT :limit
            `;
            const resultIdQuestion = await db.sequelize.query("SELECT DISTINCT array_agg(id_question) AS ids FROM (" + main_query + ")s0", { replacements: replacements, type: QueryTypes.SELECT, plain: true });
            const tabIdQuestion = resultIdQuestion['ids'];

            const resultReponse = await db.sequelize.query("SELECT DISTINCT a.id_reponse, a.id_question, TRIM(a.nom) AS nom FROM public.t_reponse a WHERE a.actif", { replacements: replacements, type: QueryTypes.SELECT });
            const listReponse = resultReponse;
            console.log(listReponse);

            return db.sequelize.query(main_query,{
                replacements: replacements, type: QueryTypes.SELECT
            }).then(result => {
                result.forEach(dataQuestion => {
                    dataQuestion['listReponse'] = listReponse.filter(r => r.id_question === dataQuestion.id_question);
                });
                return {
                    results: result
                };
            });
        }
    });
    server.route({
        path: baseUrl + '/modules',
        method: 'GET',
        handler: function (request, h) {
            const db = request.getDb('odyssee_teams');
            let replacements = { lang: lang };
            
            return db.sequelize.query("SELECT DISTINCT a.id_module, TRIM(b.nom) AS nom, a.image FROM public.t_module a INNER JOIN public.t_libelle_i18n b ON a.id_module=b.id_table AND TRIM(b.code)='MODULE' AND TRIM(b.lang)=:lang WHERE a.actif ORDER BY TRIM(b.nom)",{
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
