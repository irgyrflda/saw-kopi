const { QueryTypes } = require('sequelize');
const db = require("../config/database");

exports.ReplaceKepentingan = () => {
    try {
        db.query(`UPDATE m_kriteria a
        JOIN (SELECT a.id_kriteria, CAST((a.bobot_kriteria / a.total_bobot_kriteria) AS DECIMAL(20,2)) rating
        FROM (SELECT id_kriteria, kriteria, bobot_kriteria, (SELECT SUM(bobot_kriteria)
        FROM m_kriteria) total_bobot_kriteria
        FROM m_kriteria) a) b
        ON a.id_kriteria = b.id_kriteria
        SET a.nilai_rating_bobot = b.rating`, {
            type: QueryTypes.UPDATE
        })
            .then((respon) => {
                if (!respon) {
                    console.log("error update kepentingan[1]");
                    return false
                }
                return true
            }).catch((error) => {
                console.log("error update kepentingan : ", error);
                return false
            })
    } catch (error) {
        console.log("error update kepentingan : ", error);
        return false
    }
}