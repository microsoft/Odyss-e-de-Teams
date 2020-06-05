"use strict";
const { QueryTypes, Op } = require("sequelize");
const QuizzUtils = require("./../../utils/Quizz");
const baseUrl = "/question";
let lang = "fr";

const register = async (server, options) => {
  server.route({
    path: baseUrl + "/quizz",
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
        module: params.module,
        niveau: params.niveau,
        limit: 3,
        lang: lang,
        user: currentUserByAD.id_user,
      };
      let main_query = `
            WITH w0 AS(
              WITH w0_0 AS(
                SELECT DISTINCT a.id_question
                FROM public.t_question a
                WHERE a.actif AND a.id_module=:module AND a.id_niveau=:niveau
              )
              SELECT DISTINCT a.id_question
              FROM w0_0 a
                LEFT JOIN public.h_reponse_user b ON a.id_question=b.id_question AND b.id_user=:user
              WHERE b.id_reponse_user IS NULL
            )
            SELECT DISTINCT a.id_question, a.id_module, a.id_thematique, a.id_niveau, a.id_mecanique, TRIM(c.nom) AS nom, a.asset 
            FROM public.t_question a 
              INNER JOIN w0 b ON a.id_question=b.id_question
              INNER JOIN public.t_libelle_i18n c ON a.id_question=c.id_table AND TRIM(c.code)='QUESTION' AND TRIM(c.lang)=:lang
            WHERE true LIMIT :limit
            `;

      const listReponse = await QuizzUtils.getReponseByQuestionQuery(
        db,
        main_query,
        replacements,
        lang
      );

      return db.sequelize
        .query(main_query, {
          replacements: replacements,
          type: QueryTypes.SELECT,
        })
        .then((result) => {
          result.forEach((dataQuestion) => {
            dataQuestion["listReponse"] = listReponse.filter(
              (r) => r.id_question === dataQuestion.id_question
            );
          });
          return {
            results: result,
          };
        });
    },
  });
  server.route({
    path: baseUrl + "/quizz/set-reponse",
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
      if (!currentUserByAD) {
        return false;
      }
      const id_user = currentUserByAD.id_user;
      const Organisation = db.getModel("Organisation");
      const currentOrganisation = await Organisation.findOne({
        where: {
          id_organisation: currentUserByAD.id_organisation,
        },
      });
      let body = request.payload;
      if (!body) {
        return { results: false };
      }
      let replacements = {
        user: id_user,
        semaine: currentOrganisation.id_semaine
      };
      //check validite reponse user
      const Question = db.getModel("Question");
      const currentQuestions = await Question.findAll({
        // on recupere les data question en base, avec la reponse attendue (ne transite pas dans le body)
        where: {
          id_question: {
            [Op.or]: body.listQuestion.map((q) => q.id_question),
          },
        },
      });
      body.listQuestion.forEach((dataQuestion) => {
        dataQuestion["reponse_ok"] = currentQuestions.find(
          (q) => q.id_question === dataQuestion.id_question
        ).dataValues.reponse;
      });
      let listQuestionWithValid = QuizzUtils.getReponseValid(body.listQuestion);

      // enregistrement reponse
      let main_query = "";
      listQuestionWithValid.forEach((q, i) => {
        if (main_query.length > 0) {
          main_query += ",";
        }
        replacements["question" + i] = q.id_question;
        replacements["reponse" + i] =
          "{" + q.selectedReponseIds.join(",") + "}";
        replacements["valid" + i] = q.valid;
        replacements["temps" + i] = q.temps_reponse;
        main_query +=
          "(:user, :semaine, :question" +
          i +
          ", :reponse" +
          i +
          ", :valid" +
          i +
          ", :temps" +
          i +
          ", now())";
      });
      main_query =
        "INSERT INTO public.h_reponse_user(id_user, id_semaine, id_question, valeur, valid, temps, horodatage) VALUES" +
        main_query +
        ";";
      await db.sequelize.query(main_query, {
        replacements: replacements,
        type: QueryTypes.INSERT,
      });

      // enregistrement questionnaire complete
      let replacementsQuestionnaire = {
        user: id_user,
        module: body.selectedModule.id_module,
        niveau: body.selectedNiveau.id_niveau,
        nb_reponse_ok: listQuestionWithValid.filter((q) => q.valid).length,
        semaine: currentOrganisation.id_semaine
      };
      await db.sequelize.query(
        `INSERT INTO public.h_questionnaire_complete(
            id_semaine, id_module, id_niveau, id_user, nb_reponse_ok, horodatage)
          VALUES (:semaine, :module, :niveau, :user, :nb_reponse_ok, now());`,
        {
          replacements: replacementsQuestionnaire,
          type: QueryTypes.INSERT,
        }
      );
      await db.sequelize.query(
        `UPDATE public.t_user 
          SET nb_questionnaire_complete=s0.nb
          FROM (
            SELECT DISTINCT id_user, COUNT(*) AS nb
            FROM public.h_questionnaire_complete
            WHERE id_user=:user
            GROUP BY id_user
          ) AS s0
          WHERE public.t_user.id_user=s0.id_user;`,
        {
          replacements: {
            user: id_user,
          },
          type: QueryTypes.INSERT,
        }
      );
      return {
        result: true,
      };
    },
  });
  server.route({
    path: baseUrl + "/modules",
    method: "GET",
    handler: function (request, h) {
      const db = request.getDb("odyssee_teams");
      const params = request.query;
      let replacements = { lang: lang },
        oneResult = false,
        and_query = "";
      if (params.id) {
        replacements["module"] = +params.id;
        and_query = " AND a.id_module=:module";
        oneResult = true;
      }

      return db.sequelize
        .query(
          "SELECT DISTINCT a.id_module, TRIM(b.nom) AS nom, a.image FROM public.t_module a INNER JOIN public.t_libelle_i18n b ON a.id_module=b.id_table AND TRIM(b.code)='MODULE' AND TRIM(b.lang)=:lang WHERE a.actif" +
            and_query +
            " ORDER BY TRIM(b.nom)",
          {
            replacements: replacements,
            type: QueryTypes.SELECT,
          }
        )
        .then((result) => {
          return {
            results: oneResult ? result[0] : result,
          };
        });
    },
  });
  server.route({
    path: baseUrl + "/niveaux",
    method: "GET",
    handler: function (request, h) {
      const db = request.getDb("odyssee_teams");
      const params = request.query;
      let replacements = { lang: lang },
        oneResult = false,
        and_query = "";
      if (params.id) {
        replacements["niveau"] = +params.id;
        and_query = " AND a.id_niveau=:niveau";
        oneResult = true;
      }

      return db.sequelize
        .query(
          "SELECT a.id_niveau, TRIM(b.nom) AS nom FROM public.t_niveau a INNER JOIN public.t_libelle_i18n b ON a.id_niveau=b.id_table AND TRIM(b.code)='NIVEAU' AND TRIM(b.lang)=:lang WHERE a.actif" +
            and_query +
            " ORDER BY a.ordre",
          {
            replacements: replacements,
            type: QueryTypes.SELECT,
          }
        )
        .then((result) => {
          return {
            results: oneResult ? result[0] : result,
          };
        });
    },
  });
  server.route({
    path: baseUrl + "/histo-questionnaire-complete",
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
      const Organisation = db.getModel("Organisation");
      const currentOrganisation = await Organisation.findOne({
        where: {
          id_organisation: currentUserByAD.id_organisation,
        },
      });
      let replacements = { user: currentUserByAD.id_user, semaine: currentOrganisation.id_semaine };

      return db.sequelize
        .query(
          "SELECT DISTINCT id_module, id_niveau, nb_reponse_ok, horodatage FROM h_questionnaire_complete WHERE id_user=:user AND id_semaine=:semaine;",
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
    path: baseUrl + "/recap-quizz",
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
      const Organisation = db.getModel("Organisation");
      const currentOrganisation = await Organisation.findOne({
        where: {
          id_organisation: currentUserByAD.id_organisation,
        },
      });
      const params = request.query;
      let replacements = {
        module: params.module,
        niveau: params.niveau,
        lang: params.language,
        user: currentUserByAD.id_user,
        semaine: currentOrganisation.id_semaine
      };
      let main_query = `WITH w0 AS(
          SELECT DISTINCT a.id_question, a.valeur AS reponse_saisie, a.temps AS temps_reponse, a.valid
          FROM h_reponse_user a
          WHERE a.id_user=:user AND id_semaine=:semaine
        )
        SELECT DISTINCT a.*, TRIM(c.nom) AS nom, c.description AS astuce, b.asset, b.reponse, b.id_mecanique
        FROM w0 a
          INNER JOIN public.t_question b ON a.id_question=b.id_question AND b.id_module=:module AND b.id_niveau=:niveau
              INNER JOIN public.t_libelle_i18n c ON a.id_question=c.id_table AND TRIM(c.code)='QUESTION' AND TRIM(c.lang)=:lang
      `;
      const listReponse = await QuizzUtils.getReponseByQuestionQuery(
        db,
        main_query,
        replacements,
        lang
      );

      return db.sequelize
        .query(main_query, {
          replacements: replacements,
          type: QueryTypes.SELECT,
        })
        .then((result) => {
          result.forEach((dataQuestion) => {
            dataQuestion["listReponse"] = listReponse.filter(
              (r) => r.id_question === dataQuestion.id_question
            );
          });
          return {
            results: result,
          };
        });
    },
  });
};
exports.plugin = {
  register,
  pkg: require("./package.json"),
};
