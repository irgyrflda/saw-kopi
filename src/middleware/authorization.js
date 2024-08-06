const secretKey = process.env.SECRETKEY
const jsonFormat = require("../utils/jsonFormat");
const { statusCode } = require("../utils/statusCode");

exports.cekSecretKey = (req, res, next) => {
    try {
        const key = req.headers.key
        if (!key) {
            jsonFormat(res, statusCode.unauthorized, "failed", "Unauthorized[0]")
        }

        if (key !== secretKey) {
            jsonFormat(res, statusCode.unauthorized, "failed", "Unauthorized[1]")
        }

        next();
    } catch (error) {
        throw new Error("Error auth : ", error)
    }
}