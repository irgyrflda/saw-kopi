const { jsonFormat } = require("../../utils/jsonFormat");
const { statusCode } = require("../../utils/statusCode");
const { User } = require("../../models/user");
const {
    encryptPassword,
    decryptPassword
} = require("../../middleware/authorization");
const { Op } = require("sequelize");
const secretKey = process.env.SECRETKEY

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
        return jsonFormat(res, statusCode.found, "failed", "Username tidak boleh kosong")
    }
    if (!password) {
        return jsonFormat(res, statusCode.found, "failed", "Password tidak boleh kosong")
    }

    User.findOne({
        where: {
            username: username
        }
    }).then(async (respon) => {
        if (!respon) {
            return jsonFormat(res, statusCode.found, "failed", "User tidak ditemukan silahkan coba lagi")
        }
        console.log("satu", respon.password);

        const passwordEx = await decryptPassword(respon.password);

        console.log("dua");


        if (passwordEx !== password) {
            return jsonFormat(res, statusCode.badRequest, "failed", "Gagal login silahkan coba lagi")
        }
        if (respon.is_login === 1) {
            return jsonFormat(res, statusCode.conflict, "failed", "Silahkan logout terlebih dahulu")
        }
        User.update({ is_login: 1 }, { where: { username: username } })
            .then((resUpdate) => {
                if (!resUpdate) {
                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal login silahkan coba lagi")
                }
                return jsonFormat(res, statusCode.ok, "success", "Berhasil Login", { role: respon.role, secret_key: secretKey })
            })
    }).catch((error) => {
        console.log("error brow : ", error);
        throw error;
    })
}

const register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confrimPassword = req.body.confrimasi_password;

    if (!username) {
        return jsonFormat(res, statusCode.found, "failed", "Username  tidak boleh kosong")
    }
    if (!password) {
        return jsonFormat(res, statusCode.found, "failed", "Password tidak boleh kosong")
    }
    if (!confrimPassword) {
        return jsonFormat(res, statusCode.found, "failed", "Confromasi password tidak boleh kosong")
    }
    if (confrimPassword !== password) {
        return jsonFormat(res, statusCode.found, "failed", "Password dan confromasi password harus sama")
    }

    User.findAll({ where: { username: username } })
        .then(async (respon) => {
            if (!respon) {
                return jsonFormat(res, statusCode.badRequest, "failed", "Gagal register[0]")
            }
            if (respon.length !== 0) {
                return jsonFormat(res, statusCode.badRequest, "failed", "User sudah terdaftar")
            }
            const encryptPass = await encryptPassword(password)
            User.create({
                username: username,
                password: encryptPass
            }).then((resPost) => {
                if (!resPost) {
                    return jsonFormat(res, statusCode.badRequest, "failed", "Gagal register[1]")
                }
                return jsonFormat(res, statusCode.ok, "success", "Berhasil register")
            })
        }).catch((error) => {
            console.log("error brow : ", error);
            throw new Error("Error : ", error)
        })
}

const logout = (req, res) => {
    const username = req.headers.username

    if (!username) {
        return jsonFormat(res, statusCode.found, "failed", "Username tidak boleh kosong")
    }

    User.findOne({
        where: {
            username: username
        }
    }).then((respon) => {
        if (!respon) {
            return jsonFormat(res, statusCode.found, "failed", "User tidak ditemukan")
        }
        if (respon.is_login === 0) {
            return jsonFormat(res, statusCode.ok, "success", "Sudah Logout")
        }
        User.update({
            is_login: 0
        }, {
            where: {
                username: username
            }
        }).then((responUpdate) => {
            if (!responUpdate) {
                return jsonFormat(res, statusCode.badRequest, "failed", "Gagal logout silahkan coba lagi")
            }
            return jsonFormat(res, statusCode.ok, "success", "Berhasil Logout")
        })
    }).catch((error) => {
        console.log("error logout : ", error);
        throw error;
    })
}

const getAllUsers = (req, res) => {
    const userCreate = req.headers.username
    User.findOne({
        where: {
            username: userCreate,
        }
    }).then((resCek) => {
        if (!resCek) {
            return jsonFormat(res, statusCode.found, "failed", "User create tidak ditemukan")
        }
        if (resCek.role !== 'admin') {
            return jsonFormat(res, statusCode.badRequest, "failed", "Anda bukan admin!!")
        }
        User.findAll({
            where: {
                username: { [Op.not]: userCreate }
            }
        })
            .then((respon) => {
                if (respon.length === 0) {
                    return jsonFormat(res, statusCode.found, "failed", "User tidak ditemukan")
                }
                return jsonFormat(res, statusCode.ok, "success", "Berhasil Memuat Data", respon)
            }).catch((error) => {
                console.log("error logout : ", error);
                throw error;
            })
    })
}

const getByUsername = (req, res) => {
    const username = req.params.username
    const userCreate = req.headers.username
    User.findOne({
        where: {
            username: userCreate
        }
    }).then((resCek) => {
        if (!resCek) {
            return jsonFormat(res, statusCode.found, "failed", "User create tidak ditemukan")
        }
        if (resCek.role !== 'admin') {
            return jsonFormat(res, statusCode.badRequest, "failed", "Anda bukan admin!!")
        }
        if (!username) {
            return jsonFormat(res, statusCode.found, "failed", "Username tidak boleh kosong")
        }
        User.findOne({
            where: {
                username: username
            }
        })
            .then((respon) => {
                if (!respon) {
                    return jsonFormat(res, statusCode.found, "failed", "User tidak ditemukan")
                }
                return jsonFormat(res, statusCode.ok, "success", "Berhasil Memuat Data", respon)
            }).catch((error) => {
                console.log("error logout : ", error);
                throw error;
            })
    })
}

const UpdateRoleUsername = (req, res) => {
    const username = req.params.username
    const userCreate = req.headers.username
    User.findOne({
        where: {
            username: userCreate
        }
    }).then((resCek) => {
        if (!resCek) {
            return jsonFormat(res, statusCode.found, "failed", "User create tidak ditemukan")
        }
        if (resCek.role !== 'admin') {
            return jsonFormat(res, statusCode.badRequest, "failed", "Anda bukan admin!!")
        }
        if (!username) {
            return jsonFormat(res, statusCode.found, "failed", "Username tidak boleh kosong")
        }
        User.findOne({
            where: {
                username: username
            }
        })
            .then((respon) => {
                if (!respon) {
                    return jsonFormat(res, statusCode.found, "failed", "User tidak ditemukan")
                }
                if (respon.is_login === 1) {
                    return jsonFormat(res, statusCode.found, "failed", "Pastikan User yang ingin di ubah rolenya logout terlebih dahulu")
                }
                const roleNew = (respon.role === 'user') ? 'admin' : 'user';
                const updateRole = User.update({
                    role: roleNew
                }, {
                    where: {
                        username: username
                    }
                })
                if (!updateRole) {
                    return jsonFormat(res, statusCode.found, "failed", "Gagal update role user")
                }
                return jsonFormat(res, statusCode.ok, "success", "Berhasil Mengubah role user")
            }).catch((error) => {
                console.log("error logout : ", error);
                throw error;
            })
    })
}

const DeleteRoleUsername = (req, res) => {
    const username = req.params.username
    const userCreate = req.headers.username
    User.findOne({
        where: {
            username: userCreate
        }
    }).then((resCek) => {
        if (!resCek) {
            return jsonFormat(res, statusCode.found, "failed", "User create tidak ditemukan")
        }
        if (resCek.role !== 'admin') {
            return jsonFormat(res, statusCode.badRequest, "failed", "Anda bukan admin!!")
        }
        if (!username) {
            return jsonFormat(res, statusCode.found, "failed", "Username tidak boleh kosong")
        }
        User.findOne({
            where: {
                username: username
            }
        })
            .then((respon) => {
                if (!respon) {
                    return jsonFormat(res, statusCode.found, "failed", "User tidak ditemukan")
                }
                if (respon.is_login === 1) {
                    return jsonFormat(res, statusCode.found, "failed", "Pastikan User yang ingin di ubah rolenya logout terlebih dahulu")
                }
                const deleteRole = User.destroy({
                    where: {
                        username: username
                    }
                })
                if (!deleteRole) {
                    return jsonFormat(res, statusCode.found, "failed", "Gagal menghapus user")
                }
                return jsonFormat(res, statusCode.ok, "success", "Berhasil menghapus user")
            }).catch((error) => {
                console.log("error logout : ", error);
                throw error;
            })
    })
}

module.exports = {
    login,
    register,
    logout,
    getAllUsers,
    getByUsername,
    UpdateRoleUsername,
    DeleteRoleUsername
}