"use strict";
const { QueryTypes } = require("sequelize");
const moment = require("moment");
const File = require("./../../utils/File");
const path = require("path");
const Jimp = require("jimp");

// constants
const UPLOAD_PATH = path.resolve(
  __dirname,
  "..",
  "..",
  "public",
  "company-assets"
);
const ROOT_UPLOAD_PATH = "/company-assets";

const ADMIN_ROLE_ID = 2;

const register = async (server, options) => {
  server.route({
    path: "/admin/explorers-count",
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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }

      const replacements = {
        id_organisation: currentUserByAD.id_organisation,
      };

      return db.sequelize
        .query(
          "SELECT COUNT(id_user) as cnt_user FROM t_user WHERE id_organisation =:id_organisation AND id_role=1",
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
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      let lang = request.query.language;

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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }

      const replacements = {
        id_organisation: currentUserByAD.id_organisation,
        lang: lang
      };

      return db.sequelize
        .query(
          `SELECT TRIM(b.nom) as mission_name,ts.debut_semaine as mission_start, ts.fin_semaine as mission_end 
          FROM t_semaine s 
            INNER JOIN j_organisation_semaine ts on ts.id_semaine = s.id_semaine 
            INNER JOIN t_organisation c ON ts.id_organisation=c.id_organisation AND s.id_semaine=c.id_semaine_encours AND c.id_organisation=:id_organisation
            INNER JOIN public.t_libelle_i18n b ON s.id_semaine=b.id_table AND TRIM(b.code)='SEMAINE' AND TRIM(b.lang)=:lang`,
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

  // company infos
  server.route({
    path: "/admin/companyInfos",
    method: "GET",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const Organisation = db.getModel("Organisation");

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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }

      // Check organisation stats

      const currentOrga = await Organisation.findOne({
        where: {
          id_organisation: currentUserByAD.id_organisation,
        },
      });

      return {
        results: currentOrga,
      };
    },
  });

  // company logo upload
  server.route({
    path: "/admin/upload-logo",
    method: "POST",
    config: {
      payload: {
        output: "file",
        allow: "multipart/form-data",
        multipart: true,
      },
    },
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");

      const Organisation = db.getModel("Organisation");
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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }

      // Check organisation stats
      const currentOrga = await Organisation.findOne({
        where: {
          id_organisation: currentUserByAD.id_organisation,
        },
      });

      const companyDirectory =
        UPLOAD_PATH + "/" + currentUserByAD.id_organisation;

      // create company folder if not exists
      if (!File.checkFolderExists(companyDirectory)) {
        File.createDirectory(companyDirectory);
      }

      // remove old file
      if (currentOrga.logo) {
        File.deleteFile({
          filePath: path.resolve(
            __dirname,
            "..",
            "..",
            "public",
            currentOrga.logo
          ),
        });
      }

      const data = request.payload;

      const fileName = `${new Date().getTime()}-${data.file.filename}`;

      const result = File.copyFile({
        directory: companyDirectory,
        fileName: fileName,
        originalPath: data.file.path,
        move: true,
      });

      await Organisation.update(
        {
          logo:
            "company-assets/" +
            currentUserByAD.id_organisation +
            "/" +
            fileName,
        },
        { where: { id_organisation: currentUserByAD.id_organisation } }
      );

      return {
        result: !result ? "Error" : "Ok",
      };
    },
  });

  server.route({
    path: "/admin/available-missions",
    method: "GET",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const Semaine = db.getModel("Semaine");
      const Organisation = db.getModel("Organisation");
      const OrganisationSemaine = db.getModel("OrganisationSemaine");
      const lang = request.query.language;

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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }

      let availableMissions;
      try {
        availableMissions = await db.sequelize
          .query(
            `SELECT * FROM t_semaine s
            INNER JOIN public.t_libelle_i18n b ON s.id_semaine=b.id_table AND TRIM(b.code)='SEMAINE' AND TRIM(b.lang)=:lang
            WHERE s.can_play`,
            {
              replacements: { lang: lang },
              type: QueryTypes.SELECT,
            }
          )
      } catch (error) {
        console.log(error)
      }

      const currentOrga = await Organisation.findOne({
        where: {
          id_organisation: currentUserByAD.id_organisation,
        },
      });

      const semaines = await OrganisationSemaine.findAll({
        where: {
          id_organisation: currentUserByAD.id_organisation,
        },
        raw: true,
      });

      availableMissions.forEach((mission) => {
        let semaine = semaines.find((e) => e.id_semaine === mission.id_semaine);

        mission.fin_semaine = new Date(semaine.fin_semaine);
        mission.debut_semaine = new Date(semaine.debut_semaine);
        mission.actif = mission.id_semaine === currentOrga.id_semaine_encours;
      });

      // console.log(semaines);

      return {
        availableMissions: availableMissions,
      };
    },
  });

  server.route({
    path: "/admin/set-current-mission",
    method: "POST",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const Organisation = db.getModel("Organisation");

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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }

      const semaine_id = request.payload.id_semaine;

      if (!semaine_id) return false;

      try {
        await Organisation.update(
          {
            id_semaine_encours: semaine_id,
          },
          {
            where: {
              id_organisation: currentUserByAD.id_organisation,
            },
          }
        );

        return {
          message: "success",
        };
      } catch (error) {
        console.error(error);
        return {
          message: "error",
        };
      }
    },
  });

  server.route({
    path: "/admin/current-agenda",
    method: "GET",
    handler: async function (request, h) {
      let lang = request.query.language;
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const OrganisationAgenda = db.getModel("OrganisationAgenda");
      const OrganisationSemaine = db.getModel("OrganisationSemaine");
      const Agenda = db.getModel("Agenda");
      const Semaine = db.getModel("Semaine");
      const Organisation = db.getModel("Organisation");
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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }

      try {
        const replacements = {
          id_organisation: currentUserByAD.id_organisation,
          lang: lang
        };
        const organisationAgenda = await db.sequelize.query(
          `
          SELECT a.id as mission_id, TRIM(b.nom) as mission_name, b.description as mission_description, a.date_event as mission_date, a.done as mission_done, b.id_semaine, e.nom as semaine_name, e.description as semaine_description, d.debut_semaine as semaine_start, d.fin_semaine as semaine_end
          FROM j_organisation_agenda a
            INNER JOIN t_agenda b ON a.id_agenda = b.id_agenda AND a.id_organisation=:id_organisation
            INNER JOIN t_semaine c ON b.id_semaine = c.id_semaine
            INNER JOIN j_organisation_semaine d ON d.id_semaine = c.id_semaine AND a.id_organisation=d.id_organisation
            INNER JOIN public.t_libelle_i18n e ON c.id_semaine=e.id_table AND TRIM(e.code)='SEMAINE' AND TRIM(e.lang)=:lang
          ORDER BY a.date_event ASC, mission_id
        `,
          {
            replacements: replacements,
            type: QueryTypes.SELECT,
          }
        );

        let result = [];

        // prepare the output once
        organisationAgenda.forEach((elem) => {
          let found = result.findIndex((e) => e.id_semaine === elem.id_semaine);
          if (found === -1) {
            let agendaDays = [];
            let weekAgenda = {};
            let firstDay = moment(elem["semaine_start"]);
            agendaDays.push(firstDay.format("DD-MM-YYYY"));
            agendaDays.push(
              moment(elem["semaine_start"]).add(1, "days").format("DD-MM-YYYY")
            );
            agendaDays.push(
              moment(elem["semaine_start"]).add(2, "days").format("DD-MM-YYYY")
            );
            agendaDays.push(
              moment(elem["semaine_start"]).add(3, "days").format("DD-MM-YYYY")
            );
            agendaDays.push(
              moment(elem["semaine_start"]).add(4, "days").format("DD-MM-YYYY")
            );
            agendaDays.forEach((e) => {
              weekAgenda[e] = [];
            });

            result.push({
              id_semaine: elem.id_semaine,
              name: elem["semaine_name"].trim(),
              desc: elem["semaine_description"],
              date_start: elem["semaine_start"],
              date_end: elem["semaine_end"],
              agenda: weekAgenda,
            });
          }
        });

        // then affect the agenda

        organisationAgenda.forEach((elem) => {
          let index = result.findIndex((e) => e.id_semaine === elem.id_semaine);
          let formatedDate = moment(elem.mission_date).format("DD-MM-YYYY");

          // on a l'index et la bonne date donc on ajoute à l'agenda
          if (!result[index].agenda[formatedDate]) {
            result[index].agenda[formatedDate] = new Array();
          }
          result[index].agenda[formatedDate].push({
            id: elem.mission_id,
            name: elem.mission_name,
            desc: elem.mission_description,
            date: moment(elem.mission_date).format("HH:mm"),
            done: elem.mission_done,
          });
        });

        return result;
      } catch (e) {
        console.error(e);
      }
    },
  });

  server.route({
    path: "/admin/set-agenda-done",
    method: "POST",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const OrganisationAgenda = db.getModel("OrganisationAgenda");

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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }

      const { id_item, item_status } = request.payload;

      try {
        await OrganisationAgenda.update(
          {
            done: item_status,
          },
          {
            where: {
              id: id_item,
              id_organisation: currentUserByAD.id_organisation,
            },
          }
        );

        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  });

  server.route({
    path: "/admin/assets/get-list",
    method: "GET",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const lang = request.query.language;
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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }
      const params = request.query;

      try {
        const replacements = {
          type: params.type_asset,
          lang: lang
        };
        return db.sequelize
          .query(
            `
          SELECT DISTINCT a.id_asset_communication, TRIM(a.nom) AS nom, TRIM(a.nom_fichier) AS nom_fichier, a.contenu, a.id_social_asset_communication, TRIM(sac.nom) as nom_social
          FROM public.t_asset_communication a
          LEFT JOIN public.t_social_asset_communication sac ON sac.id_social_asset_communication = a.id_social_asset_communication
          WHERE a.actif AND a.id_type_asset_communication=:type AND a.lang=:lang;
        `,
            { replacements: replacements, type: QueryTypes.SELECT }
          )
          .then((result) => {
            return result;
          });
      } catch (e) {
        console.error(e);
      }
    },
  });

  server.route({
    path: "/admin/emailing/get-template",
    method: "GET",
    handler: async function (request, h) {
      const db = request.getDb("odyssee_teams");
      const User = db.getModel("User");
      const Organisation = db.getModel("Organisation");
      const AssetCommunication = db.getModel("AssetCommunication");
      let lang = request.query.language;

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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }

      // Check organisation stats
      const currentOrga = await Organisation.findOne({
        where: {
          id_organisation: currentUserByAD.id_organisation,
        },
      });

      const companyDirectory =
        UPLOAD_PATH + "/" + currentUserByAD.id_organisation;

      // create company folder if not exists
      if (!File.checkFolderExists(companyDirectory)) {
        File.createDirectory(companyDirectory);
      }

      // create company folder for emailing templates
      const emailTemplates =
        UPLOAD_PATH + "/" + currentUserByAD.id_organisation + "/templates";

      if (!File.checkFolderExists(emailTemplates)) {
        File.createDirectory(emailTemplates);
      }
      const params = request.query;
      const currentAsset = await AssetCommunication.findOne({
        where: {
          id_asset_communication: params.asset,
        },
      });
      if (!currentAsset) {
        return false;
      }
      //

      /**
       * A partir de là il faudra créer le template de mail en utilisant le logo de la boite
       * La fonction renverra un path vers le template du mail. Il n'y a pas besoin de renvoyer l'image car tout est stocké
       * dans le dossier public.
       *
       */
      currentAsset.nom_fichier = currentAsset.nom_fichier.trim();
      const template = path.resolve(
        __dirname,
        "..",
        "..",
        "public",
        "templates",
        "emailing",
        currentAsset.nom_fichier
      );
      const imageTemplate = await Jimp.read(template);

      var result = {
        template:
          ROOT_UPLOAD_PATH +
          "/" +
          currentUserByAD.id_organisation +
          "/templates/" +
          currentAsset.nom_fichier,
        width: imageTemplate.bitmap.width,
        height: imageTemplate.bitmap.height,
      };

      if (!currentOrga.logo) {
        File.copyFile({
          directory: emailTemplates,
          fileName: currentAsset.nom_fichier,
          originalPath: template,
        });
        return result;
      }
      const icon = path.resolve(
        __dirname,
        "..",
        "..",
        "public",
        currentOrga.logo
      );

      /**
       * Partie tricky : il faut identifier en pixels la zone où devra se trouver le logo.
       *  Grace à la fonction resize de jimp on peut définir une largeur / hauteur fixe donc il y a normalement pas de risque de débordement
       */
      try {
        const logo = await Jimp.read(icon);
        logo.resize(Jimp.AUTO, 50);

        const widthTemplate = imageTemplate.bitmap.width;
        const widthLogo = logo.bitmap.width;

        const composite = await imageTemplate.composite(
          logo,
          widthTemplate - widthLogo - 45,
          45
        );
        await composite
          .quality(100)
          .write(emailTemplates + "/" + currentAsset.nom_fichier);

        return result;
      } catch (e) {
        console.error(e);
      }
    },
  });

  server.route({
    path: "/admin/themes",
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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }

      try {
        const lang = request.query.language;  
        const replacements = {
          id_organisation: currentUserByAD.id_organisation,
          lang: lang
        };
        return db.sequelize
          .query(
            `
            SELECT t.id_thematique, TRIM(l.nom) AS nom , 
            jt ISNULL as activated 
            FROM public.t_thematique t
              INNER JOIN public.t_libelle_i18n l ON t.id_thematique = l.id_table AND TRIM(l.code)='THEMATIQUE' AND TRIM(l.lang)=:lang
              LEFT JOIN public.j_thematique_organisation_disabled jt ON jt.id_thematique = t.id_thematique and jt.id_organisation=:id_organisation
        `,
            { replacements: replacements, type: QueryTypes.SELECT }
          )
          .then((result) => {
            return result;
          });
      } catch (e) {
        console.error(e);
      }
    },
  });

  server.route({
    path: "/admin/themes",
    method: "DELETE",
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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }

      const themesToRemove = request.payload;

      try {
        const replacements = {
          id_organisation: currentUserByAD.id_organisation,
          themes: themesToRemove,
        };
        return db.sequelize
          .query(
            `
            DELETE FROM public.j_thematique_organisation_disabled 
            WHERE id_organisation=:id_organisation AND id_thematique IN(:themes);
        `,
            { replacements: replacements, type: QueryTypes.DELETE }
          )
          .then((result) => {
            return result;
          });
      } catch (e) {
        console.error(e);
      }
    },
  });

  server.route({
    path: "/admin/themes",
    method: "POST",
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

      if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
        return false;
      }
      const themesToBeAdded = request.payload;
      const id_organisation = currentUserByAD.id_organisation;

      try {
        const replacements = themesToBeAdded.map((id) => [
          id_organisation,
          id,
          new Date(),
        ]);
        return db.sequelize
          .query(
            `
            INSERT INTO public.j_thematique_organisation_disabled (id_organisation, id_thematique, horodatage) 
            VALUES ${Array(themesToBeAdded.length).fill("(?)").join(",")};
        `,
            { replacements: replacements, type: QueryTypes.INSERT }
          )
          .then((result) => {
            return result;
          });
      } catch (e) {
        console.error(e);
      }
    },
  });
  /**
   * @summary Route "hack" qui permet de faire switcher le role d'un user
   */
  server.route({
    path: "/admin/switch-role",
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

      if (!currentUserByAD || !(currentUserByAD.id_organisation === 1 || currentUserByAD.id_organisation === 2)) {
        return false;
      }
      let id_role;
      switch (currentUserByAD.id_role) {
        case 1:
          id_role = 2;
          break;
        case 2:
        default:
          id_role = 1;
          break;
      }

      try {
        const replacements = {
          user: currentUserByAD.id_user,
          role: id_role,
        };
        await db.sequelize.query(
          `
            UPDATE public.t_user SET id_role=:role WHERE id_user=:user;
        `,
          { replacements: replacements, type: QueryTypes.INSERT }
        );
        return {
          new_role: (id_role === 2 ? 'admin' : 'joueur')
        }
      } catch (e) {
        console.error(e);
      }
    },
  });
};

exports.plugin = {
  register,
  pkg: require("./package.json"),
};
