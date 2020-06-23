module.exports = function (sequelize, DataTypes) {
  const Semaine = sequelize.define(
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
      can_play: DataTypes.BOOLEAN,
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

  return Semaine;
};
