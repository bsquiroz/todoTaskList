"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Status extends Model {
        static associate(models) {
            // define association here
        }
    }
    Status.init(
        {
            name: DataTypes.STRING,
            color: DataTypes.STRING,
            create_by: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Status",
            tableName: "status",
        }
    );
    return Status;
};
