import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';


class Timesheet extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    }, {
      sequelize,
      modelName: 'Timesheet',
      tableName: 'timesheets',
      timestamps: true,
    })
  }
}

Timesheet.init(sequelize, DataTypes);

export default Timesheet;