"use strict";
const { QueryTypes } = require("sequelize");
const moment = require("moment");
const File = require("./../../utils/File");
const path = require("path");
const Jimp = require("jimp");
const ImageSize = require("image-size");

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

let lang = "fr";

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
          "select s.nom as mission_name,ts.debut_semaine as mission_start, ts.fin_semaine as mission_end from t_semaine s inner join j_organisation_semaine ts  on ts.id_semaine = s.id_semaine where id_organisation =:id_organisation",
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

      let availableMissions = await Semaine.findAll({ raw: true });

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
          id_organisation: 1,
        };
        const organisationAgenda = await db.sequelize.query(
          `
          SELECT a.id as mission_id, TRIM(ag.nom) as mission_name, ag.description as mission_description, a.date_event as mission_date, a.done as mission_done, a.id_semaine, s.nom as semaine_name, s.description as semaine_description, os.debut_semaine as semaine_start, os.fin_semaine as semaine_end
          FROM j_organisation_agenda a
            INNER JOIN t_semaine s ON s.id_semaine = a.id_semaine
            INNER JOIN j_organisation_semaine os ON os.id_semaine = a.id_semaine
            INNER JOIN t_agenda ag ON ag.id_agenda = a.id_agenda
          WHERE a.id_organisation = :id_organisation
          ORDER BY a.date_event ASC
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
        };
        return db.sequelize
          .query(
            `
          SELECT DISTINCT a.id_asset_communication, TRIM(a.nom) AS nom, TRIM(a.nom_fichier) AS nom_fichier, a.contenu1, a.contenu2
          FROM public.t_asset_communication a
          WHERE a.actif AND a.id_type_asset_communication=:type;
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
        const replacements = {
          id_organisation: currentUserByAD.id_organisation,
        };
        return db.sequelize
          .query(
            `
            SELECT t.id_thematique, TRIM(t.nom) AS nom , 
            jt ISNULL as activated 
            FROM public.t_thematique t
            LEFT JOIN public.j_thematique_organisation_disabled jt
            ON jt.id_thematique = t.id_thematique and jt.id_organisation=:id_organisation
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
};

exports.plugin = {
  register,
  pkg: require("./package.json"),
};
