const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { 
        type: String, 
        require: true, 
    },
    userEmail: {
        type: String,
        require: true
    },
    vehicleId: {
        type: String, 
        require: true
    },
    vehicleName: {
        type: String,
        require: true
    },
    from: { 
        type: Date, 
        require: true 
    },
    to: {
        type: Date, 
        require: true
    }
});

module.exports = mongoose.model('History', userSchema);

// {
// 	"userId": "5e8606bbb01f3a0e0472543g",
// 	"userEmail": "test@test.com",
// 	"vehicleId": "5e7bcd1a755eb32d88092073",
// 	"vehicleName": "BMW",
// 	"from": "2020-06-26",
// 	"to": "2020-06-27"
// }