// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Select the form element from the 'stay-in-touch' section
  const form = document.querySelector('.stay-in-touch form');

  // Create a new div element to display messages to the user
  const messageContainer = document.createElement('div');
  form.appendChild(messageContainer);

  // Handle form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect the email from the form
    const formData = new FormData(form);
    const email = formData.get('email');

    // Make a POST request with the email data
    fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // Encode the email for the request body
      body: `email=${encodeURIComponent(email)}`
    })
    .then(response => response.text())
    .then(data => {
      // Update the message container based on the response
      if (data.includes('Email sent successfully')) {
        messageContainer.textContent = 'An email has been sent successfully!';
        messageContainer.style.color = 'green';
      } else if (data.includes('Email already exists. Re-subscription successful.')) {
        messageContainer.textContent = 'Email already exists. Re-subscription successful.';
        messageContainer.style.color = 'green';
      } else {
        messageContainer.textContent = 'An error occurred. Please try again.';
        messageContainer.style.color = 'red';
      }
    })
    .catch(error => {
      // Handle fetch errors
      messageContainer.textContent = 'An error occurred. Please try again.';
      messageContainer.style.color = 'red';
    });
  });
});
