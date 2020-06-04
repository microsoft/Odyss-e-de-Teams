module.exports = function (sequelize, DataTypes) {
  const SemaineModel = sequelize.define(
    "Semaine",
    {
      id_semaine: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: DataTypes.STRING,
      description: DataTypes.STRING,
      ordre: DataTypes.NUMBER,
      actif: DataTypes.BOOLEAN,
      debut_semaine: DataTypes.DATE,
      fin_semaine: DataTypes.DATE,
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
      tableName: "t_semaine",
    }
  );

  return SemaineModel;
};
