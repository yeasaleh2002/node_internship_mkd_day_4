const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Email = sequelize.define('Email', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        subject: DataTypes.STRING,
        body: DataTypes.TEXT,
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive']
        }
    }, {
        tableName: 'email',
        timestamps: false
    });

    return Email;
};
