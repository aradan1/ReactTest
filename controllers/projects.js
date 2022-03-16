const Projects = require('../models').Projects
const Users = require('../models').Users


//Create a new project
exports.projectController_NewProject = function (p_title, p_content, p_description, author_id) {
    return new Promise(function(resolve,reject){
        var success = true

        Projects.findOne({ where: { authorId: author_id , title: p_title  }})
        .then(function(user){
            if(user) {
                resolve(!success)
            }
            else {
                Projects.create({
                    title: p_title,
                    content: p_content,
                    description: p_description,
                    authorId: author_id
                })

                resolve(success)
            }
        }).catch(function (err) {
            reject("Mysql error, check your query: "+err)
        })
    })
}


//Find all project given a User ID
exports.projectController_getAllProjects = function() {
    return new Promise(function (resolve, reject) {

        Projects.findAll( {include: [{
            model: Users,
            attributes: ['privacy','username']
           }] })
        .then(function (projects) {
            if(projects.length !== 0){
                response = {
                    projects: projects.filter(function(projects) {
                        if(projects.dataValues.User.privacy) {
                          return false; // skip
                        }
                        return true;
                    }).map(function (projects, index, array) {
                        projects.dataValues.ownerName = projects.dataValues.User.username
                        delete projects.dataValues.User
                        return projects.dataValues;
                    })
                }
                resolve(response)
            }else{
                resolve(projects)
            }
        }).catch(function (err) {
            console.log("Error ocurred: " + err)
            reject(err)
        })
    })
}


//Find a project given an ID
exports.projectController_getProjectById = function(projectId) {
    return new Promise(function (resolve, reject) {

        /*
            Check proyect owner's privacy (JOIN tables and check for both proyectId and privacy==0)
        */

        Projects.findOne( {where : { id: projectId }, include: [{
            model: Users,
            attributes: ['privacy','username']
           }] })
        .then(function (project) {
            project.dataValues.privacy = project.dataValues.User.privacy
            project.dataValues.ownername = project.dataValues.User.username
            delete project.dataValues.User
            //if(project.User.privacy)
            resolve(project.dataValues)
        }).catch(function (err) {
            console.log("Error ocurred: " + err)
            reject(err)
        })
    })
}


//Find all project given a User ID
exports.projectController_getAllProjectsFromUser = function(userId) {
    return new Promise(function (resolve, reject) {

        Projects.findAll( {where : { authorId: userId }, include: [{
            model: Users,
            attributes: ['privacy']
           }] })
        .then(function (project) {
            if(project.length !== 0){
                response = { 
                    privacy: project[0].dataValues.User.privacy,
                    authorId: userId,
                    project: project.map(function (project, index, array) {
                        delete project.dataValues.User
                        return project.dataValues;
                    })
                }
                resolve(response)
            }else{
                resolve(project)
            }
        }).catch(function (err) {
            console.log("Error ocurred: " + err)
            reject(err)
        })
    })
}


exports.projectController_deleteProjectById = function(projectId, sesionId) {
    return new Promise(function (resolve, reject) {

        Projects.destroy({where : { id: projectId , authorId: sesionId }})
        .then(function (project) {
            resolve(project.dataValues)
        }).catch(function (err) {
            reject(err)
        })
    })
}