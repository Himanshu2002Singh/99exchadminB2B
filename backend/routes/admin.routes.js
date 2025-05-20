const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const auth = require('../middleware/auth');

router.post('/create', auth, adminController.createAdmin);
router.get('/downline/:id', auth, adminController.getAdminsByCreator);

module.exports = router;