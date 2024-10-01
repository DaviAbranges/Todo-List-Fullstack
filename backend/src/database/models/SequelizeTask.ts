import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import db from ".";
import SequelizeUser from "./SequelizeUser";

class SequelizeTask extends Model<
  InferAttributes<SequelizeTask>,
  InferCreationAttributes<SequelizeTask>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare status: string; // Ajuste conforme necessário
  declare userId: number; // FK id da tabela users
  declare createdAt: CreationOptional<Date>;
}

SequelizeTask.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING, // Ajuste conforme necessário
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    modelName: "tasks",
    underscored: true,
  }
);

SequelizeTask.belongsTo(SequelizeUser, {
  foreignKey: "userId", // Use o nome correto da chave estrangeira
  as: "user", // Aqui você pode definir um alias, se necessário
});
export default SequelizeTask;
