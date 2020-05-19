'use strict';
const { QueryTypes } = require('sequelize');
let lang = 'fr';

const register = async (server, options) => {
    server.route({
        path: '/avatars',
        method: 'GET',
        handler: function (request, h) {
            const db = request.getDb('odyssee_teams');
            let replacements = { lang: lang };
            
            return db.sequelize.query("SELECT a.id_avatar, TRIM(a.image) AS image, TRIM(b.nom) AS nom FROM public.t_avatar a INNER JOIN public.t_libelle_i18n b ON a.id_avatar=b.id_table AND TRIM(b.code)='AVATAR' AND TRIM(b.lang)=:lang WHERE a.actif ORDER BY TRIM(b.nom)",{
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
