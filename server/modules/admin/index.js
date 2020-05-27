"use strict";
const { QueryTypes } = require("sequelize");
let lang = "fr";

const register = async (server, options) => {
  server.route({
    path: "/admin/explorers-count",
    method: "GET",
    handler: function (request, h) {
      const db = request.getDb("odyssee_teams");
      let replacements = { id_organisation: 1 }; // TODO: change id with session user orga

      return db.sequelize
        .query(
          "SELECT COUNT(id_user) as cnt_user FROM t_user WHERE id_organisation =:id_organisation",
          {
            replacements: replacements,
            type: QueryTypes.SELECT,
          }
        )
        .then((result) => {
          return {
            results: result[0],
          };
        });
    },
  });

  //missions en cours
  server.route({
    path: "/admin/current-mission",
    method: "GET",
    handler: function (request, h) {
      const db = request.getDb("odyssee_teams");
      let replacements = { id_organisation: 1 }; // TODO: change id with session user orga

      return db.sequelize
        .query(
          "select ts.nom as mission_name, ts.horodatage + INTERVAL '14 day' as mission_end from t_organisation org inner join t_semaine ts  on ts.id_semaine = org.id_semaine where id_organisation =:id_organisation",
          {
            replacements: replacements,
            type: QueryTypes.SELECT,
          }
        )
        .then((result) => {
          return {
            results: result[0],
          };
        });
    },
  });
};
exports.plugin = {
  register,
  pkg: require("./package.json"),
};
