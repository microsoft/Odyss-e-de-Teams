module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Medaille",
    {
      id_medaille: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      legendaire: DataTypes.BOOLEAN,
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
      tableName: "t_medaille",
    }
  );
