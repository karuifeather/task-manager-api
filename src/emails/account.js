const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'jhaulaza@gmail.com',
    subject: 'Thanks for joining in!!',
    text: `Welcome to the app, ${name}!! Do let me know how you get along with it.`,
  });
};

const sendCancelMail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'jhaulaza@gmail.com',
    subject: 'Sorry to see you go!!',
    text: `It's quite unfotunate that you're leaving us, ${name}!! Is there anything we could have done to improve your experience in the application? We'd love to hear your remarks. Thank you!`,
  });
};

module.exports = {
  sendWelcomeMail,
  sendCancelMail,
};
