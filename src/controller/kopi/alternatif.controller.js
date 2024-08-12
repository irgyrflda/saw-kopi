const { jsonFormat } = require("../../utils/jsonFormat");
const { statusCode } = require("../../utils/statusCode");
const { Alternatif } = require("../../models/kopi");
const { Op } = require('sequelize');

const findAllAlternatif = (req, res) => {
    Alternatif.findAll()
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            if (respon.length === 0) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            return jsonFormat(res, statusCode.ok, "success", "Berhasil memuat data", respon)
        }).catch((error) => {
            console.log("error get all alternatif : ", error);
            throw error;
        })
}

const findOneAlternatif = (req, res) => {
    const idAlternatif = req.params.id_alternatif
    if (!idAlternatif) {
        return jsonFormat(res, statusCode.found, "failed", "id_alternatif tidak ditemukan")
    }
    Alternatif.findOne({ where: { id_alternatif: idAlternatif } })
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            return jsonFormat(res, statusCode.ok, "success", "Berhasil memuat data", respon)
        }).catch((error) => {
            console.log("error get by id alternatif : ", error);
            throw error;
        })
}

const storeAlternatif = (req, res) => {
    const alternatif = req.body.alternatif

    if (!alternatif) {
        return jsonFormat(res, statusCode.found, "failed", "alternatif dibutuhkan")
    }
    Alternatif.findOne({
        where: {
            alternatif: {
                [Op.like]: `%${alternatif}%`
            }
        }
    })
        .then((respon) => {
            if (respon) {
                return jsonFormat(res, statusCode.conflict, "failed", "Data Sudah Ada")
            }
            Alternatif.create({
                alternatif: alternatif
            }).then((responStore) => {
                if (!responStore) {
                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal membuat data")
                }
                return jsonFormat(res, statusCode.ok, "success", "Berhasil membuat data", responStore)
            })
        }).catch((error) => {
            console.log("error store alternatif : ", error);
            throw error;
        })
}

const updateAlternatif = (req, res) => {
    const idAlternatif = req.params.id_alternatif
    const alternatif = req.body.alternatif
    if (!idAlternatif) {
        return jsonFormat(res, statusCode.found, "failed", "id_alternatif dibutuhkan")
    }
    if (!alternatif) {
        return jsonFormat(res, statusCode.found, "failed", "alternatif dibutuhkan")
    }
    Alternatif.findOne({
        where: {
            id_alternatif: idAlternatif,
        }
    })
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            Alternatif.findOne({
                where: {
                    alternatif: { [Op.like]: `%${alternatif}%` },
                    id_alternatif: { [Op.not]: idAlternatif }
                }
            }).then((cekAlternatif) => {
                if (cekAlternatif) {
                    return jsonFormat(res, statusCode.conflict, "failed", "Data Sudah Ada")
                }
                Alternatif.update({
                    alternatif: alternatif
                }, {
                    where: { id_alternatif: idAlternatif }
                }).then((responUpdate) => {
                    if (!responUpdate) {
                        return jsonFormat(res, statusCode.badRequest, "failed", "Gagal mengubah data")
                    }
                    return jsonFormat(res, statusCode.ok, "success", "Berhasil mengubah data", responUpdate)
                })
            })
        }).catch((error) => {
            console.log("error update alternatif : ", error);
            throw error;
        })
}

const destroyAlternatif = (req, res) => {
    const idAlternatif = req.params.id_alternatif
    if (!idAlternatif) {
        return jsonFormat(res, statusCode.found, "failed", "id_alternatif dibutuhkan")
    }
    Alternatif.findOne({ where: { id_alternatif: idAlternatif } })
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            Alternatif.destroy({
                where: { id_alternatif: idAlternatif }
            }).then((responDestroy) => {
                if (!responDestroy) {
                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal menghapus data")
                }
                return jsonFormat(res, statusCode.ok, "success", "Berhasil menghapus data", responDestroy)
            })
        }).catch((error) => {
            console.log("error delete alternatif : ", error);
            throw error;
        })
}

module.exports = {
    findAllAlternatif,
    findOneAlternatif,
    storeAlternatif,
    updateAlternatif,
    destroyAlternatif
}