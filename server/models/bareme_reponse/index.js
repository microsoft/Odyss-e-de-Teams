// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
module.exports = function (sequelize, DataTypes) {
  const BaremeReponse = sequelize.define(
    "BaremeReponse",
    {
      id_bareme_reponse: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_niveau: DataTypes.INTEGER,
      reponse_valid_xp: DataTypes.INTEGER,
      reponse_valid_point: DataTypes.INTEGER,
      last_reponse_valid_xp: DataTypes.INTEGER,
      last_reponse_valid_point: DataTypes.INTEGER,
      bonus_video_xp: DataTypes.INTEGER,
      bonus_video_point: DataTypes.INTEGER,
      bonus_temps_xp: DataTypes.INTEGER,
      bonus_temps_point: DataTypes.INTEGER,
      actif: DataTypes.BOOLEAN,
      updatedAt: {
        type: DataTypes.DATE,
        field: "horodatage",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "horodatage_creation",
      },
    },
    {
      tableName: "t_bareme_reponse",
    }
  );

  return BaremeReponse;
};
