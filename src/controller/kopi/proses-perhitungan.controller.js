const { jsonFormat } = require("../../utils/jsonFormat");
const { statusCode } = require("../../utils/statusCode");
const { QueryTypes } = require("sequelize");
const { Alternatif, Kriteria, TrxHasil } = require("../../models/kopi");
const db = require("../../config/database");

const getProsesPerhitungan = async (req, res, next) => {
    try {
        const dataAlternatif = await Alternatif.findAll({
            attributes: ["id_alternatif"]
        })

        if (dataAlternatif.length === 0) {
            return jsonFormat(res, statusCode.noContent, "failed", "Pastikan data alternatif ada")
        }

        const totalAlternatif = dataAlternatif.length
        const dataKriteria = await Kriteria.findAll({
            attributes: ["id_kriteria"]
        })

        if (dataKriteria.length === 0) {
            return jsonFormat(res, statusCode.noContent, "failed", "Pastikan data kriteria ada")
        }

        const totalKriteria = dataKriteria.length
        const totalNilaiTerhadapAlternatif = totalAlternatif * totalKriteria
        const totalAlternatifdiNilaiAlternatif = await db.query(`SELECT COUNT(a.id_alternatif) total_alternatif
        FROM (SELECT id_alternatif
        FROM trx_nilai_alternatif
        GROUP BY id_alternatif) a`, {
            type: QueryTypes.SELECT
        })

        if (totalAlternatif !== totalAlternatifdiNilaiAlternatif[0]?.total_alternatif) {
            return jsonFormat(res, statusCode.badRequest, "failed", "Pastikan semua data alternatif memiliki nilai kriteria[0]")
        }

        const totalKriteriadiNilaiAlternatif = await db.query(`SELECT COUNT(id_kriteria) total_kriteria
        FROM trx_nilai_alternatif`, {
            type: QueryTypes.SELECT
        })

        if (totalNilaiTerhadapAlternatif !== totalKriteriadiNilaiAlternatif[0]?.total_kriteria) {
            return jsonFormat(res, statusCode.badRequest, "failed", "Pastikan semua data alternatif memiliki nilai kriteria[1]")
        }

        const dataProductTerhadapKriteria = await db.query(`SELECT b.id_alternatif, b.alternatif, c.id_kriteria, c.kriteria, c.bobot_kriteria, c.keterangan_kriteria, c.nilai_rating_bobot,
        a.id_nilai_alternatif, a.nilai_alternatif
        FROM trx_nilai_alternatif a
        JOIN m_alternatif b
        ON a.id_alternatif = b.id_alternatif
        JOIN m_kriteria c
        ON a.id_kriteria = c.id_kriteria`, {
            type: QueryTypes.SELECT
        })

        if (dataProductTerhadapKriteria.length === 0) {
            return jsonFormat(res, statusCode.badRequest, "failed", "Pastikan semua data alternatif memiliki nilai kriteria[2]")
        }

        const nilaiNormalisasi = await db.query(`SELECT b.id_alternatif, b.alternatif, c.id_kriteria, c.kriteria, c.bobot_kriteria, c.keterangan_kriteria, c.nilai_rating_bobot,
        a.id_nilai_alternatif, a.nilai_alternatif, d.pembagi,
        CASE WHEN c.keterangan_kriteria = "benefit" THEN CAST((a.nilai_alternatif / d.pembagi) AS DECIMAL(2,2))
        WHEN c.keterangan_kriteria = "cost" THEN CAST((d.pembagi / a.nilai_alternatif) AS DECIMAL(2,2))
        END AS nilai_normalisasi
        FROM trx_nilai_alternatif a
        JOIN m_alternatif b
        ON a.id_alternatif = b.id_alternatif
        JOIN m_kriteria c
        ON a.id_kriteria = c.id_kriteria
        JOIN (SELECT c.id_kriteria, CASE
        WHEN c.keterangan_kriteria = "benefit" THEN MAX(a.nilai_alternatif)
        WHEN c.keterangan_kriteria = "cost" THEN MIN(a.nilai_alternatif)
        END AS pembagi
        FROM trx_nilai_alternatif a
        JOIN m_alternatif b
        ON a.id_alternatif = b.id_alternatif
        JOIN m_kriteria c
        ON a.id_kriteria = c.id_kriteria
        GROUP BY a.id_kriteria) d
        ON c.id_kriteria = d.id_kriteria`, {
            type: QueryTypes.SELECT
        })

        if (dataProductTerhadapKriteria.length === 0) {
            return jsonFormat(res, statusCode.badRequest, "failed", "Pastikan semua data alternatif memiliki nilai kriteria[3]")
        }

        const hasilPreperensi = await db.query(`SELECT a.id_alternatif, a.alternatif, a.id_kriteria, a.kriteria,
        a.nilai_rating_bobot, a.nilai_normalisasi,
        (a.nilai_rating_bobot * a.nilai_normalisasi) hasil
        FROM (SELECT b.id_alternatif, b.alternatif, c.id_kriteria, c.kriteria, c.bobot_kriteria, c.keterangan_kriteria, c.nilai_rating_bobot,
        a.id_nilai_alternatif, a.nilai_alternatif, d.pembagi,
        CASE WHEN c.keterangan_kriteria = "benefit" THEN CAST((a.nilai_alternatif / d.pembagi) AS DECIMAL(2,2))
        WHEN c.keterangan_kriteria = "cost" THEN CAST((d.pembagi / a.nilai_alternatif) AS DECIMAL(2,2))
        END AS nilai_normalisasi
        FROM trx_nilai_alternatif a
        JOIN m_alternatif b
        ON a.id_alternatif = b.id_alternatif
        JOIN m_kriteria c
        ON a.id_kriteria = c.id_kriteria
        JOIN (SELECT c.id_kriteria, CASE
        WHEN c.keterangan_kriteria = "benefit" THEN MAX(a.nilai_alternatif)
        WHEN c.keterangan_kriteria = "cost" THEN MIN(a.nilai_alternatif)
        END AS pembagi
        FROM trx_nilai_alternatif a
        JOIN m_alternatif b
        ON a.id_alternatif = b.id_alternatif
        JOIN m_kriteria c
        ON a.id_kriteria = c.id_kriteria
        GROUP BY a.id_kriteria) d
        ON c.id_kriteria = d.id_kriteria) a`, {
            type: QueryTypes.SELECT
        })

        if (hasilPreperensi.length === 0) {
            return jsonFormat(res, statusCode.badRequest, "failed", "Pastikan semua data alternatif memiliki nilai kriteria[4]")
        }

        const totalPreperensi = await db.query(`SELECT a.id_alternatif, a.alternatif,
        SUM((a.nilai_rating_bobot * a.nilai_normalisasi)) hasil
        FROM (SELECT b.id_alternatif, b.alternatif, c.id_kriteria, c.kriteria, c.bobot_kriteria, c.keterangan_kriteria, c.nilai_rating_bobot,
        a.id_nilai_alternatif, a.nilai_alternatif, d.pembagi,
        CASE WHEN c.keterangan_kriteria = "benefit" THEN CAST((a.nilai_alternatif / d.pembagi) AS DECIMAL(2,2))
        WHEN c.keterangan_kriteria = "cost" THEN CAST((d.pembagi / a.nilai_alternatif) AS DECIMAL(2,2))
        END AS nilai_normalisasi
        FROM trx_nilai_alternatif a
        JOIN m_alternatif b
        ON a.id_alternatif = b.id_alternatif
        JOIN m_kriteria c
        ON a.id_kriteria = c.id_kriteria
        JOIN (SELECT c.id_kriteria, CASE
        WHEN c.keterangan_kriteria = "benefit" THEN MAX(a.nilai_alternatif)
        WHEN c.keterangan_kriteria = "cost" THEN MIN(a.nilai_alternatif)
        END AS pembagi
        FROM trx_nilai_alternatif a
        JOIN m_alternatif b
        ON a.id_alternatif = b.id_alternatif
        JOIN m_kriteria c
        ON a.id_kriteria = c.id_kriteria
        GROUP BY a.id_kriteria) d
        ON c.id_kriteria = d.id_kriteria) a
        GROUP BY a.id_alternatif`, {
            type: QueryTypes.SELECT
        })

        if (totalPreperensi.length === 0) {
            return jsonFormat(res, statusCode.badRequest, "failed", "Pastikan semua data alternatif memiliki nilai kriteria[5]")
        }

        const perangkingan = await db.query(`
        SELECT a.id_alternatif, a.alternatif, CAST(a.hasil AS FLOAT) hasil
        FROM (SELECT a.id_alternatif, a.alternatif,
        SUM((a.nilai_rating_bobot * a.nilai_normalisasi)) hasil
        FROM (SELECT b.id_alternatif, b.alternatif, c.id_kriteria, c.kriteria, c.bobot_kriteria, c.keterangan_kriteria, c.nilai_rating_bobot,
        a.id_nilai_alternatif, a.nilai_alternatif, d.pembagi,
        CASE WHEN c.keterangan_kriteria = "benefit" THEN CAST((a.nilai_alternatif / d.pembagi) AS DECIMAL(2,2))
        WHEN c.keterangan_kriteria = "cost" THEN CAST((d.pembagi / a.nilai_alternatif) AS DECIMAL(2,2))
        END AS nilai_normalisasi
        FROM trx_nilai_alternatif a
        JOIN m_alternatif b
        ON a.id_alternatif = b.id_alternatif
        JOIN m_kriteria c
        ON a.id_kriteria = c.id_kriteria
        JOIN (SELECT c.id_kriteria, CASE
        WHEN c.keterangan_kriteria = "benefit" THEN MAX(a.nilai_alternatif)
        WHEN c.keterangan_kriteria = "cost" THEN MIN(a.nilai_alternatif)
        END AS pembagi
        FROM trx_nilai_alternatif a
        JOIN m_alternatif b
        ON a.id_alternatif = b.id_alternatif
        JOIN m_kriteria c
        ON a.id_kriteria = c.id_kriteria
        GROUP BY a.id_kriteria) d
        ON c.id_kriteria = d.id_kriteria) a
        GROUP BY a.id_alternatif) a
        ORDER BY a.hasil DESC`, {
            type: QueryTypes.SELECT
        })

        if (perangkingan.length === 0) {
            return jsonFormat(res, statusCode.badRequest, "failed", "Pastikan semua data alternatif memiliki nilai kriteria[6]")
        }

        const dataExHasil = await TrxHasil.findAll()

        const urutanTrx = (dataExHasil.length === 0) ? 0 : parseInt(dataExHasil[dataExHasil.length - 1].urutan_trx)
        const totalExHasil = await TrxHasil.findOne({
            attributes: [
                [db.fn('SUM', db.col('hasil')), 'hasil']
            ],
            where: {
                urutan_trx: urutanTrx
            }
        });

        const urutanEx = urutanTrx
        const urutanNew = urutanTrx + 1
        const totalNewHasil = perangkingan.reduce((accumulator, currentValue) => accumulator + currentValue.hasil,
            0,);


        const totalEx = parseFloat(totalExHasil.hasil).toFixed(3)
        const totalNew = totalNewHasil.toFixed(3)

        let rankings = []

        perangkingan.forEach((a, i) => {
            const no = 1
            rankings.push({
                id_alternatif: a.id_alternatif,
                alternatif: a.alternatif,
                urutan_trx: (totalEx !== totalNew) ? urutanNew : urutanEx,
                hasil: parseFloat(a.hasil),
                rangking: no + i
            })
        })

        const dataRes = {
            data_product_terhadap_kriteria: dataProductTerhadapKriteria,
            hasil_normalisasi: nilaiNormalisasi,
            hasil_preperensi: hasilPreperensi,
            total_preperensi: totalPreperensi,
            perangkingan: rankings
        }

        if (dataExHasil.length === 0 ||
            totalEx !== totalNew
        ) {
            try {
                const postHasil = TrxHasil.bulkCreate(rankings)
                if (!postHasil) {
                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal membuat nilai akhir perangkingan")
                }

                return jsonFormat(res, statusCode.ok, "success", "Berhasil hore", dataRes)
            } catch (error) {
                next(error);
            }
        }


        return jsonFormat(res, statusCode.ok, "success", "Berhasil memuat data", dataRes)

    } catch (error) {
        console.log("error get data normalisasi : ", error);
        next(error)
    }
}

module.exports = {
    getProsesPerhitungan
}