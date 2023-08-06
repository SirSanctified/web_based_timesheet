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
          allowNull: true,
        },
        taskStatus: {
          type: DataTypes.ENUM("in progress", "completed", "on hold", "cancelled"),
          allowNull: false,
          defaultValue: "on hold",
        },
        taskStartDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        taskEndDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "tasks",
        modelName: "Task",
        timestamps: true,
      }
    );
  }
}

Task.init(sequelize, DataTypes);

export default Task;
