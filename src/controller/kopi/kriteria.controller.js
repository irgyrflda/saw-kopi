const { jsonFormat } = require("../../utils/jsonFormat");
const { statusCode } = require("../../utils/statusCode");
const { Kriteria } = require("../../models/kopi");

const findAllKriteria = (req, res) => {
    Kriteria.findAll()
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.found, "failed", "Data tidak ditemukan")
            }
            if (respon.length === 0) {
                return jsonFormat(res, statusCode.found, "failed", "Data tidak ditemukan")
            }
            return jsonFormat(res, statusCode.ok, "success", "Berhasil memuat data", respon)
        }).catch((error) => {
            console.log("error get all kriteria : ", error);
            throw error;
        })
}

module.exports = { findAllKriteria }