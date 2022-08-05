// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
module.exports = function (sequelize, DataTypes) {
  const OrganisationAgenda = sequelize.define(
    "OrganisationAgenda",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_organisation: DataTypes.INTEGER,
      id_agenda: DataTypes.INTEGER,
      id_semaine: DataTypes.INTEGER,
      date_event: DataTypes.DATE,
      done: DataTypes.BOOLEAN,
    },
    {
      tableName: "j_organisation_agenda",
      timestamps: false,
    }
  );

  OrganisationAgenda.associate = (models) => {
    OrganisationAgenda.hasOne(models.Agenda, {
      foreignKey: "id_agenda",
      sourceKey: "id_agenda",
    });
    OrganisationAgenda.hasOne(models.Organisation, {
      foreignKey: "id_organisation",
      sourceKey: "id_organisation",
    });
    OrganisationAgenda.hasOne(models.Semaine, {
      foreignKey: "id_semaine",
      sourceKey: "id_semaine",
    });

    OrganisationAgenda.hasOne(models.OrganisationSemaine, {
      foreignKey: "id_semaine",
      sourceKey: "id_semaine",
    });
  };

  return OrganisationAgenda;
};
