const db = require("../../config/database");
const { DataTypes } = require("sequelize");

const NilaiAlternatif = db.define(
    "NilaiAlternatif",
    {
        id_alternatif: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        id_kriteria: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        id_nilai_alternatif: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            primaryKey: true
        },
        nilai_alternatif: {
            type: DataTypes.FLOAT(),
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: 'trx_nilai_alternatif',
    }
)

module.exports = NilaiAlternatif;