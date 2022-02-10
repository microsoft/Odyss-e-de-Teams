// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id_user:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_organisation: DataTypes.INTEGER,
        id_role: DataTypes.INTEGER,
        id_avatar: DataTypes.INTEGER,
        id_medaille_avatar: DataTypes.INTEGER,
        nom: DataTypes.STRING,
        oid_ad: DataTypes.STRING,
        niveau: DataTypes.INTEGER,
        nb_point: DataTypes.INTEGER,
        nb_xp: DataTypes.INTEGER,
        nb_reponse: DataTypes.INTEGER,
        nb_reponse_ok: DataTypes.INTEGER,
        nb_reponse_consecutive_top: DataTypes.INTEGER,
        nb_reponse_consecutive_en_cours: DataTypes.INTEGER,
        nb_questionnaire_complete: DataTypes.INTEGER,
        id_semaine_encours_inscription: DataTypes.INTEGER,
        actif: DataTypes.BOOLEAN,
        horodatage_connexion: DataTypes.DATE,
        updatedAt: {
            type: DataTypes.DATE,
            field: 'horodatage'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'horodatage_creation'
        }
    }, {
        tableName: 't_user'
    });

    return User;
};