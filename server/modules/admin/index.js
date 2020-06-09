"use strict";
const { QueryTypes } = require("sequelize");
const moment = require("moment");
const File = require("./../../utils/File");
const path = require("path");

// constants
const UPLOAD_PATH = path.resolve(
  __dirname,
  "..",
  "..",
  "public",
  "company-assets"
);

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

      const compnayDirectory =
        UPLOAD_PATH + "/" + currentUserByAD.id_organisation;

      // create company folder if not exists
      if (!File.checkFolderExists(compnayDirectory)) {
        File.createDirectory(compnayDirectory);
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
        directory: compnayDirectory,
        fileName: fileName,
        orignalPath: data.file.path,
        data: data,
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
            id_semaine: semaine_id,
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
          INNER JOIN t_semaine s 
          ON s.id_semaine = a.id_semaine
          INNER JOIN j_organisation_semaine os
          ON os.id_semaine = a.id_semaine
          INNER JOIN t_agenda ag
          ON ag.id_agenda = a.id_agenda
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
};

exports.plugin = {
  register,
  pkg: require("./package.json"),
};
