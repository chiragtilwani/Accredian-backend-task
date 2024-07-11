require('dotenv').config();
const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.referral = async (req, res) => {
    const { refereeName, refereeEmail } = req.body;

    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
    });
    try {
        await prisma.referral.create({
            data: {
                referrerName: user.name,
                referrerEmail: user.email,
                refereeName,
                refereeEmail,
                userId: req.user.id,
            },
        });

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const mailOptions = {
            from: { name: "REFER & EARN", address: process.env.GMAIL_USER },
            to: refereeEmail,
            subject: 'You have been referred!',
            text: `Hello ${refereeName},\n\n${user.name} has referred you to our program. Check it out!`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Referral submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}