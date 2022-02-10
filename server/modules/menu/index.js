'use strict';
const { QueryTypes } = require('sequelize');

const register = async (server, options) => {
    server.route({
        path: '/menu',
        method: 'GET',
        handler: async function (request, h) {
            if (!request.state.oid_ad) return false;
            const db = request.getDb('odyssee_teams');
            const User = db.getModel('User');
            const currentUserByAD = await User.findOne({
                where: {
                    oid_ad: request.state.oid_ad
                }
            });
            const id_user = currentUserByAD.id_user;
            const id_role = currentUserByAD.id_role;
            const params = request.query;
            const lang = params.language;
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
