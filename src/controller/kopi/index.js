const {
    findAllAlternatif
} = require("./alternatif.controller");
const {
    findAllKriteria
} = require("./kriteria.controller");
const {
    dataDashboard
} = require("./dashboard.controller");

module.exports = {
    findAllAlternatif,
    findAllKriteria,
    dataDashboard
};