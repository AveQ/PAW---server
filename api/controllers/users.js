const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// LOGIN

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        });
                    return res.status(200).json({
                        id: user[0]._id,
                        email: req.body.email,
                        token: token,
                        expirationDate: 3600,
                        isAdmin: user[0].isAdmin,
                        historyId: user[0].historyId
                    });
                }
                return res.status(401).json({
                    message: 'Auth failed'
                });
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// SIGN UP

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
        if (user.length >= 1) {
            // conflict 409 / 422
            return res.status(409).json({
                message: 'Mail exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User(
                        {
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            isAdmin: 'USER',
                            historyId: ''
                        }
                    );
                    user.save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'User created'
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                }
            });
        }
    });
};

// DELETE !== '5e86e1b037f73719c8057b1b'

exports.user_delete = (req, res, next) => {
    if(req.params.userId !== '5e86e49eae2e623a48346549') {
        User.remove({
            _id: req.params.userId
        }).exec()
            .then(result => {                
                res.status(200).json({
                    message: 'Delete success'
                });           
            })
            .catch(
                err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                }
            );
    } else {
        res.status(409).json({
            error: 'Illegal ID!'
        });
    }
    
};

// GET ALL USERS

exports.user_get_all = (req, res, next) => {
    User.find()
        .select('_id email isAdmin historyId')
        .exec()
        .then(users => {
            res.status(200).json(
                users
            );
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

// GET ONE USER
exports.users_get_user = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry found for provided ID' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

// PATCH USER 
exports.users_modify_user = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    User.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
