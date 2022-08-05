// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "UserLogins",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: DataTypes.INTEGER,
      horodatage: DataTypes.DATE,
    },
    {
      tableName: "h_user_login",
      timestamps: false,
    }
  );
