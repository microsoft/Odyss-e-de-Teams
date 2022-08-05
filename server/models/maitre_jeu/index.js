// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
module.exports = function (sequelize, DataTypes) {
    const MaitreJeu = sequelize.define('MaitreJeu', {
        id_maitre_jeu:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_organisation: DataTypes.INTEGER,
        mail: DataTypes.STRING,
        actif: DataTypes.BOOLEAN,
        updatedAt: {
            type: DataTypes.DATE,
            field: 'horodatage'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'horodatage_creation'
        }
    }, {
        tableName: 't_maitre_jeu'
    });

    return MaitreJeu;
};