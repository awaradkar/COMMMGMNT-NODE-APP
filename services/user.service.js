// Gettign the Newly created Mongoose Model we just created 

var User = require("../models/user.model");
//var ChangePassword = require("../models/chngPasswd.model");
var Organization = require("../models/organization.model");
var jwt = require('jsonwebtoken');
var fs = require('fs');
var UserService = require('./user.service');
var IdGeneratorService = require('./idGenerator.service');
var bcrypt = require('bcrypt');
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
        var orgIdList = [];
        if (query._userOrg != null) {
            var str = "(?i)" + query._userOrg;
            var orgs = await Organization.find({ _orgName: { $regex: str } })

            var orgIdList = [];
            for (const item of orgs) {
                var orgid = item._orgId;
                orgIdList.push(orgid)
            }
            orgIdList.push(query._userOrg);
        }
        var obj = queryObject(query, orgIdList);
        var users = await User.paginate(obj, options)

        var userlist = users.docs;
        console.log(userlist.length);
        var i = 0;
        for (i = 0; i < userlist.length; i++) {
            var item = userlist[i];
            var org = await Organization.findOne({ _orgId: item._userOrg });
            console.log("-------------------------------------------------------------------" + org);
            if (org != null) {
                item._userOrgName = org._orgName;
                userlist[i] = item;
            }
        }

        console.log(userlist);
        // Return the commodity list that was retured by the mongoose promise
        users.docs = userlist;
        return users;

    } catch (e) {
        console.log(e);
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

exports.getByUserName = async function (id) {

    //  Check for id   
    console.log("Inside getByUserName for userName:" + id);
    try {
        var user = await User.findOne({ _userName: id });
        console.log(user);

        if (user == null) {
            user = {};
        }
        return user;
    } catch (e) {
        console.log(e);
        throw Error("Error Occured while Fetching the User")
    }
}

exports.createUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword

    try {
        var userId = await IdGeneratorService.getId("USR");
        var userPassword = await bcrypt.hashSync(user._userPassword, bcrypt.genSaltSync(10));
        var newUser = new User({
            _userId: userId,
            _userName: user._userName,
            _userRole: user._userRole,
            _userPassword: userPassword,
            _userOrg: user._userOrg,
            _isFirstLogin: true,
            _isActive: true,
            _createdDate: new Date(),
            _modifiedDate: "",
            _createdBy: user._createdBy,
            _modifiedBy: ""
        })
        console.log(newUser);
        // Saving the Commodity 

        var savedUser = await newUser.save();
        console.log(savedUser);
        return savedUser;
    } catch (e) {
        console.log(e);
        // return a Error message describing the reason     

        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (user) {
    var id = user._id
    console.log("New id:" + id);
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


    var userPassword = user._userPassword;
    oldUser._userName = user._userName,
        oldUser._userPassword = userPassword,
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
        var user = await User.findOne({ _id: id })
        console.log(user);

        user._isActive = false;
        var deletedUser = user.save();

        if (deletedUser == null) {
            throw Error("user Could not be deleted")
        }
        return deletedUser
    } catch (e) {
        throw Error("Error Occured while Deleting the user")
    }
}

function queryObject(query, orgIdList) {
    var obj = {};
    obj._isActive = true;
    if (query._userId != null) {
        obj._userId = query._userId;
    }
    if (query._userName != null) {
        var str = "(?i)" + query._userName;
        obj._userName = { $regex: str };
    }
    if (orgIdList.length != 0) {
        obj._userOrg = { $in: orgIdList };
    }

    if (query.startDate != null) {
        obj._createdDate = { $gte: new Date(query.startDate) };
    }
    if (query.endDate != null) {
        obj._createdDate = { $lte: new Date(query.endDate) };
    }
    return obj;
}

exports.authenticate = async function (username, password) {
    console.log(username);
    console.log(password);
    var pass
    try {
        var user = await User.findOne({ _userName: username });
        // sign with RSA SHA256
        console.log(user);
        if (user) {
            if (bcrypt.compareSync(password, user._userPassword)) {
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
                    _isActive :user._isActive,
                    _isFirstLogin: user._isFirstLogin,
                    _token: token
                });
                console.log(senduser);
                return senduser;
            } else {
                throw Error("Invalid Password")
            }
        }
        else {
            throw Error("Invalid Credentials")
        }

    } catch (e) {
        console.log(e);
        throw Error(e)
    }
}

exports.changePassword = async function (chngPasswd) {
    var userName = chngPasswd._userName
    console.log("_____________chngPassword__________"+chngPasswd);
    try {
        //Find the old user Object by the Id

        var user = await User.findOne({ _userName: userName });
        console.log(user);

    } catch (e) {
        console.log(e);
        throw Error("Error occured while Finding the User")
    }

    // If no old Commodity Object exists return false

    if (!user) {
        return false;}

    //Edit the User Object
    var oldPassword = chngPasswd._oldPasswd;
    
    console.log(oldPassword+"____________________________"+user._userPassword);
    if(bcrypt.compareSync(oldPassword,user._userPassword)){
        user._isFirstLogin = false;
        user._userPassword = bcrypt.hashSync(chngPasswd._newPasswd, bcrypt.genSaltSync(10));
    }else{
        throw Error("Old Password and Actual Password dont match");
    }
    console.log(user)

    try {
        var savedUser = await user.save()
        return savedUser;
    } catch (e) {
        throw Error("Error occured while changing the password");
    }
}