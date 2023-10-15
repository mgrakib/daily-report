const { createUserService } = require('../services/auth');
const error = require('../utils/error')
const createUserController = async (req, res, next) => {

    try {
        const userInfo = req.body;
        
        const user = await createUserService(userInfo);
        res.status(201).json({ message: 'user created successful', user })
        
    } catch (e) {
         next(e);
    }
}

module.exports = {
    createUserController
}