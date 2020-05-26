"use strict";
const { QueryTypes } = require("sequelize");
let lang = "fr";

const register = async (server, options) => {
  server.route({
    path: "/admin/explorers-count",
    method: "GET",
    handler: function (request, h) {
      const db = request.getDb("odyssee_teams");
      let replacements = { id_organisation: 1 };

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
};
exports.plugin = {
  register,
  pkg: require("./package.json"),
};
