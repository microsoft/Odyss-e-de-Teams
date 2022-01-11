"use strict";
const baseUrl = "/organisation";

const register = async (server, options) => {
  server.route({
    path: baseUrl + "/infos",
    method: "GET",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const Organisation = db.getModel("Organisation");

      // check oid_ad is present in request
      if (!request.state.oid_ad) {
        return false;
      }

      // Look for user
      const currentUserByAD = await User.findOne({
        where: {
          oid_ad: request.state.oid_ad,
        },
      });

      if (!currentUserByAD) {
        return false;
      }

      const res = await Organisation.findOne({
        where: {
          id_organisation: currentUserByAD.id_organisation,
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
