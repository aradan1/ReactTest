const users = require('./users');
const projects = require('./projects');

/* ir añadiendo los demas controladores para facilitar la importacion de estos.
   Esto se puede borrar en un futuro para ser mas especifico con los 'require'
   pero deberemos cambiar todos los imports que los usen.
*/
module.exports = {
    users,
    projects
};