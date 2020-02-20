const bcrypt = require("bcrypt");
const jwtGen = require("../middleware/jwt_generator");
const User = require("../models/user.model");

exports.get_all = ((req, res) => {
    User.find((err, data) => {
        if (err) {
            res.status(500).json({
                error: {
                    status: "Error in getting users",
                    message: err
                }
            });
            return;
        }
        else {
            res.status(200).json({
                data: {
                    users: data
                }
            });
        }
    }).select("-password");
});

exports.get_all_by_login = ((req, res) => {
    const login = req.params.login;
    User.find({ login: login }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: {
                    status: "Error in getting users",
                    message: err
                }
            });
            return;
        }
        else {
            if (data.length >= 1) {
                res.status(200).json({
                    data: {
                        users: data
                    }
                });
            }
            else {
                res.status(200).json({
                    status: `Found no users with login: ${login}`
                });
            }

        }
    }).select("-password");
})

exports.create_new = ((req, res) => {
    const { login, name, password, mail } = req.body;
    // User.findOne({ login: login }, (err, user) => {
    //     if (err) {
    //         res.status(500).json({
    //             error: {
    //                 status: "Error in getting user",
    //                 message: err
    //             }
    //         });
    //         return;
    //     }
    //     if (user) {
    //         res.status(401).json({
    //             status: `User with login: ${login} already exists`
    //         });
    //         return;
    //     }
    // else {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: {
                    status: "Error in hashing",
                    message: err
                }
            });
            return;
        }
        let user = new User({
            login: login,
            password: hash,
            name: name,
            mail: mail
        });
        // user.save((err) => {

        User.create(user, (err) => {
            if (err) {
                res.status(400).json({
                    error: {
                        status: "Failed to insert",
                        message: err.errmsg
                    }
                });
                return;
            }
            else {
                delete user.password;
                const token = jwtGen.generateJWT(user)
                res.status(201).json({
                    data: {
                        status: "User successfully created",
                        user: user,
                        token: token
                    }
                });
            }
        });
    });
    // }
    // });
});

exports.auth = ((req, res) => {
    const { login, password } = req.body;
    User.findOne({ login: login }, (err, user) => {
        if (err) {
            res.status(500).json({
                error: {
                    status: "Unexpected error",
                    message: err
                }
            });
            return;
        }
        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (err) {
                    res.status(500).json({
                        error: {
                            status: "Error in hashing",
                            message: err
                        }
                    });
                    return;
                }
                if (same) {
                    token = jwtGen.generateJWT(user);
                    res.status(200).json({
                        result: {
                            status: "Successfully authorized",
                            token: token
                        }
                    });
                    return;
                }
                else {
                    res.status(401).json({
                        result: {
                            status: "Unauthorized",
                            message: "Bad credentials"
                        }
                    });
                    return;
                }
            });
        }
        else {
            res.status(401).json({
                result: {
                    status: "Unauthorized",
                    message: `Found no user with login: ${login}`
                }
            });
            return;
        }
    });
});

exports.delete_all = ((req, res) => {
    User.remove().all.then(data => {
        res.status(200).json({
            result: {
                status: "All users successfully deleted",
                message: data
            }
        }).catch(err => {
            res.status(500).json({
                result: {
                    status: "Error deleting all",
                    message: data
                }
            })
        });
    })
})

exports.delete_all_by_login = ((req, res) => {
    const login = req.params["login"];
    User.remove({ login: login }).then((data) => {
        if (data.deletedCount === 0) {
            res.status(204).json({
                result: {
                    status: `No found user with login: ${login}`,
                    message: data
                }
            });
            return;
        }
        res.status(200).json({
            result: {
                status: "User deleted",
                message: data
            }
        });
    }).catch(err => {
        res.status(400).json({
            result: {
                status: "Can not delete user",
                message: err
            }
        });
    })
});

exports.delete_one_by_login = ((req, res) => {
    const login = req.params["login"];
    User.findOneAndDelete({ login: login }).then((data) => {
        if (data.deletedCount === 0) {
            res.status(400).json({
                result: {
                    status: `No found user with login: ${login}`,
                    message: data
                }
            });
            return;
        }
        res.status(200).json({
            result: {
                status: "User deleted",
                message: data
            }
        });
    }).catch(err => {
        res.status(400).json({
            result: {
                status: "Can not delete user",
                message: err
            }
        });
    })
});