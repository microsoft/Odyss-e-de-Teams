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
      // // check oid_ad is present in request
      // if (!request.state.oid_ad) {
      //   return false;
      // }

      // // Look for user and check if he is admin
      // const currentUserByAD = await User.findOne({
      //   where: {
      //     oid_ad: request.state.oid_ad,
      //   },
      // });

      // if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
      //   return false;
      // }
      const id_organisation = 1;
      try {
        const organisationAgenda = await OrganisationAgenda.findAll({
          include: [Agenda, Organisation, Semaine, OrganisationSemaine],
          where: {
            id_organisation: id_organisation,
          },
          raw: true,
        });

        let result = [];

        /**
         *       {
        id_semaine: 1,
        name: "S1",
        date_start: "2020-06-08T07:36:52.090Z",
        date_end: "2020-06-15T07:36:52.090Z",
        agenda: {
          "2020-06-08T07:36:52.090Z": [
            {
              id: 2,
              name: "Communication : Envoi d'un email de lancement",
              desc: "Email organisation",
              done: false,
              date: "2020-06-08T09:00:00.000Z",
            }
         */

        return organisationAgenda;

        organisationAgenda.forEach((elem) => {
          let found = result.findIndex((e) => e.id_semaine === elem.id_semaine);

          console.log(
            "current",
            moment(elem["Agenda.date_agenda"]).format("DD-MM-YYYY"),
            found
          );

          if (found === -1) {
            let agendaDays = [];
            let weekAgenda = {};
            let firstDay = moment(elem["OrganisationSemaine.debut_semaine"]);
            agendaDays.push(firstDay.format("DD-MM-YYYY"));
            agendaDays.push(
              moment(elem["OrganisationSemaine.debut_semaine"])
                .add(1, "days")
                .format("DD-MM-YYYY")
            );
            agendaDays.push(
              moment(elem["OrganisationSemaine.debut_semaine"])
                .add(2, "days")
                .format("DD-MM-YYYY")
            );
            agendaDays.push(
              moment(elem["OrganisationSemaine.debut_semaine"])
                .add(3, "days")
                .format("DD-MM-YYYY")
            );
            agendaDays.push(
              moment(elem["OrganisationSemaine.debut_semaine"])
                .add(4, "days")
                .format("DD-MM-YYYY")
            );

            agendaDays.forEach((e) => {
              weekAgenda[e] = [];
            });

            result.push({
              id_semaine: elem.id_semaine,
              name: elem["Semaine.nom"],
              date_start: elem["OrganisationSemaine.debut_semaine"],
              date_end: elem["OrganisationSemaine.fin_semaine"],
              agenda: weekAgenda,
            });

            console.log("before", result);

            // ajout de la date du jour
            let newIdx = result.findIndex(
              (e) => e.id_semaine === elem.id_semaine
            );

            console.log(
              "newIdx",
              newIdx,
              result[newIdx],
              moment(elem["Agenda.date_agenda"]).format("DD-MM-YYYY")
            );

            result[newIdx].agenda[
              moment(elem["Agenda.date_agenda"]).format("DD-MM-YYYY")
            ].push({
              id: elem["Agenda.id_agenda"],
              name: elem["Agenda.nom"],
              desc: elem["Agenda.description"],
              done: elem["done"],
              date: elem["Agenda.date_agenda"],
            });
          } else {
            result[found].agenda[
              moment(elem["Agenda.date_agenda"]).format("DD-MM-YYYY")
            ].push({
              id: elem["Agenda.id_agenda"],
              name: elem["Agenda.nom"],
              desc: elem["Agenda.description"],
              done: elem["done"],
              date: elem["Agenda.date_agenda"],
            });
          }
        });

        return {
          result,
          organisationAgenda,
        };
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
      const Agenda = db.getModel("Agenda");
      const Semaine = db.getModel("Semaine");
      const Organisation = db.getModel("Organisation");

      // // check oid_ad is present in request
      // if (!request.state.oid_ad) {
      //   return false;
      // }

      // // Look for user and check if he is admin
      // const currentUserByAD = await User.findOne({
      //   where: {
      //     oid_ad: request.state.oid_ad,
      //   },
      // });

      // if (!currentUserByAD || currentUserByAD.id_role !== ADMIN_ROLE_ID) {
      //   return false;
      // }
      const { id_item } = request.payload;

      try {
        await OrganisationAgenda.update(
          {
            done: true,
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
        return false;
      }
    },
  });
};

exports.plugin = {
  register,
  pkg: require("./package.json"),
};
