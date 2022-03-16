const ctl_users = require('../../controllers').users
const express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator')
const middleware = require('../middleware')


// POST user register
router.post('/signup', [
    check('email', "Email required").notEmpty()
        .isEmail().withMessage("Field must be email"),
    check('username', "Username required").notEmpty()
        .isAlphanumeric().withMessage("Username must only contain numbers and letter").isLength({min: 6,max: 20}).withMessage("Username must be between 6 and 20 characters long"),
    check('password', "Password required").notEmpty()
        .isStrongPassword().withMessage("Password must contain 8 characters, 1 lower case letter, 1 uppercase letter, 1 number and 1 symbol atleast")
], (req, res) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        return res.status(422).json({ errors: validationErrors})
    }
    ctl_users.userController_Signup(req.body['email'], req.body['username'], req.body['password'])
        .then(function(success){
            if(success){
                res.status(200).send("User registered succesfully")
            }else{
                res.json({
                    success: "Email or Username already used",
                })
            }
        }).catch(function (err) {
            console.log(err)
            res.status(500).send("Internal server error")
        })
})

// POST user login
router.post('/login', [
    check('username', "Username required").notEmpty()
        .isAlphanumeric().withMessage("Username must only contain numbers and letter").isLength({min: 6,max: 20}).withMessage("Username must be between 6 and 20 characters long"),
    check('password', "Password required").notEmpty()
        .isStrongPassword().withMessage("Password must contain 8 characters, 1 lower case letter, 1 uppercase letter, 1 number and 1 symbol atleast")
],(req, res) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        return res.status(400).json({ errors: validationErrors})
    }
    ctl_users.userController_Login(req.body['username'], req.body['password'])
        .then(function(success){
            if(success){
                req.session.user = req.body['username'];
                req.session.userid = success;
                res.status(200).send("User logged in succesfully")
            }else{
                res.json({
                    success: "Incorrect Username or Password",
                })
            }
        }).catch(function (err) {
            console.log(err)
            res.status(500).send("Internal server error")
        })
})

//GET logs user out
router.get('/logout', (req, res) => {
    if (req.session.user) {
        res.clearCookie('user_sid');
    }
    res.status(200).send("User loged out succesfully")
});


//GET all users
router.get("/", (req, res) => {
    ctl_users.userController_getAllUsers()
    .then(user=>{
        if(user.length !== 0){
            res.json(user);
        }
        else{
            res.json({
                success: "No users were found",
            })
        }
    })
  })


//GET user with specific id
router.get("/auth",[
    middleware.sessionChecker
], (req, res) => {
    res.json({
        userid: req.session.userid,
        username: req.session.user
    })
})


//GET user with specific id
router.get("/:userid",[
    check('userid', "Incorrect User id").notEmpty().isNumeric({no_symbols: true}).withMessage("User Id must be numeric")
], (req, res) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        return res.status(400).json({ errors: validationErrors})
    }

    ctl_users.userController_getUserById(req.params.userid)
    .then(user=>{
        if(user){
            
            res.json(user);
        }
        else{
            res.json({
                success: "User not found",
            })
        }
    })
})


//DELETE user with specific id
router.delete("/:userid",[
    check('userid', "Incorrect User id").notEmpty().isNumeric({no_symbols: true}).withMessage("User Id must be numeric"),
    middleware.sessionChecker
], (req, res) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        return res.status(400).json({ errors: validationErrors})
    }

    if(req.params.userid == req.session.userid){
        ctl_users.userController_deleteUserById(req.params.userid)
        .then(user=>{
            if(user){
                res.json({
                    success: "User deleted",
                });
            }
            else{
                res.json({
                    success: "User not deleted",
                })
            }
        })
    }
    res.json({
        success: "Must own the account and be logged in to delete it",
    })
})


//PUT change user description and privacy
router.put("/:userid",[
    check('userid', "Incorrect User id").notEmpty().isNumeric({no_symbols: true}).withMessage("User Id must be a number"),
    check('description', "Incorrect description").notEmpty(),
    check('privacy', "Incorrect privacy").notEmpty().isNumeric({no_symbols: true}).withMessage("Privacy must be a number"),
    middleware.sessionChecker
], (req, res) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        return res.status(400).json({ errors: validationErrors})
    }
    if(req.params.userid == req.session.userid){
        ctl_users.userController_updateProfile(req.params.userid, req.body['description'], req.body['privacy'] )
        .then(user=>{
            if(user){
                res.status(200).send("User modified succesfully");
            }
            else{
                res.json({
                    success: "User not found",
                })
            }
        })
    }
    res.json({
        success: "Must own the account and be logged in to modify it's information",
    })
})

module.exports = router;