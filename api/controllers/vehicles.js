const Vehicle = require('../models/vehicle');
const mongoose = require('mongoose');

// GET

exports.vehicles_get_all = (req, res, next) => {
    Vehicle.find()
        .select('_id brand model price mileage capacity horsepower ' +
            'acceleration year manual multifunction ventilatedSeats heatedSeats navigation ' +
            'airConditioning sunroof bixenons xenon image')
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

exports.vehicles_create_vehicle = (req, res, next) => {
    console.log(req.file);
    const vehicle = new Vehicle({
        _id: new mongoose.Types.ObjectId(),
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        mileage: req.body.mileage,
        capacity: req.body.capacity,
        horsepower: req.body.horsepower,
        acceleration: req.body.acceleration,
        year: req.body.year,
        manual: req.body.manual,
        multifunction: req.body.multifunction,
        ventilatedSeats: req.body.ventilatedSeats,
        heatedSeats: req.body.heatedSeats,
        navigation: req.body.navigation,
        airConditioning: req.body.airConditioning,
        sunroof: req.body.sunroof,
        bixenons: req.body.bixenons,
        xenon: req.body.xenon,
        image: req.file.path
    });
    vehicle
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                vehicle: result
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

exports.vehicles_get_vehicle = (req, res, next) => {
    const id = req.params.vehicleId;
    Vehicle.findById(id)
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

// DELETE

exports.vehicles_delete_vehicle = (req, res, next) => {
    const id = req.params.vehicleId;
    Vehicle.remove({ _id: id })
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

exports.vehicles_modify_vehicle = (req, res, next) => {
    const id = req.params.vehicleId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Vehicle.update({ _id: id }, { $set: updateOps })
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