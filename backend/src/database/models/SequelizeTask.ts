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
  declare status: string;
  declare userId: number;
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
      type: DataTypes.STRING,
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
      field: "created_at",
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
  foreignKey: "userId",
  as: "user",
});
export default SequelizeTask;
