const ctl_projects = require('../../controllers').projects

const express = require('express')
var router = express.Router()

const { check, validationResult } = require('express-validator')
const middleware = require('../middleware')


// POST Registra un proyecto nuevo
router.post('/new', [
    check('title', "Title required").notEmpty().isAlphanumeric('en-US', {ignore: ' '}).withMessage("Title can only contain numbers, letters and spaces"),
    check('content', "Content required").notEmpty(),
    check('description', "Descripton required").notEmpty(),
    middleware.sessionChecker
], (req, res) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        return res.status(422).json({ errors: validationErrors})
    }
    ctl_projects.projectController_NewProject(req.body['title'], req.body['content'], req.body['description'], req.session.userid)
        .then(function(success){
            if(success){
                res.status(200).send("New project created succesfully")
            }else{
                res.json({
                    success: "User can't have 2 projects with the same title",
                })
            }
        }).catch(function (err) {
            console.log(err)
            res.status(500).send("Internal server error")
        })
})


//GET retorna todos los proyectos y sus dueños
router.get("/", (req, res) => {

    ctl_projects.projectController_getAllProjects()
    .then(projects=>{
        if(projects.length !== 0){
            res.json(projects.projects);
        }
        else{
            res.json([])
        }
    })
})


//GET retorna el proyecto con id especificado
router.get("/:projectid",[
    check('projectid', "Incorrect Project id").notEmpty().isNumeric({no_symbols: true}).withMessage("Project Id must be numeric")
], (req, res) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        return res.status(400).json({ errors: validationErrors})
    }

    ctl_projects.projectController_getProjectById(req.params.projectid)
    .then(project=>{
        if(project){

            if(!project.privacy || project.authorId == req.session.userid){
                res.json(project);
            }else{
                res.json({
                    success: "Private User"
                });
            }
        }
        else{
            res.json({
                success: "Project not found",
            })
        }
    })
})


//GET retorna todos los proyectos de usuario con id especificado
router.get("/user/:userid",[
    check('userid', "Incorrect User id").notEmpty().isNumeric({no_symbols: true}).withMessage("User Id must be numeric")
], (req, res) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        return res.status(400).json({ errors: validationErrors})
    }

    ctl_projects.projectController_getAllProjectsFromUser(req.params.userid)
    .then(project=>{
        if(project.length !== 0){
            if(!project.privacy || project.authorId == req.session.userid){
                res.json(project.project);
            }else{
                res.json({
                    success: "Private User"
                });
            }
        }
        else{
            res.json([])
        }
    })
})


//DELETE elimina el proyecto con id especificado
router.delete("/:projectid",[
    check('projectid', "Incorrect Project id").notEmpty().isNumeric({no_symbols: true}).withMessage("Project Id must be numeric"),
    middleware.sessionChecker
], (req, res) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        return res.status(400).json({ errors: validationErrors})
    }

    ctl_projects.projectController_deleteProjectById(req.params.projectid, req.session.userid)
    .then(project=>{
        if(project){
            res.json({
                success: "Project deleted",
            });
        }
        else{
            res.json({
                success: "Must own the project and be logged in",
            })
        }
    })

})

module.exports = router;