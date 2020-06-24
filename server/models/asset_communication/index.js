module.exports = function (sequelize, DataTypes) {
    const AssetCommunication = sequelize.define('AssetCommunication', {
        id_asset_communication:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: DataTypes.STRING,
        nom_fichier: DataTypes.STRING,
        contenu: DataTypes.ARRAY(DataTypes.STRING),
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
        tableName: 't_asset_communication'
    });

    return AssetCommunication;
};