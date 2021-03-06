const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = "secret";

exports.newUser = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "this email is already registered"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
                                    message: "user created"
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                                console.log(err);
                            });
                    }
                });
            }
        })
}

exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        JWT_KEY, {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successfull",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth Failed"
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.deleteUser = (req, res, next) => {
    user.findOneAndDelete({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "user deleted successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}