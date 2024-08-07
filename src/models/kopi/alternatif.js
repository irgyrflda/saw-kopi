const db = require("../../config/database");
const { DataTypes } = require("sequelize");

const Alternatif = db.define(
    "Alternatif",
    {
        id_alternatif: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
        },
        alternatif: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: 'm_alternatif',
    }
)

module.exports = Alternatif;