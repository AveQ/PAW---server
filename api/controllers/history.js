const History = require('../models/history');
const mongoose = require('mongoose');

// GET

exports.history_get_all = (req, res, next) => {
    History.find()
        .exec()
        .then(
            docs => {               
                res.status(200).json(docs);
            })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({ error: err });
            }
        );
};

// POST

exports.history_create_history = (req, res, next) => {
    console.log(req.file);
    const history = new History({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        userEmail: req.body.userEmail,
        vehicleId: req.body.vehicleId,
        vehicleName: req.body.vehicleName,
        from: req.body.from,
        to: req.body.to
    });
    history
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                history: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

// GET ID

exports.history_get_history = (req, res, next) => {
    const id = req.params.historyId;
    History.findById(id)
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

// GET BY USERID

exports.history_get_userId = (req, res, next) => {
    History.find({ userId: req.body.userId })
        .exec()
        .then(history => {
        if (history.length >= 1) {
            console.log(history);
            res.status(200).json(history);
        } else {
            res.status(404).json({ message: 'No valid entry found for provided ID' })
        }
    });
};

// DELETE

exports.history_delete_history = (req, res, next) => {
    const id = req.params.historyId;
    History.remove({ _id: id })
        .exec()
        .then(
            result => {
                res.status(200).json(result);
            }
        )
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            }
        );
};

// PATCH

exports.history_modify_history = (req, res, next) => {
    const id = req.params.historyId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    History.update({ _id: id }, { $set: updateOps })
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