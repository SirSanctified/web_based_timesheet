import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Task extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        taskName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        taskDescription: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        taskStatus: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        taskStartDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        taskEndDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "tasks",
        modelName: "Task",
        timestamps: false,
      }
    );
  }
}

Task.init(sequelize, DataTypes);

export default Task;
