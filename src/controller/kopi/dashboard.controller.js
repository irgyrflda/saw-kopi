const db = require("../../config/database");
const { jsonFormat } = require("../../utils/jsonFormat");
const { statusCode } = require("../../utils/statusCode");
const { QueryTypes } = require('sequelize');

const dataDashboard = async (req, res) => {
    await db.query(`SELECT "Data Alternatif" object, CAST(COUNT(id_alternatif) AS INT) total_data,
    "Total data alternatif" keterangan
    FROM m_alternatif
    UNION ALL
    SELECT "Data Kriteria" object, CAST(COUNT(id_kriteria) AS INT) total_data,
    "Total data kriteria" keterangan
    FROM m_kriteria
    UNION ALL
    SELECT "Data hasil perhitungan" object , CAST(MAX(urutan_trx) AS INT) total_data,
    "Total data hasil perhitungan" keterangan
    FROM trx_hasil
	UNION ALL 
	SELECT "Data nilai alternatif", COUNT(id_alternatif) total_data,
    "Total data nilai alternatif (PASTIKAN NILAI ALTERNATIF PADA SETIAP KRITERIA TERISI SEMUA!!)" keterangan
    FROM trx_nilai_alternatif`, {
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