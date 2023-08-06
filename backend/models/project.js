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
          allowNull: false,
        },
        projectManager: {
          type: DataTypes.STRING,
          allowNull: true,
          // references: {
          //   model: "employees",
          //   key: "id",
          // },
        },
        projectStartDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        projectEndDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        projectStatus: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        projectBudget: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "projects",
        modelName: "Project",
        timestamps: false,
      }
    );
  }
}

Project.init(sequelize, DataTypes);

export default Project;
