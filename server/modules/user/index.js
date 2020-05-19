'use strict';
const { QueryTypes } = require('sequelize');
const baseUrl = '/user';
let lang = 'fr';

const register = async (server, options) => {
    server.route({
        path: baseUrl,
        method: 'GET',
        handler: async function (request, h) {
            const id_user = 1;
            const db = request.getDb('odyssee_teams');
            const params = request.query;
            let and_query = "";
            let replacements = { }, oneResult = false;
            if (params.mode && params.mode === 'current') {
                replacements['user'] = id_user;
                and_query = " AND a.id_user=:user";
                oneResult = true;
            }
            return db.sequelize.query("SELECT * FROM t_user a WHERE true" + and_query, { replacements: replacements, type: QueryTypes.SELECT }).then(result => {
                return oneResult ? result[0] : result;
            });
        }
    });
    server.route({
        path: baseUrl + '/medailles',
        method: 'GET',
        handler: function (request, h) {
            const id_user = 1;
            const db = request.getDb('odyssee_teams');
            let replacements = { lang: lang, user: id_user };
            
            return db.sequelize.query(`
                WITH w0 AS (
                    SELECT DISTINCT a.id_medaille, TRIM(a.image) AS image, TRIM(b.nom) AS nom 
                    FROM public.t_medaille a 
                        INNER JOIN public.t_libelle_i18n b ON a.id_medaille=b.id_table AND TRIM(b.code)='MEDAILLE' AND TRIM(b.lang)=:lang
                    WHERE a.actif
                )
                SELECT DISTINCT a.*, CASE WHEN b.id_user IS NOT NULL THEN true ELSE false END AS unlock
                FROM w0 a
                    LEFT JOIN public.h_gain_medaille b ON a.id_medaille=b.id_medaille AND b.id_user=:user
            `,{
                replacements: replacements, type: QueryTypes.SELECT
            }).then(result => {
                return {
                    results: result
                };
            });
        }
    });
    server.route({
        path: baseUrl + '/set-avatar',
        method: 'POST',
        handler: async function (request, h) {
            const id_user = 1;
            const db = request.getDb('odyssee_teams');
            let body = request.payload;
            if (!body) {
                return { results: false };
            }
            let replacements = { user: id_user, avatar: (body.id_avatar > 0 ? body.id_avatar : NULL) };
            
            return db.sequelize.query(`UPDATE public.t_user SET id_avatar=:avatar WHERE id_user=:user;`,{
                replacements: replacements, type: QueryTypes.UPDATE
            }).then(() => {
                return {
                    results: true
                };
            });
        }
    });
    server.route({
        path: baseUrl + '/set-medaille-avatar',
        method: 'POST',
        handler: async function (request, h) {
            const id_user = 1;
            const db = request.getDb('odyssee_teams');
            let body = request.payload;
            if (!body) {
                return { results: false };
            }
            let replacements = { user: id_user, medaille: (body.id_medaille > 0 ? body.id_medaille : NULL) };
            
            return db.sequelize.query(`UPDATE public.t_user SET id_medaille_avatar=:medaille WHERE id_user=:user;`,{
                replacements: replacements, type: QueryTypes.UPDATE
            }).then(() => {
                return {
                    results: true
                };
            });
        }
    });
};
exports.plugin = {
    register,
    pkg: require('./package.json')
};
