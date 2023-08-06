import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Project extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        projectName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        projectCode: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        projectDescription: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        projectStartDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        projectEndDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        projectStatus: {
          type: DataTypes.ENUM("in progress", "completed", "on hold", "cancelled"),
          allowNull: false,
          defaultValue: "on hold",
        },
      },
      {
        sequelize,
        tableName: "projects",
        modelName: "Project",
        timestamps: true,
      }
    );
  }
}

Project.init(sequelize, DataTypes);

export default Project;
