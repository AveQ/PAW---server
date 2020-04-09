const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const HistoryController = require('../controllers/history');

//GET all

router.get('/', HistoryController.history_get_all);

// GET :ID
router.get('/:historyId', HistoryController.history_get_history);

// GET BY :USERID
router.get('/userId/:userId', HistoryController.history_get_userId);

// POST

router.post('/', HistoryController.history_create_history);

// DELETE
router.delete("/:historyId", HistoryController.history_delete_history);

// PATCH
router.patch("/:historyId", HistoryController.history_modify_history);

module.exports = router;