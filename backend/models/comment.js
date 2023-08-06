import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Comment extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "comments",
        modelName: "Comment",
        timestamps: true,
      }
    );
  }
}

Comment.init(sequelize, DataTypes);

export default Comment;
