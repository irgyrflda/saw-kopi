const router = require("express").Router();
const {
    findAllAlternatif,
    findOneAlternatif,
    findOneNilaiAlternatifByAlternatif,
    storeAlternatif,
    updateAlternatif,
    destroyAlternatif,
    findAllKriteria,
    findOneKriteria,
    storeKriteria,
    updateKriteria,
    destroyKriteria,
    dataDashboard,
    findAllNilaiAlternatif,
    findOneNilaiAlternatif,
    storeNilaiAlternatif,
    updateNilaiAlternatif,
    destroyNilaiAlternatif,
    storeNilaiAlternatifPeralternatif,
    destroyNilaiAlternatifByidAlternatif,
    getProsesPerhitungan
} = require("../controller/kopi");
const { cekSecretKey } = require("../middleware/authorization");

//dashboard
router.get("/dashboard", cekSecretKey, dataDashboard);

//proses perhotungan
router.get("/proses-perhitungan", cekSecretKey, getProsesPerhitungan);

//alternatif
router.get("/alternatif", cekSecretKey, findAllAlternatif);
router.get("/alternatif/:id_alternatif", cekSecretKey, findOneAlternatif);
router.post("/alternatif", cekSecretKey, storeAlternatif);
router.put("/alternatif/:id_alternatif", cekSecretKey, updateAlternatif);
router.delete("/alternatif/:id_alternatif", cekSecretKey, destroyAlternatif);

//kriteria
router.get("/kriteria", cekSecretKey, findAllKriteria);
router.get("/kriteria/:id_kriteria", cekSecretKey, findOneKriteria);
router.post("/kriteria", cekSecretKey, storeKriteria);
router.put("/kriteria/:id_kriteria", cekSecretKey, updateKriteria);
router.delete("/kriteria/:id_kriteria", cekSecretKey, destroyKriteria);

//nilai alternatif
router.get("/nilai-alternatif", cekSecretKey, findAllNilaiAlternatif);
router.get("/nilai-alternatif/:id_nilai_alternatif", cekSecretKey, findOneNilaiAlternatif);
router.get("/nilai-alternatif/alternatif/:id_alternatif", cekSecretKey, findOneNilaiAlternatifByAlternatif);
router.post("/nilai-alternatif", cekSecretKey, storeNilaiAlternatif);
router.put("/nilai-alternatif/:id_nilai_alternatif", cekSecretKey, updateNilaiAlternatif);
router.delete("/nilai-alternatif/:id_nilai_alternatif", cekSecretKey, destroyNilaiAlternatif);
router.post("/bulk-nilai-alternatif", cekSecretKey, storeNilaiAlternatifPeralternatif);
router.delete("/bulk-nilai-alternatif/:id_alternatif", cekSecretKey, destroyNilaiAlternatifByidAlternatif);

module.exports = router;