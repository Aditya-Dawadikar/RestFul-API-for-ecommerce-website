const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.js");


router.post('/signup', userController.newUser);

router.post('/login', userController.login);

router.delete('/:userId', userController.deleteUser);

module.exports = router;