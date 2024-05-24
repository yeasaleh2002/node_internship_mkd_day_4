const { EmailQueue, User, Email } = require('../models');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'your_mailtrap_user',
        pass: 'your_mailtrap_password'
    }
});

cron.schedule('0 0 * * *', async () => {
    const emailQueues = await EmailQueue.findAll({
        where: {
            send_at: new Date(),
            status: 'not sent'
        },
        include: [User, Email]
    });

    for (const emailQueue of emailQueues) {
        const emailBody = emailQueue.Email.body
            .replace('{{{NAME}}}', emailQueue.User.name)
            .replace('{{{EMAIL}}}', emailQueue.User.email);

        await transporter.sendMail({
            from: 'from@example.com',
            to: emailQueue.User.email,
            subject: emailQueue.Email.subject,
            text: emailBody
        });

        await emailQueue.update({ status: 'sent' });
    }
});
