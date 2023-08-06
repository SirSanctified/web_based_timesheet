import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Employee extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nationalId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM('admin', 'approver', 'general'),
          allowNull: false,
          defaultValue: 'general'
        }
      },
      {
        sequelize,
        tableName: "employees",
        modelName: "Employee",
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            fields: [
              { name: "id" },
              { name: "email" },
              { name: "national_id" },
              { name: "phone" },
              { name: "first_name" },
            ],
          },
        ],
      }
    );
  }
}

Employee.init(sequelize, DataTypes);

export default Employee;
