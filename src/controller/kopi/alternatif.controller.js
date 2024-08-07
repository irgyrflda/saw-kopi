const { jsonFormat } = require("../../utils/jsonFormat");
const { statusCode } = require("../../utils/statusCode");
const { Alternatif } = require("../../models/kopi");

const findAllAlternatif = (req, res) => {
    Alternatif.findAll()
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.found, "failed", "Data tidak ditemukan")
            }
            if (respon.length === 0) {
                return jsonFormat(res, statusCode.found, "failed", "Data tidak ditemukan")
            }
            return jsonFormat(res, statusCode.ok, "success", "Berhasil memuat data", respon)
        }).catch((error) => {
            console.log("error get all alternatif : ", error);
            throw error;
        })
}

module.exports = { findAllAlternatif }