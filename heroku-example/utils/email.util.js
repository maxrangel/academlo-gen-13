const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const pug = require('pug');
const path = require('path');
const { htmlToText } = require('html-to-text');

dotenv.config({ path: './config.env' });

class Email {
	constructor(to) {
		this.to = to;
	}

	// Connect to mail service
	newTransport() {
		if (process.env.NODE_ENV === 'production') {
			// Connect to SendGrid
			return nodemailer.createTransport({
				service: 'SendGrid',
				auth: {
					user: 'apikey',
					pass: process.env.SENDGRID_API_KEY,
				},
			});
		}

		return nodemailer.createTransport({
			host: 'smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASSWORD,
			},
		});
	}

	// Send the actual mail
	async send(template, subject, mailData) {
		const html = pug.renderFile(
			path.join(__dirname, '..', 'views', 'emails', `${template}.pug`),
			mailData
		);

		await this.newTransport().sendMail({
			from: process.env.MAIL_FROM,
			to: this.to,
			subject,
			html,
			text: htmlToText(html),
		});
	}

	async sendWelcome(name) {
		await this.send('welcome', 'Welcome to our app', { name });
	}

	async sendNewPost(title, content) {
		await this.send('newPost', 'You have created a new post', {
			title,
			content,
		});
	}
}

module.exports = { Email };
