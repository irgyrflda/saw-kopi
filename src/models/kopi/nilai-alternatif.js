const db = require("../../config/database");
const { DataTypes } = require("sequelize");
const Alternatif = require("./alternatif");
const Kriteria = require("./kriteria");

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

Alternatif.hasOne(NilaiAlternatif, {
    foreignKey: "id_alternatif",
    as: "a"
})

NilaiAlternatif.belongsTo(Alternatif, {
    foreignKey: "id_alternatif",
    as: "c"
})

Kriteria.hasOne(NilaiAlternatif, {
    foreignKey: "id_kriteria",
    as: "b"
})

NilaiAlternatif.belongsTo(Kriteria, {
    foreignKey: "id_kriteria",
    as: "d"
})

module.exports = NilaiAlternatif;