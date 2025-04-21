const { userModel } = require("../db")

//Route: /api/v1/user/bulk
//Query Parameter: ?filter=harkirat
const getAllUsersController = async (req, res) => {
    const filter = req.query.filter || "";
    const users = await userModel.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    return res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))

    })

}

module.exports = getAllUsersController;