const db = require("../../config/database");
const { DataTypes } = require("sequelize");

const TrxHasil = db.define(
    "TrxHasil",
    {
        id_hasil: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            primaryKey: true,
        },
        id_alternatif: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        urutan_trx: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        hasil: {
            type: DataTypes.DECIMAL(20,4),
            allowNull: false,
        },
        rangking: {
            type: DataTypes.TINYINT(2),
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: 'trx_hasil',
    }
)

module.exports = TrxHasil;