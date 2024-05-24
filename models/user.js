const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive']
        }
    }, {
        tableName: 'user',
        timestamps: false
    });

    return User;
};
