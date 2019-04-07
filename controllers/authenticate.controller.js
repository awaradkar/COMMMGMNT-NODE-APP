var UserService = require('../services/user.service');
// Saving the context of this module inside the _the variable

exports.authenticateUser = async function authenticate(req, res, next) {
        try {

            var user = await UserService.authenticate(req.body.username, req.body.password);
    
            // Return the User
    
            return res.status(200).json({ status: 200, data: user, message: "Login Successful" });
    
        } catch (e) {
    
            //Return an Error Response Message with Code and the Error Message.
    
            return res.status(400).json({ status: 400, message: e.message });
    
        }
}