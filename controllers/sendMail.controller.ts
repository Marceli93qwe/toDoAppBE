import nodemailer from 'nodemailer';

export async function sendEmail(name: string, email: string, message: string): Promise<void> {
    // Skonfiguruj transporter dla Nodemailer
    console.log(email, name, message)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: email,
        to: 'support@yourdomain.com',
        subject: `Wiadomość wsparcia od ${name}`,
        text: message,
    };

    // Wyślij e-mail
    await transporter.sendMail(mailOptions);
}
