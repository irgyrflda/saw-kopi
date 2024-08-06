const db = require("../../config/database"); //import connection database
const { DataTypes } = require("sequelize");
//menggunakan ORM express.js
const User = db.define(
    "User",
    {
        username: {
            type: DataTypes.STRING(12),
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(50),
            defaultValue: "user",
            allowNull: true,
        },
        is_login: {
            type: DataTypes.TINYINT(1),
            defaultValue: 0,
            allowNull: true
        }
    },
    {
        timestamps: false,
        tableName: 'ref_user',
    }
)

module.exports = User; //exports module user
//module ini di import di ./src/models/user/index.js