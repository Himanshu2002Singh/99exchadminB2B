const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

const allowedRolesMap = {
  superadmin: ['supermaster', 'master', 'client'],
  supermaster: ['master', 'client'],
  master: ['client'],
};

exports.createAdmin = async (req, res) => {
  const t = await Admin.sequelize.transaction(); // ✅ Initialize transaction

  try {
    const { name, username, password, role, balance, downline_share } = req.body;
    const created_by = req.user.id;

    const creator = await Admin.findByPk(created_by);
    if (!creator) {
      return res.status(400).json({ success: false, message: 'Creator not found' });
    }

    if (creator.balance < balance) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    const allowedRoles = allowedRolesMap[creator.role] || [];
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ 
        success: false, 
        message: `${creator.role} is not allowed to create ${role}` 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const my_share = creator.downline_share - (downline_share || 0);

    const newAdmin = await Admin.create({
      name,
      username,
      password: hashedPassword,
      role,
      balance: balance || 0,
      downline_share: downline_share || 0,
      my_share,
      created_by
    }, { transaction: t }); // ✅ within transaction

    await Admin.update(
      { balance: sequelize.literal(`balance - ${balance}`) },
      { where: { id: created_by }, transaction: t } // ✅ within transaction
    );

    await t.commit(); // ✅ Commit transaction

    const adminData = newAdmin.toJSON();
    delete adminData.password;

    res.status(201).json({ 
      success: true, 
      message: `${role} created successfully`,
      data: adminData
    });

  } catch (err) {
    await t.rollback(); // ✅ Rollback on error

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAdminsByCreator = async (req, res) => {
  try {
    const { id } = req.params;
    const admins = await Admin.findAll({ 
      where: { created_by: id },
      attributes: { exclude: ['password'] }
    });
    res.status(200).json({ 
      success: true, 
      data: admins 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};