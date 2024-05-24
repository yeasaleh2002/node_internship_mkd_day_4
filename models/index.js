require('dotenv').config();
const { Sequelize } = require('sequelize');

const config = {
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_ADAPTER: process.env.DB_ADAPTER,
  DB_NAME: process.env.DB_NAME,
  DB_HOSTNAME: process.env.DB_HOSTNAME,
  DB_PORT: process.env.DB_PORT,
};

const sequelize = new Sequelize(config?.DB_DATABASE, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOSTNAME,
  dialect: config.DB_ADAPTER
});
// Import models
const Email = require('./email')(sequelize);
const EmailQueue = require('./emailQueue')(sequelize);
const User = require('./user')(sequelize);

// Define relationships
EmailQueue.belongsTo(Email, { foreignKey: 'email_id' });
EmailQueue.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync();

module.exports = {
    sequelize,
    Email,
    EmailQueue,
    User
};