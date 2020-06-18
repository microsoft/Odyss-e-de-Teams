'use strict';
const { QueryTypes } = require('sequelize');
const baseUrl = '/classement';
const ClassementUtils = require("./../../utils/Classement");
let lang = 'fr';

const register = async (server, options) => {
    server.route({
        path: baseUrl,
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
            const id_organisation = currentUserByAD.id_organisation;
            const id_user = currentUserByAD.id_user;
            const params = request.query;
            let replacements = { lang: lang }, order_query = '';
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

            let main_query = ClassementUtils.GetMainQuery(params, order_query);
            if (params.limit) {
                main_query += ' LIMIT :limit';
                replacements['limit'] = +params.limit;
            }
            
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
