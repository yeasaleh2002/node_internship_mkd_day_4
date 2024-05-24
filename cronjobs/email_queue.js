const { Email, EmailQueue, User } = require('../models');
const { Op } = require('sequelize');
const cron = require('node-cron');

cron.schedule('0 0 * * *', async () => {
    const day = new Date().getDay(); // 0: Sunday, 1: Monday, etc.
    const isOddDay = day === 1 || day === 3 || day === 5; // Monday, Wednesday, Friday

    const users = await User.findAll({ where: { status: 'active' } });
    const emails = await Email.findAll({
        where: {
            id: { [Op[isOddDay ? 'mod' : 'eq']]: [2, 1] }, // Use modulo for odd/even day logic
            status: 'active'
        }
    });

    const emailQueueEntries = [];

    for (const user of users) {
        for (const email of emails) {
            emailQueueEntries.push({
                email_id: email.id,
                user_id: user.id,
                status: 'not sent',
                send_at: new Date(new Date().setDate(new Date().getDate() + 1)),
                created_at: new Date(),
                updated_at: new Date()
            });
        }
    }

    await EmailQueue.bulkCreate(emailQueueEntries);
});
