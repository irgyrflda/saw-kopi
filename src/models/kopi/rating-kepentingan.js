const db = require("../../config/database");
const { DataTypes } = require("sequelize");

const Kepentingan = db.define(
    "Kepentingan",
    {
        id_rating_bobot: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            primaryKey: true,
        },
        nilai_rating_bobot: {
            type: DataTypes.DECIMAL(2, 2),
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: 'm_rating_bobot'
    }
)

module.exports = Kepentingan;