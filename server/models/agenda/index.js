module.exports = function (sequelize, DataTypes) {
  const Agenda = sequelize.define(
    "Agenda",
    {
      id_agenda: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: DataTypes.INTEGER,
      date_agenda: DataTypes.DATE,
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
      tableName: "t_agenda",
    }
  );

  return Agenda;
};
