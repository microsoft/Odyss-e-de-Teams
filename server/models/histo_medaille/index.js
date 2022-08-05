// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "HMedaille",
    {
      id_gain_medaille: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: DataTypes.INTEGER,
      id_medaille: DataTypes.INTEGER,

      horodatage: DataTypes.DATE,
    },
    {
      tableName: "h_gain_medaille",
      timestamps: false,
    }
  );
