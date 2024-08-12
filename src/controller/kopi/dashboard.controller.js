const db = require("../../config/database");
const { jsonFormat } = require("../../utils/jsonFormat");
const { statusCode } = require("../../utils/statusCode");
const { QueryTypes } = require('sequelize');

const dataDashboard = async (req, res) => {
    await db.query(`SELECT "Data Alternatif" object, COUNT(id_alternatif) total_data
    FROM m_alternatif
    UNION ALL
    SELECT "Data Kriteria" object, COUNT(id_kriteria) total_data
    FROM m_kriteria`, {
        type: QueryTypes.SELECT
    })
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            if (respon.length === 0) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            return jsonFormat(res, statusCode.ok, "success", "Berhasil memuat data", respon)
        }).catch((error) => {
            console.log("error get data dashboard : ", error);
            throw error;
        })
}

module.exports = { dataDashboard }