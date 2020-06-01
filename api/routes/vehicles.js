const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const checkAuthGuest = require('../middleware/check-auth');
const paginatedResults = require('../middleware/paginatedResults');
const VehicleController = require('../controllers/vehicles');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage });

//GET all

router.get('/', VehicleController.vehicles_get_all);

// GET Without PAGINATION

router.get('/all', VehicleController.vehicles_get_allWithout);

// GET :ID
router.get('/:vehicleId', VehicleController.vehicles_get_vehicle);

// POST
router.post('/', checkAuth, upload.single('image'), VehicleController.vehicles_create_vehicle);

// DELETE
router.delete("/:vehicleId", checkAuth, VehicleController.vehicles_delete_vehicle);

// PATCH
router.patch("/:vehicleId", VehicleController.vehicles_modify_vehicle);

module.exports = router;