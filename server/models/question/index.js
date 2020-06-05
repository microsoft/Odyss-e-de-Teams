module.exports = function (sequelize, DataTypes) {
    const Question = sequelize.define('Question', {
        id_question:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_module: DataTypes.INTEGER,
        id_thematique: DataTypes.INTEGER,
        id_niveau: DataTypes.INTEGER,
        id_mecanique: DataTypes.INTEGER,
        cle_fichier: DataTypes.STRING,
        reponse: DataTypes.STRING,
        nom: DataTypes.STRING,
        commentaire: DataTypes.STRING,
        asset: DataTypes.STRING,
        updatedAt: {
            type: DataTypes.DATE,
            field: 'horodatage'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'horodatage_creation'
        }
    }, {
        tableName: 't_question'
    });

    return Question;
};