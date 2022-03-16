const router = require('express').Router()

const apiUsersRouter = require('./api/users');
const apiProjectsRouter = require('./api/projects');


router.use('/users', apiUsersRouter);
router.use('/projects', apiProjectsRouter);



router.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

module.exports = router;