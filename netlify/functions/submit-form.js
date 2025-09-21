import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, message, subject, honeypot } = JSON.parse(event.body);

    // Honeypot spam check
    if (honeypot) {
      return { statusCode: 200, body: JSON.stringify({ message: "Thank you for your message!" }) };
    }

    // Input validation
    if (!name || !email || !message || !subject) {
      return { statusCode: 400, body: JSON.stringify({ message: 'All fields are required.' }) };
    }

    const msg = {
      to: 'christinadong.work@gmail.com', // Your personal email
      from: 'christinadong.work@gmail.com', // Verified sender in SendGrid
      subject: `${subject} (from ${name})`, // use the subject from form
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
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending message." }),
    };
  }
};
