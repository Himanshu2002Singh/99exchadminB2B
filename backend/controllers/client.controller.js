// controllers/client.controller.js

const Client = require('../models/client.model');
const bcrypt = require('bcryptjs');

exports.createClient = async (req, res)  => {
  try {
    const { name, username, password, balance } = req.body;
    const created_by = req.user.id;

    // Validate creator exists and has permission
    if (req.user.role === 'client') {
      return res.status(403).json({
        success: false,
        message: 'Clients cannot create other clients'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create client
    const newClient = await Client.create({
      name,
      username,
      password: hashedPassword,
      balance: balance || 0,
      created_by,
      role: 'client'
    });

    // Return response without password
    const clientData = newClient.toJSON();
    delete clientData.password;

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: clientData
    });

  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }
    console.error('Error creating client:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.getClientsByCreator = async (req, res) => {
  try {
    const { id } = req.params;
    const clients = await Client.findAll({
      where: { created_by: id },
      attributes: { exclude: ['password'] }
    });
    
    res.status(200).json({
      success: true,
      data: clients
    });
  } catch (err) {
    console.error('Error fetching clients:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.getClientProfile = async (req, res) => {
  try {
    const client = await Client.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    res.status(200).json({
      success: true,
      data: client
    });
  } catch (err) {
    console.error('Error fetching client profile:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Only allow certain fields to be updated
    const allowedUpdates = ['name', 'status'];
    const filteredUpdates = {};
    
    for (const key in updates) {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    }

    // If password is being updated, hash it
    if (updates.password) {
      filteredUpdates.password = await bcrypt.hash(updates.password, 10);
    }

    const [updated] = await Client.update(filteredUpdates, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    const updatedClient = await Client.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    res.status(200).json({
      success: true,
      message: 'Client updated successfully',
      data: updatedClient
    });
  } catch (err) {
    console.error('Error updating client:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};