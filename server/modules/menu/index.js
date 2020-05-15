'use strict';
const { QueryTypes } = require('sequelize');

const register = async (server, options) => {
    server.route({
        path: '/menu',
        method: 'GET',
        handler: async function (request, h) {
            const id_user = 1;
            const id_role = 1;
            const lang = 'fr';
            const db = request.getDb('odyssee_teams');
            const params = request.query;
            let mainReplacements = { 'user': (+id_user).toString(), 'role': (+id_role).toString(), 'lang': lang };
            const resultMain = await db.sequelize.query("SELECT main_query FROM public.f_v_menu_user(:user, :role, :lang, NULL)", { replacements: mainReplacements, type: QueryTypes.SELECT, plain: true });
            let main_query = resultMain['main_query'];
            return db.sequelize.query(main_query, {
                type: QueryTypes.SELECT
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
