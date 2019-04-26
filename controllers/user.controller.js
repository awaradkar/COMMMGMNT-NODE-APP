// Accessing the Service that we just created

var UserService = require('../services/user.service');
// Saving the context of this module inside the _the variable

_this = this

//console.log("Inside commodity controller route:"+UserService);

// Async Controller function to get the Commodity List

exports.getAllUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    console.log("Inside user controller getUser:" + req);
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var users = await UserService.getAllUsers(req.query, page, limit)

        // Return the Commodity list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({ status: 200, data: users, message: "Succesfully users Recieved" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.getUser = async function (req, res, next) {

    var userId = req.params.id;
    try {
        var user = await UserService.getUser(userId);
        return res.status(200).json({ status: 200, data: user, message: "Succesful in finding user" });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getByUserName = async function (req, res, next) {

    var userId = req.params.id;
    try {
        var user = await UserService.getByUserName(userId);
        return res.status(200).json({ status: 200, data: user, message: "Succesful in finding user" });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createUser = async function (req, res, next) {

    // Req.Body contains the form submit values.

    var user = {

        _userId: req.body._userId,
        _userName: req.body._userName,
        _userRole: req.body._userRole,
        _userOrg: req.body._userOrg,
        _userPassword: req.body._userPassword,
        _createdBy: req.body._createdBy
    }

    try {

        // Calling the Service function with the new object from the Request Body

        var createdUser = await UserService.createUser(user);
        return res.status(201).json({ status: 201, data: createdUser, message: "Succesfully Created user" })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: "User Creation was Unsuccesfull" })
    }
}

exports.updateUser = async function (req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }

    var user = req.body;

    try {
        var updatedUser = await UserService.updateUser(user);
        return res.status(200).json({ status: 200, data: updatedUser, message: "Succesfully Updated User" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.removeUser = async function (req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await UserService.deleteUser(id);
        return res.status(200).json({ status: 200, data: deleted, message: "Succesfully User Deleted" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}