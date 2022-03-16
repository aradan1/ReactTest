const Users = require('../models').Users

const { Op } = require("sequelize");
const bcrypt = require('bcrypt')


//Register a user
exports.userController_Signup = function (u_email, u_name, u_pass) {
    return new Promise(function(resolve,reject){
        const saltRounds = 10
        var success = true

        Users.findOne({where: {
            [Op.or]: [
              { username: u_name },
              { email: u_email }
            ]
          } })
        .then(function(user){
            if(user) {
                resolve(!success)
            }
            else {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(u_pass, salt, function (err, hash) {
                        Users.create({
                            email: u_email,
                            username: u_name,
                            password: hash,
                            privacity : 0,
                        })

                    })
                })
                resolve(success)
            }
        }).catch(function (err) {
            reject("Mysql error, check your query: "+err)
        })
    })
}

//log in user
exports.userController_Login = function (u_name, u_pass) {
    return new Promise(function(resolve,reject){
    var real_pass = ''

    Users.findOne( {raw: true, where : { username: u_name } , attributes: ['id','password'] })
        .then(results => {
            if (!results){
                return resolve(false)
            } 
            
            real_pass = results.password;
            bcrypt.compare(u_pass, real_pass, function (err, res) {
                if (err) {
                    throw err
                }
                if (!res) return resolve(false)

                resolve(results.id)
            })
        }).catch(function(err){
            reject("Mysql error: "+err)
        })
    })
}

//get all users in the DB
exports.userController_getAllUsers = function() {
    return new Promise(function (resolve, reject) {

        Users.findAll({raw: true, attributes: ['id', 'username', 'email']})
            .then(function (user) {
                resolve(user)
            }).catch(function (err) {
                console.log("Error ocurred: " + err)
                reject(err)
            })
    })
}

exports.userController_getUserById = function(userId) {
    return new Promise(function (resolve, reject) {
       
        Users.findOne( {raw: true, where : { id: userId } , attributes: { exclude: ['password'] }})
        .then(function (user) {
            resolve(user)
        }).catch(function (err) {
            console.log("Error ocurred: " + err)
            reject(err)
        })
    })
}

exports.userController_deleteUserById = function(userId) {
    return new Promise(function (resolve, reject) {

        Users.destroy({where : { id: userId }, attributes: { exclude: ['password'] }})
        .then(function (user) {
            resolve(user)
        }).catch(function (err) {
            reject(err)
        })
    })
}

exports.userController_updateProfile = function(userId, udescription, uprivacity){

    return new Promise(function(resolve,reject){

        Users.findOne({where : { id: userId }, attributes: { exclude: ['password'] }})
            .then(function (user) {
                if(user){
                    user.update({
                        description: udescription,
                        privacity: uprivacity
                    })
                }
                resolve(user)
            }).catch(function (err) {
                reject(err)
            })
    })
}