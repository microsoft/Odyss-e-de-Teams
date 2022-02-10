// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
module.exports = function (sequelize, DataTypes) {
  const OrganisationSemaine = sequelize.define(
    "OrganisationSemaine",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_organisation: DataTypes.INTEGER,
      id_semaine: DataTypes.INTEGER,
      debut_semaine: DataTypes.DATE,
      fin_semaine: DataTypes.DATE,
    },
    {
      tableName: "j_organisation_semaine",
      timestamps: false,
    }
  );

  return OrganisationSemaine;
};
