"use strict";
const { QueryTypes } = require("sequelize");
const baseUrl = "/classement";
const ClassementUtils = require("./../../utils/Classement");
const Crypto = require("./../../utils/Crypto");
const ADMIN_ROLE_ID = 2;

const register = async (server, options) => {
  server.route({
    path: baseUrl,
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
      const id_organisation = currentUserByAD.id_organisation;
      const id_user = currentUserByAD.id_user;
      const params = request.query;
      let replacements = { lang: params.language },
        order_query = "";
      switch (params.mode) {
        case "point":
          order_query = "nb_point";
          break;
        case "xp":
          order_query = "nb_xp";
          break;
        default:
          return { results: false };
      }
      if (!params.monde) {
        replacements["organisation"] = id_organisation;
      }

      let main_query = ClassementUtils.GetMainQuery(params, order_query);
      main_query = "SELECT * FROM (" + main_query + ")s0 ORDER BY rang";
      if (params.limit) {
        main_query = "SELECT * FROM (" + main_query + ")s1 LIMIT :limit";
        replacements["limit"] = +params.limit;
      }

      return db.sequelize
        .query(main_query, {
          replacements: replacements,
          type: QueryTypes.SELECT,
        })
        .then((result) => {
          const newResult = result.map(u =>
            u.nom
              ? {...u, nom: Crypto.decrypt(JSON.parse(u.nom))}
              : u
          );
          if (params.user) {
            return newResult.filter((c) => c.id_user === id_user)[0];
          }
          return newResult;
        });
    },
  });
  server.route({
    path: baseUrl + "/indicateur",
    method: "GET",
    handler: async function (request, h) {
      if (!request.state.oid_ad) return false;
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const Organisation = db.getModel("Organisation");
      const currentUserByAD = await User.findOne({
        where: {
          oid_ad: request.state.oid_ad,
        },
      });
      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }
      const currentOrganisation = await Organisation.findOne({
        where: {
          id_organisation: currentUserByAD.id_organisation,
        },
      });

      let resultIndicateur = {
        nbJoueur: 0,
        nbJoueurSemaine: 0,
        pcReponseOk: 0,
        nbJoueurNiv15: 0,
        nbModuleCompletSemaine: 0,
      };
      //nb joueur orga
      const resultNbJoueur = await db.sequelize.query(
        `
            SELECT COUNT(*) AS nb
            FROM public.t_user a
            WHERE a.id_organisation=:organisation AND a.actif AND a.id_role=1
        `,
        {
          replacements: {
            organisation: currentUserByAD.id_organisation,
          },
          type: QueryTypes.SELECT,
          plain: true,
        }
      );
      resultIndicateur.nbJoueur = resultNbJoueur["nb"];

      //nb joueur orga / semaine en cours
      const resultNbJoueurSemaine = await db.sequelize.query(
        `
            SELECT COUNT(*) AS nb
            FROM public.t_user a
            WHERE a.id_organisation=:organisation AND a.actif AND a.id_role=1 AND COALESCE(a.id_semaine_encours_inscription, 1)=:semaine
        `,
        {
          replacements: {
            organisation: currentUserByAD.id_organisation,
            semaine: currentOrganisation.id_semaine_encours,
          },
          type: QueryTypes.SELECT,
          plain: true,
        }
      );
      resultIndicateur.nbJoueurSemaine = resultNbJoueurSemaine["nb"];

      //pourcentage de bonnes reponses
      const resultPcBonneReponse = await db.sequelize.query(
        `
            SELECT SUM(COALESCE(a.nb_reponse_ok, 0)) AS nb_reponse_ok, SUM(COALESCE(a.nb_reponse, 0)) AS nb_reponse
            FROM public.t_user a
            WHERE a.id_organisation=:organisation AND a.actif AND a.id_role=1
        `,
        {
          replacements: {
            organisation: currentUserByAD.id_organisation,
          },
          type: QueryTypes.SELECT,
          plain: true,
        }
      );
      if (resultPcBonneReponse["nb_reponse"] > 0) {
        resultIndicateur.pcReponseOk =
          (100 * resultPcBonneReponse["nb_reponse_ok"]) /
          resultPcBonneReponse["nb_reponse"];
          if (resultIndicateur.pcReponseOk > 0) {
            resultIndicateur.pcReponseOk = resultIndicateur.pcReponseOk.toFixed(2);
          }
      }

      //nb joueur niveau 15
      const resultNbJoueurNiv15 = await db.sequelize.query(
        `
            SELECT COUNT(*) AS nb
            FROM public.t_user a
            WHERE a.id_organisation=:organisation AND a.actif AND a.id_role=1 AND niveau=15
        `,
        {
          replacements: {
            organisation: currentUserByAD.id_organisation,
          },
          type: QueryTypes.SELECT,
          plain: true,
        }
      );
      resultIndicateur.nbJoueurNiv15 = resultNbJoueurNiv15["nb"];

      //nb module complet / semaine en cours
      const resultNbModuleCompletSemaine = await db.sequelize.query(
        `
            SELECT COUNT(*) AS nb
            FROM public.h_questionnaire_complete a
                INNER JOIN public.t_user b ON a.id_user=b.id_user AND b.id_organisation=:organisation AND b.actif AND b.id_role=1 AND a.id_semaine=:semaine
        `,
        {
          replacements: {
            organisation: currentUserByAD.id_organisation,
            semaine: currentOrganisation.id_semaine_encours,
          },
          type: QueryTypes.SELECT,
          plain: true,
        }
      );
      resultIndicateur.nbModuleCompletSemaine = resultNbModuleCompletSemaine["nb"];

      return resultIndicateur;
    },
  });
};
exports.plugin = {
  register,
  pkg: require("./package.json"),
};
