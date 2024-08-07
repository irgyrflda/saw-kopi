const db = require("../../config/database");
const { DataTypes } = require("sequelize");

const Kriteria = db.define(
    "Kriteria",
    {
        id_kriteria: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
        },
        kriteria: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        bobot_kriteria: {
            type: DataTypes.DECIMAL(2, 2),
            allowNull: true
        }
    },
    {
        timestamps: false,
        tableName: 'm_kriteria',
    }
)

module.exports = Kriteria;