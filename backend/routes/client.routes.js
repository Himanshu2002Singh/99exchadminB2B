// routes/client.routes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const auth = require('../middleware/auth');

// Client creation and management (for admins/superadmins)
router.post('/create', auth, clientController.createClient);
router.get('/downline/:id', auth, clientController.getClientsByCreator);
router.put('/:id', auth, clientController.updateClient);

// Client profile routes
router.get('/profile', auth, clientController.getClientProfile);

module.exports = router;