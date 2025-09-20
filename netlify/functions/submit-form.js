// Example using SendGrid. You'd need to install the client:
// npm install @sendgrid/mail
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const handler = async (event) => {
  // We only care about POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, message, honeypot } = JSON.parse(event.body);

    // 1. Basic Honeypot spam check
    if (honeypot) {
      return { statusCode: 200, body: JSON.stringify({ message: "Thank you for your message!" }) };
    }

    // 2. Input validation
    if (!name || !email || !message) {
      return { statusCode: 400, body: 'Name, email, and message are required.' };
    }

    // 3. Prepare the email
    const msg = {
      to: 'your.email@example.com', // Your personal email
      from: 'noreply@your-domain.com', // A verified sender in SendGrid
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    };

    // 4. Send the email
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