const Admin = require('../models/admin.model');

exports.getUser = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!admin) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: {
        id: admin.id,
        name: admin.name,
        username: admin.username,
        role: admin.role,
        free_chip: admin.free_chip || 0,
        balance: admin.balance || 0,
        upline: admin.created_by || 0,
        createdAt: admin.createdAt,
      }
    });
  } catch (err) {
    console.error('User controller error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};