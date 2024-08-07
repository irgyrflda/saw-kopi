const secretKey = process.env.SECRETKEY
const { findOneUserByUsername } = require("../service/users");
const { jsonFormat } = require("../utils/jsonFormat");
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

exports.cekSecretKey = async (req, res, next) => {
    const key = req.headers.secret_key;
    const username = req.headers.username;
    try {
        if (!key) {
            return jsonFormat(res, statusCode.unauthorized, "failed", "Unauthorized[0]")
        }
        if (!username) {
            return jsonFormat(res, statusCode.unauthorized, "failed", "Unauthorized[1]")
        }
        if (key !== secretKey) {
            return jsonFormat(res, statusCode.unauthorized, "failed", "Unauthorized[2]")
        }

        const validateUser = await findOneUserByUsername(username)

        if (validateUser.status !== true) {
            return jsonFormat(res, statusCode.badRequest, "failed", `Error validator : ${validateUser.message}`)
        }
        if (!validateUser.data) {
            return jsonFormat(res, statusCode.unauthorized, "failed", "Unauthorized[3]: User tidak terdaftar")
        }
        if (validateUser.data.is_login === 0) {
            return jsonFormat(res, statusCode.badRequest, "failed", "Silahkan login terlebih dahulu")
        }
        next();
    } catch (error) {
        throw error;
    }
}