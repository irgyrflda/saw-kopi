const { jsonFormat } = require("../../utils/jsonFormat");
const { statusCode } = require("../../utils/statusCode");
const { NilaiAlternatif, Alternatif, Kriteria } = require("../../models/kopi");

const findAllNilaiAlternatif = (req, res) => {
    NilaiAlternatif.findAll()
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            if (respon.length === 0) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            return jsonFormat(res, statusCode.ok, "success", "Berhasil memuat data", respon)
        }).catch((error) => {
            console.log("error get all nilai alternatif : ", error);
            throw error;
        })
}

const findOneNilaiAlternatif = (req, res) => {
    const idNilaiAlternatif = req.params.id_nilai_alternatif
    if (!idNilaiAlternatif) {
        return jsonFormat(res, statusCode.found, "failed", "id_nilai_alternatif tidak ditemukan")
    }
    NilaiAlternatif.findOne({ where: { id_nilai_alternatif: idNilaiAlternatif } })
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            return jsonFormat(res, statusCode.ok, "success", "Berhasil memuat data", respon)
        }).catch((error) => {
            console.log("error get all nilai alternatif : ", error);
            throw error;
        })
}

const storeNilaiAlternatif = (req, res) => {
    const nilaiAlternatif = req.body.nilai_alternatif
    const idAlternatif = req.body.id_alternatif
    const idKriteria = req.body.id_kriteria

    if (!nilaiAlternatif) {
        return jsonFormat(res, statusCode.found, "failed", "nilai alternatif dibutuhkan")
    }
    if (!idAlternatif) {
        return jsonFormat(res, statusCode.found, "failed", "id alternatif dibutuhkan")
    }
    if (!idKriteria) {
        return jsonFormat(res, statusCode.found, "failed", "id kriteria dibutuhkan")
    }
    if (nilaiAlternatif > 10) {
        return jsonFormat(res, statusCode.badRequest, "failed", "Nilai alternatif tidak boleh lebih dari 10")
    }
    Alternatif.findOne({
        where: {
            id_alternatif: idAlternatif
        }
    })
        .then((responCekAlternatif) => {
            if (!responCekAlternatif) {
                return jsonFormat(res, statusCode.conflict, "failed", "Data alternatif tidak ditemukan")
            }
            Kriteria.findOne({
                where: {
                    id_kriteria: idKriteria
                }
            })
                .then((responCekKriteria) => {
                    if (!responCekKriteria) {
                        return jsonFormat(res, statusCode.conflict, "failed", "Data kriteria tidak ditemukan")
                    }
                    NilaiAlternatif.findOne({
                        where: {
                            id_alternatif: idAlternatif,
                            id_kriteria: idKriteria
                        }
                    })
                        .then((respon) => {
                            if (respon) {
                                return jsonFormat(res, statusCode.conflict, "failed", "Data Sudah Ada")
                            }
                            NilaiAlternatif.create({
                                id_alternatif: idAlternatif,
                                id_kriteria: idKriteria,
                                nilai_alternatif: nilaiAlternatif
                            }).then((responStore) => {
                                if (!responStore) {
                                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal membuat data")
                                }
                                return jsonFormat(res, statusCode.ok, "success", "Berhasil membuat data", responStore)
                            })
                        })
                })
        })
        .catch((error) => {
            console.log("error store nilai alternatif : ", error);
            throw error;
        })
}

const updateNilaiAlternatif = (req, res) => {
    const idNilaiAlternatif = req.params.id_nilai_alternatif
    const nilaiAlternatif = req.body.nilai_alternatif
    if (!idNilaiAlternatif) {
        return jsonFormat(res, statusCode.found, "failed", "id_nilai_alternatif dibutuhkan")
    }
    if (!nilaiAlternatif) {
        return jsonFormat(res, statusCode.found, "failed", "nilai alternatif dibutuhkan")
    }
    if (nilaiAlternatif > 10) {
        return jsonFormat(res, statusCode.badRequest, "failed", "Nilai alternatif tidak boleh lebih dari 10")
    }
    NilaiAlternatif.findOne({
        where: {
            id_nilai_alternatif: idNilaiAlternatif,
        }
    })
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            NilaiAlternatif.update({
                nilai_alternatif: nilaiAlternatif
            }, {
                where: { id_nilai_alternatif: idNilaiAlternatif }
            }).then((responUpdate) => {
                if (!responUpdate) {
                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal mengubah data")
                }
                return jsonFormat(res, statusCode.ok, "success", "Berhasil mengubah data", responUpdate)
            })
        }).catch((error) => {
            console.log("error update nilai alternatif : ", error);
            throw error;
        })
}

const destroyNilaiAlternatif = (req, res) => {
    const idNilaiAlternatif = req.params.id_nilai_alternatif
    if (!idNilaiAlternatif) {
        return jsonFormat(res, statusCode.found, "failed", "id_nilai_alternatif dibutuhkan")
    }
    NilaiAlternatif.findOne({ where: { id_nilai_alternatif: idNilaiAlternatif } })
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            NilaiAlternatif.destroy({
                where: { id_nilai_alternatif: idNilaiAlternatif }
            }).then((responDestroy) => {
                if (!responDestroy) {
                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal menghapus data")
                }
                return jsonFormat(res, statusCode.ok, "success", "Berhasil menghapus data", responDestroy)
            })
        }).catch((error) => {
            console.log("error destroy nilai alternatif : ", error);
            throw error;
        })
}

const storeNilaiAlternatifPeralternatif = (req, res) => {
    const nilaiAlternatif = req.body.nilai_alternatif
    const idAlternatif = nilaiAlternatif[0].id_alternatif
    const idKriteria = nilaiAlternatif[0].id_kriteria

    if (nilaiAlternatif.length === 0) {
        return jsonFormat(res, statusCode.noContent, "failed", "nilai alternatif dibutuhkan")
    }

    const cekAlternatif = nilaiAlternatif.some(i => i.id_alternatif !== idAlternatif)
    if (cekAlternatif === true) {
        return jsonFormat(res, statusCode.badRequest, "failed", "Pastikan id alternatif sama")
    }

    const hasDuplicateCriteria = nilaiAlternatif.some((item) =>
        nilaiAlternatif.filter(d => d.id_kriteria === item.id_kriteria).length > 1
    );

    if (hasDuplicateCriteria === true) {
        return jsonFormat(res, statusCode.badRequest, "failed", "Pastikan id kriteria sama")
    }

    const cekNilaiAlternatif = nilaiAlternatif.some(i => i.nilai_alternatif > 10)
    if (cekNilaiAlternatif === true) {
        return jsonFormat(res, statusCode.badRequest, "failed", "Pastikan nilai alternatif tidak ada yang lebih dari 10")
    }
    Alternatif.findOne({
        where: {
            id_alternatif: idAlternatif
        }
    })
        .then((responCekAlternatif) => {
            if (!responCekAlternatif) {
                return jsonFormat(res, statusCode.conflict, "failed", "Data alternatif tidak ditemukan")
            }
            Kriteria.findOne({
                where: {
                    id_kriteria: idKriteria
                }
            })
                .then(async (responCekKriteria) => {
                    if (!responCekKriteria) {
                        return jsonFormat(res, statusCode.conflict, "failed", "Data kriteria tidak ditemukan")
                    }
                    // NilaiAlternatif.findOne({
                    //     where: {
                    //         id_alternatif: idAlternatif,
                    //         id_kriteria: idKriteria
                    //     }
                    // })
                    //     .then((respon) => {
                    //         if (respon) {
                    //             return jsonFormat(res, statusCode.conflict, "failed", "Data Sudah Ada")
                    //         }
                    try {
                        const postBulk = await NilaiAlternatif.bulkCreate(nilaiAlternatif)
                        jsonFormat(res, statusCode.ok, "success", "Berhasil membuat data", postBulk)
                    } catch (error) {
                        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeee : ", error);
                        
                        return jsonFormat(res, statusCode.badRequest, "failed", `Error: gagal membuat data: ${error.name}`)
                    }
                    // })
                })
        })
        .catch((error) => {
            console.log("error store nilai alternatif : ", error);
            throw error;
        })
}

const destroyNilaiAlternatifByidAlternatif = (req, res) => {
    const idAlternatif = req.params.id_alternatif
    if (!idAlternatif) {
        return jsonFormat(res, statusCode.found, "failed", "id_nilai_alternatif dibutuhkan")
    }
    NilaiAlternatif.findOne({ where: { id_alternatif: idAlternatif } })
        .then((respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.noContent, "failed", "Data tidak ditemukan")
            }
            NilaiAlternatif.destroy({
                where: { id_alternatif: idAlternatif }
            }).then((responDestroy) => {
                if (!responDestroy) {
                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal menghapus data")
                }
                return jsonFormat(res, statusCode.ok, "success", "Berhasil menghapus data", responDestroy)
            })
        }).catch((error) => {
            console.log("error destroy nilai alternatif : ", error);
            throw error;
        })
}

module.exports = {
    findAllNilaiAlternatif,
    findOneNilaiAlternatif,
    storeNilaiAlternatif,
    updateNilaiAlternatif,
    destroyNilaiAlternatif,
    storeNilaiAlternatifPeralternatif,
    destroyNilaiAlternatifByidAlternatif
}