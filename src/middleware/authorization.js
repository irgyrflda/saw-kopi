const secretKey = process.env.SECRETKEY
const jsonFormat = require("../utils/jsonFormat");
const { statusCode } = require("../utils/statusCode");
const CryptoJS = require("crypto-js");


exports.encryptPassword = (password) => {
    const ciphertext = CryptoJS.AES.encrypt(password, secretKey).toString();
    return ciphertext;
}

exports.decryptPassword = (encryptedPassword) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
};

exports.cekSecretKey = (req, res, next) => {
    const key = req.headers.key
    if (!key) {
        jsonFormat(res, statusCode.unauthorized, "failed", "Unauthorized[0]")
    }

    if (key !== secretKey) {
        jsonFormat(res, statusCode.unauthorized, "failed", "Unauthorized[1]")
    }

    next();
}