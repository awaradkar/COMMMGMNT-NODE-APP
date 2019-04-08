// Gettign the Newly created Mongoose Model we just created 

var User = require("../models/user.model");
var jwt = require('jsonwebtoken');
var fs = require('fs');
var UserService = require('./user.service');
// Saving the context of this module inside the _the variable
_this = this

var updateToken = false;

var signOptions = {
    algorithm: 'RS384'   // RSASSA [ "RS256", "RS384", "RS512" ]
};

    // Async function to get the User List
    exports.getAllUsers = async function (query, page, limit) {

        // Options setup for the mongoose paginate      
        console.log("Inside getAllUsers");
        var options = {
            page,
            limit
        }

        // Try Catch the awaited promise to handle the error 

        try {
            var users = await User.paginate(query, options)

            // Return the commodity list that was retured by the mongoose promise

            return users;

        } catch (e) {

            // return a Error message describing the reason 

            throw Error('Error while Paginating Users')
        }
    }

exports.getUser = async function (id) {

        //  Check for id   
        console.log("Inside getUser for id:" + id);
        try {
            var user = await User.findOne({ _userId: id });
            console.log(user);

            if (user == null) {
                throw Error("User not found")
            }
            return user;
        } catch (e) {
            console.log(e);
            throw Error("Error Occured while Fetching the User")
        }
    }

exports.createUser = async function (user) {

        // Creating a new Mongoose Object by using the new keyword

        var newUser = new User({
            _userId: user._userId,
            _userName: user._userName,
            _userRole: user._userRole,
            _userPassword: user._userPassword,
            _userOrg: user._userOrg,
            _createdDate: new Date(),
            _modifiedDate: "",
            _createdBy: user._createdBy,
            _modifiedBy: ""
        })

        try {

            // Saving the Commodity 

            var savedUser = await newUser.save();
            console.log(savedUser);
            return savedUser;
        } catch (e) {

            // return a Error message describing the reason     

            throw Error("Error while Creating User")
        }
    }

exports.updateUser = async function (user) {
        var id = user._id
        console.log("New id:"+id);
        try {
            //Find the old user Object by the Id

            var oldUser = await User.findById(id);
            console.log(oldUser);

        } catch (e) {
            console.log(e);
            throw Error("Error occured while Finding the User")
        }

        // If no old Commodity Object exists return false

        if (!oldUser) {
            return false;
        }

        console.log(oldUser)

        //Edit the User Object

        oldUser._userName = user._userName,
            oldUser._userPassword = user._userPassword,
            oldUser._modifiedDate = new Date(),
            oldUser._modifiedBy = user._modifiedBy
        if (updateToken) {
            oldUser._token = user._token,
            oldUser._tokenDate = user._tokenDate
            updateToken = false;
        }

        console.log(oldUser)

        try {
            var savedUser = await oldUser.save()
            return savedUser;
        } catch (e) {
            throw Error("And Error occured while updating the user");
        }
    }

exports.deleteUser = async function (id) {

        // Delete the Commodity
        console.log(id);

        try {
            var deleted = await User.deleteOne({ _id: id })
            console.log(deleted);

            if (deleted.deletedCount == 0) {
                throw Error("user Could not be deleted")
            }
            return deleted
        } catch (e) {
            throw Error("Error Occured while Deleting the user")
        }
    }

exports.authenticate = async function (username, password) {
        console.log(username);
        console.log(password);
        try {
            var user = await User.findOne({ _userId: username, _userPassword: password });
            // sign with RSA SHA256
            if (user) {
                user._token = "";
                user._tokenDate = new Date();
                var privateKey = fs.readFileSync('/keys/private.key', 'utf8');
                console.log(privateKey);
                var token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60),
                data: JSON.stringify(user)
                }, privateKey, signOptions);
                console.log(token);
                user._token = token;
                updateToken = true;
                UserService.updateUser(user);

                var senduser = new User({
                    _userId: user._userId,
                    _userName: user._userName,
                    _userRole: user._userRole,
                    _userOrg: user._userOrg,
                    _token: token
                });
                console.log(senduser);
                return senduser;
            }
            else{
                throw Error("Invalid Credentials")
            }
           
        } catch (e) {
            console.log(e);
            throw Error(e)
        }
    }