"use strict";
const { QueryTypes } = require("sequelize");
const baseUrl = "/agenda";
let lang = "fr";

const register = async (server, options) => {
  server.route({
    path: baseUrl,
    method: "GET",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      if (!request.state.oid_ad) {
        return false;
      }
      let currentUserByAD = await User.findOne({
        where: {
          oid_ad: request.state.oid_ad,
        },
      });
      if (!currentUserByAD) {
        return false;
      }

      const params = request.query;
      let replacements = {
        organisation: currentUserByAD.id_organisation,
        lang: params.language
      };
      let oneResult = false;
      let main_query = `
                WITH wdone AS (
                    SELECT DISTINCT *
                    FROM public.h_agenda_done
                    WHERE id_organisation=:organisation
                )
                SELECT DISTINCT a.id_agenda, TRIM(b.nom) AS nom, a.date_agenda, CASE WHEN c.id_agenda_done IS NOT NULL THEN true ELSE false END AS done 
                FROM public.t_agenda a
                    INNER JOIN public.t_libelle_i18n b ON a.id_agenda=b.id_table AND TRIM(b.code)='AGENDA' AND TRIM(b.lang)=:lang
                    LEFT JOIN wdone c ON a.id_agenda=c.id_agenda 
                WHERE true`;
      if (params.mode && params.mode === "nb_restant") {
        main_query =
          "SELECT COUNT(*) AS nb FROM (" +
          main_query +
          " AND c.id_agenda_done IS NULL)s0";
        oneResult = true;
      }
      return db.sequelize
        .query(main_query, {
          replacements: replacements,
          type: QueryTypes.SELECT,
        })
        .then((result) => {
          return oneResult ? result[0] : result;
        });
    },
  });
  server.route({
    path: baseUrl + "/createByAD",
    method: "POST",
    handler: async function (request, h) {
      const body = request.payload;
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const current_oid_ad =
        body && body.ad && body.ad.idToken
          ? body.ad.idToken.oid
          : request.state.oid_ad;
      if (!current_oid_ad) {
        return false;
      }
      let currentUserByAD = await User.findOne({
        where: {
          oid_ad: current_oid_ad,
        },
      });
      if (currentUserByAD) {
        return currentUserByAD;
      }
      currentUserByAD = await User.create({
        id_organisation: 1,
        oid_ad: body.ad.idToken.oid,
        id_role: 1,
        id_avatar: body.id_avatar,
        nom: body.ad.name,
        actif: true,
      });
      return currentUserByAD;
    },
  });
  server.route({
    path: baseUrl + "/medailles",
    method: "GET",
    handler: async function (request, h) {
      if (!request.state.oid_ad) return false;
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const currentUserByAD = await User.findOne({
        where: {
          oid_ad: request.state.oid_ad,
        },
      });
      const id_user = currentUserByAD.id_user;
      let replacements = { lang: lang, user: id_user };

      return db.sequelize
        .query(
          `
                WITH w0 AS (
                    SELECT DISTINCT a.id_medaille, TRIM(a.image) AS image, a.legendaire, TRIM(b.nom) AS nom, TRIM(b.description) AS description 
                    FROM public.t_medaille a 
                        INNER JOIN public.t_libelle_i18n b ON a.id_medaille=b.id_table AND TRIM(b.code)='MEDAILLE' AND TRIM(b.lang)=:lang
                    WHERE a.actif
                )
                SELECT DISTINCT a.*, CASE WHEN b.id_user IS NOT NULL THEN true ELSE false END AS unlock
                FROM w0 a
                    LEFT JOIN public.h_gain_medaille b ON a.id_medaille=b.id_medaille AND b.id_user=:user
            `,
          {
            replacements: replacements,
            type: QueryTypes.SELECT,
          }
        )
        .then((result) => {
          return {
            results: result,
          };
        });
    },
  });
  server.route({
    path: baseUrl + "/set-avatar",
    method: "POST",
    handler: async function (request, h) {
      if (!request.state.oid_ad) return false;
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const currentUserByAD = await User.findOne({
        where: {
          oid_ad: request.state.oid_ad,
        },
      });
      const id_user = currentUserByAD.id_user;
      let body = request.payload;
      if (!body) {
        return { results: false };
      }
      let replacements = {
        user: id_user,
        avatar: body.id_avatar > 0 ? body.id_avatar : NULL,
      };

      return db.sequelize
        .query(
          `UPDATE public.t_user SET id_avatar=:avatar WHERE id_user=:user;`,
          {
            replacements: replacements,
            type: QueryTypes.UPDATE,
          }
        )
        .then(() => {
          return {
            results: true,
          };
        });
    },
  });
  server.route({
    path: baseUrl + "/set-medaille-avatar",
    method: "POST",
    handler: async function (request, h) {
      if (!request.state.oid_ad) return false;
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const currentUserByAD = await User.findOne({
        where: {
          oid_ad: request.state.oid_ad,
        },
      });
      const id_user = currentUserByAD.id_user;
      let body = request.payload;
      if (!body) {
        return { results: false };
      }
      let replacements = {
        user: id_user,
        medaille: body.id > 0 ? body.id : null,
      };

      return db.sequelize
        .query(
          `UPDATE public.t_user SET id_medaille_avatar=:medaille WHERE id_user=:user;`,
          {
            replacements: replacements,
            type: QueryTypes.UPDATE,
          }
        )
        .then(() => {
          return {
            results: true,
          };
        });
    },
  });
};
exports.plugin = {
  register,
  pkg: require("./package.json"),
};
