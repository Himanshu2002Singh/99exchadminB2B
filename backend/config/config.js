const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('b2badmin', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
// });


const sequelize = new Sequelize(
  "admin99exch", // database name
  "user",        // username
  "admin99exch", // password
  {
    host: "admin99exch.cnci8y824vcd.eu-north-1.rds.amazonaws.com",
    dialect: "mysql",
    logging: false,
  }
);
 
module.exports = sequelize;
