const {
    findAllAlternatif,
    findOneAlternatif,
    storeAlternatif,
    updateAlternatif,
    destroyAlternatif
} = require("./alternatif.controller");
const {
    findAllKriteria,
    findOneKriteria,
    storeKriteria,
    updateKriteria,
    destroyKriteria
} = require("./kriteria.controller");
const {
    dataDashboard
} = require("./dashboard.controller");
const {
    findAllNilaiAlternatif,
    findOneNilaiAlternatif,
    findOneNilaiAlternatifByAlternatif,
    storeNilaiAlternatif,
    updateNilaiAlternatif,
    destroyNilaiAlternatif,
    storeNilaiAlternatifPeralternatif,
    destroyNilaiAlternatifByidAlternatif
} = require("./nilai-alternaif.controller");

const {
    getProsesPerhitungan
} = require("./proses-perhitungan.controller")

module.exports = {
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
};