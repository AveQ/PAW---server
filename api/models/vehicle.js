const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brand: {type: String, required: true},
    model: {type: String, required: true},
    price: {type: Number, required: true},
    mileage: {type: Number, required: true},
    capacity: {type: Number, required: true},
    horsepower: {type: Number, required: true},
    acceleration: {type: Number, required: true},
    year: {type: Number, required: true},
    manual: {type: Boolean, required: true},
    multifunction: {type: Boolean, required: true},
    ventilatedSeats: {type: Boolean, required: true},
    heatedSeats: {type: Boolean, required: true},
    navigation: {type: Boolean, required: true},
    airConditioning: {type: Boolean, required: true},
    sunroof: {type: Boolean, required: true},
    bixenons: {type: Boolean, required: true},
    xenon: {type: Boolean, required: true},
    image: { type: String, require: true}
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
