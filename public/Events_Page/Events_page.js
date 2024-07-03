// Event listener that executes when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // An array of image filenames that will be used for events
    const images = [
        'Event1.png',
        'Event2.png',
        'Event3.png',
        'Event4.png'
    ];
    let imageIndex = 0;  // Index used to cycle through images

    fetch('/getEvents')
        .then(response => response.json())
        .then(data => {
            // Check if the server response indicates success
            if (data.success) {
                // Get the container element where events will be displayed
                const eventsContainer = document.getElementById('eventsContainer');
                // Iterate through each event data received from the server
                data.events.forEach(event => {
                    const eventElement = document.createElement('article');
                    eventElement.classList.add('event');  // Add class for styling
                    // Format the event date
                    const eventDate = new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    // Get an image from the images array and update the index
                    const imageUrl = images[imageIndex];
                    imageIndex = (imageIndex + 1) % images.length;

                    // Set the inner HTML of the event element with event details
                    eventElement.innerHTML = `
                        <h2>${eventDate} - ${event.title}</h2>
                        <div class="content">
                            <img src="${imageUrl}" alt="Event Image">
                            <div class="event-description">
                                <h1>${event.title}</h1>
                                <p>${event.description}</p>
                                <button class="signup-btn">Sign Up</button>
                            </div>
                        </div>
                    `;
                    // Append the new event element to the events container
                    eventsContainer.appendChild(eventElement);
                });

                // Select all signup buttons and attach click event listeners
                const signupButtons = document.querySelectorAll('.signup-btn');
                signupButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        // Prompt user to enter email for event signup
                        const email = prompt('Please enter your email to sign up for this event:');
                        if (email) {
                            // Get the event title from the closest event description
                            const eventTitle = button.closest('.event-description').querySelector('h1').innerText;
                            // Send the signup request to the server
                            fetch('/signupForEvent', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ email, eventTitle })
                            })
                            .then(response => response.json())
                            .then(data => {
                                // Alert the user based on the response from the server
                                if (data.success) {
                                    alert('Successfully signed up for the event!');
                                } else {
                                    alert('Failed to sign up for the event.');
                                }
                            })
                            .catch(err => console.error('Error:', err));  // Handle errors
                        }
                    });
                });
            } else {
                // Alert if events could not be loaded
                alert('Failed to load events');
            }
        })
        .catch(err => console.error('Error:', err));
});
