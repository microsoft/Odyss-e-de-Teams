"use strict";
const baseUrl = "/organisation";

const register = async (server, options) => {
  server.route({
    path: baseUrl + "/infos",
    method: "GET",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const Organisation = db.getModel("Organisation");

      if (!request.query.id_organisation) return false;
      if (!request.state.oid_ad) {
        return false;
      }

      let replacements = { id_organisation: request.query.id_organisation };

      const res = await Organisation.findOne({
        where: {
          id_organisation: request.query.id_organisation,
        },
      });

      if (!res) return false;

      return res;
    },
  });
};
exports.plugin = {
  register,
  pkg: require("./package.json"),
};
