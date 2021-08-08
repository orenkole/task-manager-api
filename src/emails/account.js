const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sgMail.send({
  to: 'orenkole@gmail.com',
  from: 'orenkole@gmail.com',
  subject: 'This is my first creation',
  text: 'I hope this will work'
});