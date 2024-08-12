const db = require("../../config/database");
const { DataTypes } = require("sequelize");

const Kriteria = db.define(
    "Kriteria",
    {
        id_kriteria: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            primaryKey: true,
        },
        kriteria: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        bobot_kriteria: {
            type: DataTypes.FLOAT(),
            allowNull: true
        },
        keterangan_kriteria: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'm_kriteria',
    }
)

module.exports = Kriteria;