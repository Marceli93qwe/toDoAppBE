import nodemailer from 'nodemailer';

export async function sendEmail(name: string, email: string, message: string): Promise<void> {
    // Skonfiguruj transporter dla Nodemailer
    console.log(email, name, message)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adam.hujewa@gmail.com',
            pass: 'vmgr zicy dmso vbvi',
        },
    });

    const mailOptions = {
        from: email,
        to: 'adam.hujewa@gmail.com',
        subject: `Wiadomość do supportu od ${name}`,
        text: message,
    };

    // Wyślij e-mail
    await transporter.sendMail(mailOptions);
}
