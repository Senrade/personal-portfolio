// contact.js
const form = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Make sure honeypot exists
  const honeypotField = form.querySelector('[name="honeypot"]');

  // Collect form data
  const formData = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject ? form.subject.value : 'No subject',
    message: form.message.value,
    honeypot: honeypotField ? honeypotField.value : '',
  };

  try {
    // Netlify serverless function URL
    const res = await fetch('/.netlify/functions/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      statusDiv.textContent = data.message;
      form.reset();
    } else {
      statusDiv.textContent = data.message || 'Something went wrong.';
    }
  } catch (err) {
    console.error(err);
    statusDiv.textContent = 'Error sending message.';
  }
});
