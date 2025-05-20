require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/config');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const auth = require('./middleware/auth');
const clientRoutes = require('./routes/client.routes'); 
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/user', auth, userRoutes);

// Sync database
sequelize.sync({ alter: false })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('DB sync error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});