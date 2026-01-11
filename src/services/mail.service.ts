import nodemailer from 'nodemailer'
import type { ContactInput } from '../schemas/contact.schema.js';

export class MailService {
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

    }

    async send(data: ContactInput) {
        console.log('====================================');
        console.log(this.transporter);
        console.log('====================================');
        return this.transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.SMTP_TO,
            // replyTo: data.email,
            subject: `Contact From - ${data.email}`,
            html: this.generateMailTemplate(data),
        })
    }

    private generateMailTemplate(data: ContactInput) {
        return `
            <!DOCTYPE html>
            <html>

            <head>
                <meta charset="UTF-8" />
                <title>New Contact Message</title>
            </head>

            <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding:24px">
                            <table width="600" cellpadding="0" cellspacing="0"
                                style="background:#ffffff;border-radius:12px;overflow:hidden">

                                <!-- Header -->
                                <tr>
                                    <td style="background:#64748b;padding:20px;text-align:center">
                                        <h2 style="color:#ffffff;margin:0">REZA HARTONO</h2>
                                        <p style="color:#e5e7eb;margin:4px 0 0">New Contact Message</p>
                                    </td>
                                </tr>

                                <!-- Content -->
                                <tr>
                                    <td style="padding:24px;color:#0f172a">
                                        <p>Hello Team,</p>
                                        <p>You have received a new message from your website contact form.</p>

                                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px">
                                            <tr>
                                                <td style="padding:8px 0"><strong>Name</strong></td>
                                                <td style="padding:8px 0">${data.full_name}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:8px 0"><strong>Email</strong></td>
                                                <td style="padding:8px 0">
                                                    <a href="mailto:${data.email}" style="color:#64748b">${data.email}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:8px 0"><strong>Subject</strong></td>
                                                <td style="padding:8px 0">${data.subject}</td>
                                            </tr>
                                        </table>

                                        <div style="margin-top:16px">
                                            <strong>Message</strong>
                                            <div
                                                style=" margin-top:8px; background:#f8fafc; padding:16px; border-radius:8px; line-height:1.6;">
                                                ${data.message.replace(/\n/g, '<br />')}
                                            </div>
                                        </div>

                                        <div style="margin-top:24px;text-align:center">
                                            <a href="https://www.reza-harono.my.id"
                                                style=" background:#64748b; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:8px;display:inline-block;">
                                                Visit Website
                                            </a>
                                        </div>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="background:#f8fafc; padding:16px; text-align:center; font-size:12px; color:#64748b ">
                                        © ${new Date().getFullYear()} REZA HARTONO. All rights reserved.
                                        <br />
                                        This email was generated automatically from your contact form.
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                </table>
            </body>

            </html>
        `
    }
}