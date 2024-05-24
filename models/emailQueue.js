const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const EmailQueue = sequelize.define('EmailQueue', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        status: {
            type: DataTypes.ENUM,
            values: ['send', 'not sent']
        },
        created_at: DataTypes.DATE,
        send_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, {
        tableName: 'email_queue',
        timestamps: false
    });

    return EmailQueue;
};
