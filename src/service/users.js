const { User } = require("../models/user");

exports.findOneUserByUsername = async (username) => {
    let user
    await User.findOne({
        where: {
            username: username
        }
    }).then((respon) => {
        user = {
            status: true,
            message: "",
            data: respon
        }
    }).catch((error) => {
        user = {
            status: false,
            message: error,
            data: {}
        }
    })

    return user;
}