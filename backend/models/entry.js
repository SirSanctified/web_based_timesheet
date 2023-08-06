import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Entry extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        hours: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
      },
      {
        sequelize,
        tableName: "entries",
        modelName: "Entry",
        timestamps: true,
      }
    );
  }
}

Entry.init(sequelize, DataTypes);

export default Entry;
