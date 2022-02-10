// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "HGainXP",
    {
      id_gain_xp: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: DataTypes.INTEGER,
      nb_point: DataTypes.INTEGER,

      horodatage: DataTypes.DATE,
    },
    {
      tableName: "h_gain_xp",
      timestamps: false,
    }
  );
