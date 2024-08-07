const router = require("express").Router();
const {
    findAllAlternatif,
    findAllKriteria,
    dataDashboard
} = require("../controller/kopi");
const { cekSecretKey } = require("../middleware/authorization");

router.get("/dashboard", cekSecretKey, dataDashboard);
router.get("/alternatif", cekSecretKey, findAllAlternatif);
router.get("/kriteria", cekSecretKey, findAllKriteria);

module.exports = router;