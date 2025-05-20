const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const Client = require('../models/client.model');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { username, password, userType } = req.body;
        console.log("Login attempt:", { username, userType });

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Username and password required' 
            });
        }

        // Determine which model to use based on userType
        const UserModel = userType === 'client' ? Client : Admin;
        
        // Find user
        const user = await UserModel.findOne({ where: { username } });
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Username Not Found' 
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Password Incorrect' 
            });
        }

        // Create token payload
        const payload = {
            user: {
                id: user.id,
                role: user.role,
                type: userType || 'admin' // Default to admin if not specified
            }
        };

        // Generate JWT token
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Prepare user data for response
        const userData = {
            id: user.id,
            name: user.name,
            username: user.username,
            role: user.role,
            balance: user.balance || 0,
            upline: user.created_by || 0
        };

        // Add client-specific fields if needed
        if (userType === 'client') {
            userData.clientSpecificData = {
                status: user.status || 'active',
                balance: user.balance || 0,
                username: user.username,

                // Add other client-specific fields here
            };
        }

        res.json({ 
            success: true, 
            message: 'Login successful',
            token,
            user: userData
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};