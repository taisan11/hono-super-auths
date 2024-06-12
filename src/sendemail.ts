// import * as nodemailer from 'nodemailer'
import {createTransport}from 'nodemailer'
const smtp_host = process.env.SMTP_HOST || `smtp.gmail.com`;
const smtp_port = process.env.SMTP_PORT || 587;
const smtp_auth_user = Bun.env.SMTP_AUTH_USER || ``
const smtp_auth_pass = Bun.env.SMTP_AUTH_PASS || ``
const MAIL_SETTINGS = {
    smtp_host,
    smtp_port,
    smtp_auth_user,
    smtp_auth_pass,
    smtp_ssl: `TLS`,
    smtp_from: smtp_auth_user,
};
function buildMessage(to: string, subject: string, text: string) {
    return {
        from: MAIL_SETTINGS.smtp_from,
        to,
        subject,
        text,
    };
}
const transporter = createTransport({
    pool: false,
    host: MAIL_SETTINGS.smtp_host,
    port: MAIL_SETTINGS.smtp_port,
    secure: MAIL_SETTINGS.smtp_ssl === `SSL`,
    auth: {
        user: MAIL_SETTINGS.smtp_auth_user,
        pass: MAIL_SETTINGS.smtp_auth_pass,
    },
});
export function sendMail(to: string, subject: string, body: string) {
    transporter.sendMail(
        buildMessage(
            to,
            subject,
            body,
        ),
    );
};