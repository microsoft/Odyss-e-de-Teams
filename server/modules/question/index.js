'use strict';
const { QueryTypes } = require('sequelize');

const register = async (server, options) => {
    server.route({
        path: '/questions',
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
};
exports.plugin = {
    register,
    pkg: require('./package.json')
};
