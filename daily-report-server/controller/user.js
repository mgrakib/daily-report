
const {findUser} = require('../services/userService')
const getSingleUser = async (req, res, next) => {
    try {
        const key = req.query.key;
        const value = req.query.value;
        const user = await findUser(key, value);
        res.status(200).json({ user });

    } catch (e) {
         next(e);
    }
};


module.exports = {
	getSingleUser
};