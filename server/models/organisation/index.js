module.exports = function (sequelize, DataTypes) {
  const Organisation = sequelize.define(
    "Organisation",
    {
      id_organisation: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_semaine: DataTypes.INTEGER, // TODO: Ajouter clé relation semaine
      nom: DataTypes.STRING,
      logo: DataTypes.STRING,
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
      tableName: "t_organisation",
    }
  );

  return Organisation;
};
