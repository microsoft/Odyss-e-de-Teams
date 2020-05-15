'use strict';
const { QueryTypes } = require('sequelize');

const register = async (server, options) => {
    server.route({
        path: '/user',
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
};
exports.plugin = {
    register,
    pkg: require('./package.json')
};
