"use strict";
const { QueryTypes } = require("sequelize");
const LevelUpUtils = require("./../../utils/LevelUp");
const RewardUtils = require("./../../utils/Reward");
const GainPointUtils = require("./../../utils/GainPoint");
const ClassementUtils = require("./../../utils/Classement");

const dailyRewards = require("./daily_rewards.json");

const baseUrl = "/user";
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
      let and_query = "";
      let replacements = {
          lang: lang,
        },
        oneResult = false;
      if (params.mode && params.mode === "current") {
        replacements["user"] = currentUserByAD.id_user;
        and_query = " AND a.id_user=:user";
        oneResult = true;
      }
      return db.sequelize
        .query(
          `
                WITH w0 AS(
                    SELECT DISTINCT a.* FROM public.t_user a WHERE actif ` +
            and_query +
            `
                ), w_avatar AS(
                    SELECT DISTINCT a.id_avatar, TRIM(b.nom) AS nom, a.image
                    FROM public.t_avatar a
                        INNER JOIN public.t_libelle_i18n b ON a.id_avatar=b.id_table AND TRIM(b.code)='AVATAR' AND TRIM(b.lang)=:lang
                    WHERE a.actif
                ), w_medaille AS(
                    SELECT DISTINCT a.id_medaille, TRIM(b.nom) AS nom, a.image
                    FROM public.t_medaille a
                        INNER JOIN public.t_libelle_i18n b ON a.id_medaille=b.id_table AND TRIM(b.code)='MEDAILLE' AND TRIM(b.lang)=:lang
                    WHERE a.actif
                ),
                  logged_count as (
                    SELECT COUNT(date_d) as days_logged
                    FROM (
                      SELECT date_trunc('day', horodatage) as date_d
                      FROM public.h_user_login
                      WHERE id_user=:user
                      GROUP BY 1
                      ORDER BY 1
                    ) s)
                SELECT DISTINCT a.*, '/images/avatar/' || b.image AS image_avatar_origine, CASE WHEN c.id_medaille IS NOT NULL THEN c.nom ELSE b.nom END AS nom_avatar, CASE WHEN c.id_medaille IS NOT NULL THEN '/images/medaille/' || c.image ELSE '/images/avatar/' || b.image END AS image_avatar,
                      ( SELECT days_logged FROM logged_count)::integer
                FROM w0 a
                    LEFT JOIN w_avatar b ON a.id_avatar=b.id_avatar
                    LEFT JOIN w_medaille c ON a.id_medaille_avatar=c.id_medaille
                `,
          { replacements: replacements, type: QueryTypes.SELECT }
        )
        .then((result) => {
          // force cast to number

          return oneResult ? result[0] : result;
        });
    },
  });
  server.route({
    path: baseUrl + "/create-by-ad",
    method: "POST",
    handler: async function (request, h) {
      const body = request.payload;
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const Organisation = db.getModel("Organisation");
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
      let currentOrganisation;
      const currentMaitreJeu = await db.sequelize.query(
        `
        SELECT DISTINCT a.id_organisation FROM public.t_maitre_jeu a WHERE actif AND mail=:mail;`,
        {
          replacements: {
            mail: body.ad.userName,
          },
          type: QueryTypes.SELECT,
          plain: true,
        }
      );
      let isMaitreJeu = false;
      if (currentMaitreJeu && currentMaitreJeu["id_organisation"] > 0) {
        isMaitreJeu = true;
        currentOrganisation = await Organisation.findOne({
          where: {
            id_organisation: currentMaitreJeu["id_organisation"],
          },
        });
        if (!currentOrganisation) {
          return false;
        }
        try {
          await Organisation.update(
            { tid_ad: body.ad.idToken.tid },
            {
              where: {
                id_organisation: currentOrganisation["id_organisation"],
              },
            }
          );
        } catch (err) {
          return false;
        }
      } else {
        currentOrganisation = await Organisation.findOne({
          where: {
            tid_ad: body.ad.idToken.tid,
          },
        });
        if (!currentOrganisation) {
          return false;
        }
      }
      currentUserByAD = await User.create({
        id_organisation: currentOrganisation["id_organisation"],
        oid_ad: body.ad.idToken.oid,
        id_role: isMaitreJeu ? 2 : 1,
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

  //missions en cours
  server.route({
    path: baseUrl + "/current-mission",
    method: "GET",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");

      // check oid_ad is present in request
      if (!request.state.oid_ad) {
        return false;
      }

      // Look for user and check if he is admin
      const currentUserByAD = await User.findOne({
        where: {
          oid_ad: request.state.oid_ad,
        },
      });

      if (!currentUserByAD) {
        return false;
      }

      const replacements = {
        id_organisation: currentUserByAD.id_organisation,
      };

      return db.sequelize
        .query(
          `
          select s.nom as mission_name,ts.debut_semaine as mission_start, ts.fin_semaine as mission_end 
          from t_semaine s 
            inner join j_organisation_semaine ts on ts.id_semaine = s.id_semaine AND id_organisation =:id_organisation
            inner join t_organisation c on ts.id_organisation = c.id_organisation and c.id_semaine_encours=s.id_semaine`,
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

  // récompenses journalières

  /**
   * @summary Cette route "check" va permettre d'attribuer les rewards journaliers
   * On va enregistrer une connexion utilisateur si ce dernier se connecte pour la première fois lors du jour courant
   * Si c'est la première fois qu'il se connecte, alors on va calculer quelle récompense journalière il doit obtenir
   */
  server.route({
    path: baseUrl + "/check-rewards",
    method: "GET",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");

      const HistoMedaille = db.getModel("HMedaille");
      const HistoGainXP = db.getModel("HGainXP");
      const HistoGainPoints = db.getModel("HGainPoints");
      const MedailleModel = db.getModel("Medaille");

      // check oid_ad is present in request
      if (!request.state.oid_ad) {
        return false;
      }

      // Look for user and check if he is admin
      const currentUserByAD = await User.findOne({
        where: {
          oid_ad: request.state.oid_ad,
        },
      });

      if (!currentUserByAD) {
        return false;
      }

      // check if user logged for the first time
      const user_id = currentUserByAD.id_user;
      const countLoginToday = await db.sequelize.query(
        `SELECT COUNT(*) as cnt_login from public.h_user_login WHERE id_user = ${user_id} AND horodatage::date = CURRENT_DATE`
      );

      let hasNewDailyReward = false;
      if (Number(countLoginToday[0][0].cnt_login) == 0) {
        hasNewDailyReward = true;
        // insert en base
        await db.sequelize.query(
          `INSERT INTO public.h_user_login ("id_user") VALUES(${user_id})`
        );

        // get le nombre de jours de connexion
        const nbDaysOfConnexion = await db.sequelize.query(`
          select date_trunc('day',horodatage) as dates
          from public.h_user_login
          where id_user = ${user_id}
          group by 1
          order by 1`);

        let currentRewards =
          dailyRewards[Number(nbDaysOfConnexion[0].length) - 1];

        // on ajoute le score (points, exp, medaille) par rapport au type de gain journalier
        if (currentRewards.type === "PTS") {
          await HistoGainPoints.create({
            id_user: user_id,
            nb_point: currentRewards.value,
          });
        } else if (currentRewards.type == "EXP") {
          await HistoGainXP.create({
            id_user: user_id,
            nb_point: currentRewards.value,
          });
        } else if (currentRewards.type == "MEDAL") {
          const medaille = await MedailleModel.findOne({
            where: {
              nom: currentRewards.value,
            },
          });
          await HistoMedaille.create({
            id_user: user_id,
            id_medaille: medaille.id_medaille,
          });
        }
        await GainPointUtils.UpdatePointUser(db, currentUserByAD);
      }
      return { hasNewDailyReward: hasNewDailyReward };
    },
  });

  server.route({
    path: baseUrl + "/current-reward",
    method: "GET",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");

      // check oid_ad is present in request
      if (!request.state.oid_ad) {
        return false;
      }

      // Look for user and check if he is admin
      const currentUserByAD = await User.findOne({
        where: {
          oid_ad: request.state.oid_ad,
        },
      });

      if (!currentUserByAD) {
        return false;
      }
      // if admin then skip
      if (currentUserByAD.id_role == 2) {
        return true;
      }
      // get le nombre de jours de connexion
      const nbDaysOfConnexion = await db.sequelize.query(`
          select date_trunc('day',horodatage) as dates
          from public.h_user_login
          where id_user = ${currentUserByAD.id_user}
          group by 1
          order by 1`);

      let currentRewards =
        dailyRewards[Number(nbDaysOfConnexion[0].length) - 1];

      let index = Number(nbDaysOfConnexion[0].length - 1);

      let before = [],
        after = [];

      if (index === 1) {
        before = dailyRewards.slice(index - 1, index);
      } else if (index === dailyRewards.length - 1) {
        before = dailyRewards.slice(index - 4, index);
      } else if (index > 1) {
        before = dailyRewards.slice(index - 2, index);
      } else {
      }

      if (index == dailyRewards.length - 1) {
        after = dailyRewards.slice(index + 1, index + 2);
      } else if (index === 1) {
        after = dailyRewards.slice(index + 1, index + 4); // 3 elements after
      } else if (index === 0) {
        after = dailyRewards.slice(index + 1, index + 5);
      } else if (index < dailyRewards.length - 1) {
        after = dailyRewards.slice(index + 1, index + 3);
      } else {
      }

      const result = {
        current: currentRewards,
        before: before,
        after: after,
      };

      return result;
    },
  });

  // montee de niveau
  /**
   * @summary Cette route "check" va permettre d'attribuer la montee de niveau
   */
  server.route({
    path: baseUrl + "/check-level-up",
    method: "GET",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");

      if (!request.state.oid_ad) {
        return false;
      }
      const currentUserByAD = await User.findOne({
        where: {
          oid_ad: request.state.oid_ad,
        },
      });
      if (!currentUserByAD) {
        return false;
      }

      let dataLevelUp = await LevelUpUtils.CheckLevelUp(db, currentUserByAD);
      if (dataLevelUp.hasLevelUp) {
        if (dataLevelUp.rewards) {
          dataLevelUp.rewards.forEach(async (reward) => {
            await RewardUtils.SetReward(db, currentUserByAD, reward);
            if (reward.type === "MEDAL") {
              dataLevelUp["medaille"] = await db.sequelize.query(
                `SELECT DISTINCT a.id_medaille, a.image FROM public.t_medaille a WHERE a.actif AND a.id_medaille = :medaille;`,
                {
                  replacements: {
                    medaille: reward.value,
                  },
                  type: QueryTypes.SELECT,
                  plain: true,
                }
              );
            }
          });
        }
        await GainPointUtils.UpdatePointUser(db, currentUserByAD);
        await User.update(
          {
            niveau: dataLevelUp.level,
          },
          { where: { id_user: currentUserByAD.id_user } }
        );
        let nextLevel = await LevelUpUtils.CheckLevelUp(db, {
          niveau: dataLevelUp.level,
        });
        dataLevelUp.nextLevel = nextLevel;
      }

      return dataLevelUp;
    },
  });
  // nouvelles medailles
  /**
   * @summary Cette route "check" va permettre d'attribuer les nouvelles medailles
   */
  server.route({
    path: baseUrl + "/check-new-medal",
    method: "GET",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const HistoMedaille = db.getModel("HMedaille");
      const Organisation = db.getModel("Organisation");

      if (!request.state.oid_ad) {
        return false;
      }
      const currentUserByAD = await User.findOne({
        where: {
          oid_ad: request.state.oid_ad,
        },
      });
      if (!currentUserByAD) {
        return false;
      }
      const currentOrganisation = await Organisation.findOne({
        where: {
          id_organisation: currentUserByAD.id_organisation,
        },
      });

      let listIdMedalValid = [],
        listIdMedalDejaObtenu = [];
      const resultMedalUser = await db.sequelize.query(
        `
        SELECT array_agg(a.id_medaille) AS ids
        FROM public.h_gain_medaille a
          INNER JOIN public.t_medaille b ON a.id_medaille = b.id_medaille AND b.actif AND a.id_user=:user;
      `,
        {
          replacements: {
            user: currentUserByAD.id_user,
          },
          type: QueryTypes.SELECT,
          plain: true,
        }
      );
      listIdMedalDejaObtenu = resultMedalUser["ids"] || [];

      //medal nb reponse valid par module
      const resultNbResponseParModule = await db.sequelize.query(
        `
        WITH w0 AS(
          SELECT DISTINCT a.id_question
          FROM public.h_reponse_user a
          WHERE a.id_user=:user AND a.valid
        )
        SELECT DISTINCT a.id_module, COUNT(*) AS nb
        FROM public.t_question a
          INNER JOIN w0 B ON a.id_question=b.id_question
        GROUP BY 1`,
        {
          replacements: {
            user: currentUserByAD.id_user,
          },
          type: QueryTypes.SELECT,
        }
      );
      if (resultNbResponseParModule && resultNbResponseParModule.length > 0) {
        resultNbResponseParModule.forEach((data) => {
          switch (data.id_module) {
            case 1: //  Communiquer efficacement / COMM
              if (data.nb >= 5) {
                listIdMedalValid.push(19);
              }
              if (data.nb >= 30) {
                listIdMedalValid.push(20);
              }
              break;
            case 2: //  Animer et piloter des projets / PILPROJ
              if (data.nb >= 5) {
                listIdMedalValid.push(17);
              }
              if (data.nb >= 30) {
                listIdMedalValid.push(18);
              }
              break;
            case 3: //  Optimiser les réunions / REU
              if (data.nb >= 5) {
                listIdMedalValid.push(21);
              }
              if (data.nb >= 30) {
                listIdMedalValid.push(22);
              }
              break;
            case 4: //  Mieux collaborer en équipe / MNG
              if (data.nb >= 5) {
                listIdMedalValid.push(15);
              }
              if (data.nb >= 30) {
                listIdMedalValid.push(16);
              }
              break;
            case 5: //  Mieux travailler en mobilité / MOB
              if (data.nb >= 5) {
                listIdMedalValid.push(23);
              }
              if (data.nb >= 30) {
                listIdMedalValid.push(24);
              }
              break;
          }
        });
      }

      //medal nb reponse valid total
      const resultNbReponseValid = await db.sequelize.query(
        `
        SELECT COUNT(*) AS nb
        FROM public.h_reponse_user a
        WHERE a.id_user=:user AND a.valid;
      `,
        {
          replacements: {
            user: currentUserByAD.id_user,
          },
          type: QueryTypes.SELECT,
          plain: true,
        }
      );
      if (resultNbReponseValid.nb >= 20) {
        listIdMedalValid.push(6);
      }
      if (resultNbReponseValid.nb >= 50) {
        listIdMedalValid.push(7);
      }
      if (resultNbReponseValid.nb >= 150) {
        listIdMedalValid.push(8);
      }

      //medal fusee / nb question repondue ok en moins de 60s
      const resultNbReponseFusee = await db.sequelize.query(
        `
        SELECT COUNT(*) AS nb
        FROM public.h_reponse_user a
        WHERE a.id_user=:user AND a.valid AND a.temps < 60000
      `,
        {
          replacements: {
            user: currentUserByAD.id_user,
          },
          type: QueryTypes.SELECT,
          plain: true,
        }
      );
      if (resultNbReponseFusee.nb >= 20) {
        listIdMedalValid.push(12);
      }

      //medal jamais 2 sans 3 / nb question numero 3 repondue ok
      const resultJamais2sans3 = await db.sequelize.query(
        `
        SELECT COUNT(*) AS nb
        FROM public.h_reponse_user a
        WHERE a.id_user=:user AND a.valid AND a.ordre = 3
      `,
        {
          replacements: {
            user: currentUserByAD.id_user,
          },
          type: QueryTypes.SELECT,
          plain: true,
        }
      );
      if (resultJamais2sans3.nb >= 15) {
        listIdMedalValid.push(14);
      }

      //medal videaste / lecture de 5 videos
      const resultVideaste = await db.sequelize.query(
        `
        SELECT COUNT(*) AS nb
        FROM public.h_reponse_user a
        WHERE a.id_user=:user AND a.bonus_video
      `,
        {
          replacements: {
            user: currentUserByAD.id_user,
          },
          type: QueryTypes.SELECT,
          plain: true,
        }
      );
      if (resultVideaste.nb >= 5) {
        listIdMedalValid.push(13);
      }

      //medal classement / top 20 ou top 100 en semaine 4
      if (currentOrganisation.id_semaine_encours === 4) {
        const main_query_classement_xp = ClassementUtils.GetMainQuery({}, 'nb_xp');
        const resultClassementXP = await db.sequelize.query(main_query_classement_xp,
          {
            replacements: {
              lang: lang,
              organisation: currentOrganisation.id_organisation
            },
            type: QueryTypes.SELECT,
          }
        );
        const dataClassementXP = resultClassementXP.filter(c => c.id_user === currentUserByAD.id_user)[0];
        
        const main_query_classement_point = ClassementUtils.GetMainQuery({}, 'nb_point');
        const resultClassementPoint = await db.sequelize.query(main_query_classement_point,
          {
            replacements: {
              lang: lang,
              organisation: currentOrganisation.id_organisation
            },
            type: QueryTypes.SELECT,
          }
        );
        const dataClassementPoint = resultClassementPoint.filter(c => c.id_user === currentUserByAD.id_user)[0];
        
        if ((dataClassementXP && dataClassementXP.rang <= 100) || (dataClassementPoint && dataClassementPoint.rang <= 100)) {
          listIdMedalValid.push(4);
        }
        if ((dataClassementXP && dataClassementXP.rang <= 20) || (dataClassementPoint && dataClassementPoint.rang <= 20)) {
          listIdMedalValid.push(5);
        }
      }

      //medal collectionneur / toutes les medailles obtenues
      const resultTotalMedaille = await db.sequelize.query(
        `
        SELECT COUNT(*) AS nb
        FROM public.t_medaille a
        WHERE a.actif
      `,
        {
          replacements: {
            user: currentUserByAD.id_user,
          },
          type: QueryTypes.SELECT,
          plain: true,
        }
      );
      const listIdMedalUser = [...listIdMedalDejaObtenu, ...listIdMedalValid];
      if (listIdMedalUser.length === resultTotalMedaille.nb - 1) {
        listIdMedalValid.push(13);
      }
      let listIdNewMedal = [];
      for (let i = 0; i < listIdMedalValid.length; i++) {
        if (listIdMedalDejaObtenu.indexOf(listIdMedalValid[i]) === -1) {
          // si nouvelle medaille valide, pas encore obtenue, on insere
          listIdNewMedal.push(listIdMedalValid[i]);
          await HistoMedaille.create({
            id_user: currentUserByAD.id_user,
            id_medaille: listIdMedalValid[i],
          });
        }
      }
      let listMedal = [];
      if (listIdNewMedal.length > 0) {
        const resultNewMedal = await db.sequelize.query(
          `
          SELECT DISTINCT a.id_medaille, TRIM(a.image) AS image, a.legendaire, TRIM(b.nom) AS nom, TRIM(b.description) AS description 
          FROM public.t_medaille a 
              INNER JOIN public.t_libelle_i18n b ON a.id_medaille=b.id_table AND TRIM(b.code)='MEDAILLE' AND TRIM(b.lang)=:lang
          WHERE a.actif AND a.id_medaille=ANY(:ids::int[])
            `,
          {
            replacements: {
              ids: "{" + listIdNewMedal.join(",") + "}",
              lang: lang,
            },
            type: QueryTypes.SELECT,
          }
        );
        resultNewMedal.forEach((medal) => {
          listMedal.push(medal);
        });
      }
      return listMedal;
    },
  });
};
exports.plugin = {
  register,
  pkg: require("./package.json"),
};
