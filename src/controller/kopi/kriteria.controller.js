const { jsonFormat } = require("../../utils/jsonFormat");
const { statusCode } = require("../../utils/statusCode");
const { Kriteria, Kepentingan } = require("../../models/kopi");
const { Op } = require('sequelize');
const { ReplaceKepentingan } = require("../../service/rating-kepentingan");
const db = require("../../config/database");

const findAllKriteria = (req, res) => {
    Kriteria.findAll()
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            if (respon.length === 0) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            return jsonFormat(res, statusCode.ok, "success", "Berhasil memuat data", respon)
        }).catch((error) => {
            console.log("error get all kriteria : ", error);
            throw error;
        })
}

const findOneKriteria = (req, res) => {
    const idKriteria = req.params.id_kriteria
    if (!idKriteria) {
        return jsonFormat(res, statusCode.found, "failed", "id_kriteria tidak ditemukan")
    }
    Kriteria.findOne({ where: { id_kriteria: idKriteria } })
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            return jsonFormat(res, statusCode.ok, "success", "Berhasil memuat data", respon)
        }).catch((error) => {
            console.log("error get by id kriteria : ", error);
            throw error;
        })
}

const storeKriteria = async (req, res) => {
    const kriteria = req.body.kriteria
    const bobotKriteria = req.body.bobot_kriteria
    const keteranganKriteria = req.body.keterangan_kriteria
    if (!kriteria) {
        return jsonFormat(res, statusCode.found, "failed", "kriteria dibutuhkan")
    } if (!bobotKriteria) {
        return jsonFormat(res, statusCode.found, "failed", "bobot kriteria dibutuhkan")
    } if (!keteranganKriteria) {
        return jsonFormat(res, statusCode.found, "failed", "keterangan kriteria dibutuhkan")
    }

    const t = await db.transaction()
    Kriteria.findOne({
        where: {
            kriteria: {
                [Op.like]: `%${kriteria}%`
            }
        }
    }, { transaction: t })
        .then((respon) => {
            if (respon) {
                t.rollback()
                return jsonFormat(res, statusCode.conflict, "failed", "Data Sudah Ada")
            }
            Kriteria.create({
                kriteria: kriteria,
                bobot_kriteria: bobotKriteria,
                keterangan_kriteria: keteranganKriteria
            }, { transaction: t }).then(async (responStore) => {
                if (!responStore) {
                    t.rollback()
                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal membuat data")
                }
                const replace = await ReplaceKepentingan()
                if (replace === false) {
                    t.rollback()
                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal mengubah data")
                }
                t.commit()
                return jsonFormat(res, statusCode.ok, "success", "Berhasil membuat data", responStore)
            })
        }).catch((error) => {
            t.rollback()
            console.log("error store kriteria : ", error);
            throw error;
        })
}

const updateKriteria = async (req, res) => {
    const idKriteria = req.params.id_kriteria
    const kriteria = req.body.kriteria
    const bobotKriteria = req.body.bobot_kriteria
    const keteranganKriteria = req.body.keterangan_kriteria

    if (!bobotKriteria) {
        return jsonFormat(res, statusCode.found, "failed", "bobot kriteria dibutuhkan")
    }
    if (!idKriteria) {
        return jsonFormat(res, statusCode.found, "failed", "id_kriteria dibutuhkan")
    }
    if (!kriteria) {
        return jsonFormat(res, statusCode.found, "failed", "kriteria dibutuhkan")
    }
    if (!keteranganKriteria) {
        return jsonFormat(res, statusCode.found, "failed", "keterangan kriteria dibutuhkan")
    }
    const t = await db.transaction()
    Kriteria.findOne({ where: { id_kriteria: idKriteria } }, { transaction: t })
        .then(async (respon) => {
            if (!respon) {
                t.rollback()
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            Kriteria.findOne({
                where: {
                    kriteria: {
                        [Op.like]: `%${kriteria}%`,
                    },
                    id_kriteria: {
                        [Op.not]: idKriteria
                    }
                }
            }, { transaction: t }).then((cekKriteria) => {
                if (cekKriteria) {
                    t.rollback()
                    return jsonFormat(res, statusCode.conflict, "failed", "Data sudah ada")
                }
                Kriteria.update({
                    kriteria: kriteria,
                    bobot_kriteria: bobotKriteria,
                    keterangan_kriteria: keteranganKriteria
                }, {
                    where: { id_kriteria: idKriteria }
                }, { transaction: t }).then(async (responUpdate) => {
                    if (!responUpdate) {
                        t.rollback()
                        return jsonFormat(res, statusCode.badRequest, "failed", "Gagal mengubah data")
                    }
                    const replace = await ReplaceKepentingan()
                    if (replace === false) {
                        t.rollback()
                        return jsonFormat(res, statusCode.badRequest, "failed", "Gagal mengubah data")
                    }
                    t.commit()
                    return jsonFormat(res, statusCode.ok, "success", "Berhasil mengubah data", responUpdate)
                })
            })
        }).catch((error) => {
            t.rollback()
            console.log("error update kriteria : ", error);
            throw error;
        })
}

const destroyKriteria = async (req, res) => {
    const idKriteria = req.params.id_kriteria
    if (!idKriteria) {
        return jsonFormat(res, statusCode.found, "failed", "id_kriteria dibutuhkan")
    }
    const t = await db.transaction()
    Kriteria.findOne({ where: { id_kriteria: idKriteria } }, { transaction: t })
        .then(async (respon) => {
            if (!respon) {
                t.rollback()
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            Kriteria.destroy({
                where: { id_kriteria: idKriteria }
            }, { transaction: t }).then(async (responDestroy) => {
                if (!responDestroy) {
                    t.rollback()
                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal menghapus data")
                }
                const replace = await ReplaceKepentingan()
                if (replace === false) {
                    t.rollback()
                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal mengubah data")
                }
                t.commit()
                return jsonFormat(res, statusCode.ok, "success", "Berhasil menghapus data", responDestroy)
            })
        }).catch((error) => {
            t.rollback()
            console.log("error delete kriteria : ", error);
            throw error;
        })
}

module.exports = {
    findAllKriteria,
    findOneKriteria,
    storeKriteria,
    updateKriteria,
    destroyKriteria
}