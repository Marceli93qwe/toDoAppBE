import nodemailer from 'nodemailer';

export async function sendEmail(name: string, email: string, message: string): Promise<void> {
    // Skonfiguruj transporter dla Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'managertime07@gmail.com',
            pass: 'Kieubasa1.',
        },
    });

    const mailOptions = {
        from: email,
        to: 'support@yourdomain.com',
        subject: `Wiadomość do supportu od ${name}`,
        text: message,
    };

    // Wyślij e-mail
    await transporter.sendMail(mailOptions);
}
