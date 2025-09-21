const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, subject, message, honeypot } = JSON.parse(event.body);

    if (honeypot) {
      // Bot detected
      return { statusCode: 200, body: JSON.stringify({ message: "Thanks!" }) };
    }

    if (!name || !email || !message) {
      return { statusCode: 400, body: 'Name, email, and message are required.' };
    }

    const msg = {
      to: 'christinadong.work@gmail.com',       // Your inbox
      from: 'christinadong.work@gmail.com',     // Verified SendGrid sender
      replyTo: email,                            // User's email
      subject: `${subject} (from ${name})`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message sent successfully!" }),
    };
  } catch (err) {
    console.error('SendGrid error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending message." }),
    };
  }
};
