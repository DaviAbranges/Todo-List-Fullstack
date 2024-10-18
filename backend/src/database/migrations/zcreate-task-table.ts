import { DataTypes, Model, QueryInterface } from "sequelize";
import { ITasks } from "../../interfaces/tasks/ITasks";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITasks>>("tasks", {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING, // Você pode ajustar o tipo de acordo com suas necessidades
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("tasks");
  },
};
