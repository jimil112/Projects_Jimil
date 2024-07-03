// Reference to the button element associated with the current event
let currentEventButton = null;

// Array to store private updates
let privateUpdates = [];

// Array to store admin info
let admins = [];

// Array to store events info
let events = [];

function showContent(section) {
    // Get the content element where the section's content will be displayed and clear current content
    const content = document.getElementById('content');
    content.innerHTML = '';
    switch (section) {
        case 'manage':
            // Display the manage section with user info and logout button
            content.innerHTML = `
                <h2>Manage</h2>
                <div class="user-info">
                    <div class="info-row">
                        <label for="name">Full Name:</label>
                        <input type="text" id="name" value="" onclick="this.removeAttribute('readonly')" readonly>
                    </div>
                    <div class="info-row">
                        <label for="user-type">User Type:</label>
                        <input type="text" id="user-type" value="" onclick="this.removeAttribute('readonly')" readonly>
                    </div>
                    <div class="info-row">
                        <label for="email">Email:</label>
                        <input type="email" id="email" value="" onclick="this.removeAttribute('readonly')" readonly>
                    </div>
                    <div class="info-row">
                        <label for="phone">Phone:</label>
                        <input type="tel" id="phone" value="" onclick="this.removeAttribute('readonly')" readonly>
                    </div>
                    <div class="info-row">
                        <label for="password">Password:</label>
                        <input type="password" id="password" value="" onclick="this.removeAttribute('readonly')" readonly>
                    </div>
                    <button id="logout-btn">Logout</button>
                </div>
            `;
            // Populate the user info with data
            populateUserInfo();
            // Add event listener for logout button
            document.getElementById('logout-btn').addEventListener('click', function () {
                fetch('/logout', {
                    method: 'POST'
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            localStorage.clear();
                            showContent('manage');
                        } else {
                            alert(data.message);
                        }
                    })
                    .catch(err => console.error('Error:', err));
            });
            break;
        case 'view':
            fetch('/getPublicUpdates')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const publicUpdates = data.updates;
                        content.innerHTML = `
                            <h2>View Updates</h2>
                            <div class="box">
                                <h3>View Updates from Volunteer Organization</h3>
                                <div id="publicUpdatesContainer">
                                    ${publicUpdates.map(update => `
                                        <p>
                                            ${update.content}
                                            ${localStorage.getItem('userType') !== 'user' ? `<button onclick="deleteUpdate(${update.id}, 'public')">Delete</button>` : ''}
                                        </p>
                                    `).join('')}
                                </div>
                                ${localStorage.getItem('userType') !== 'user' ? `
                                <div id="privateUpdatesContainer"></div>` : ''}
                            </div>
                        `;
                        // Fetch and display private updates if the user is not a regular user
                        if (localStorage.getItem('userType') !== 'user') {
                            fetch('/getPrivateUpdates')
                                .then(response => response.json())
                                .then(data => {
                                    if (data.success) {
                                        privateUpdates = data.updates;
                                        document.getElementById('privateUpdatesContainer').innerHTML = `
                                            ${privateUpdates.map(update => `
                                                <p>
                                                    ${update.content}
                                                    <button onclick="deleteUpdate(${update.id}, 'private')">Delete</button>
                                                </p>
                                            `).join('')}
                                        `;
                                    } else {
                                        alert('Failed to load private updates');
                                    }
                                })
                                .catch(err => console.error('Error:', err));
                        }
                    } else {
                        alert('Failed to load public updates');
                    }
                })
                .catch(err => console.error('Error:', err));
            break;
        case 'view members':
            fetch('/getUsers')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        content.innerHTML = `
                            <h2>View Members</h2>
                            <div class="box">
                                <table class="members-table">
                                    <thead>
                                        <tr>
                                            <th>User Type</th>
                                            <th>Full Name</th>
                                            <th>Phone Number</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${data.users.map(user => `
                                            <tr>
                                                <td>${user.user_type}</td>
                                                <td>${user.full_name}</td>
                                                <td>${user.phone_number}</td>
                                                <td>${user.email}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `;
                    } else {
                        alert('Failed to load members');
                    }
                })
                .catch(err => console.error('Error:', err));
            break;
        case 'create-update':
            // Display create/update event section
            content.innerHTML = `
                <h2>Create/Update</h2>
                <div class="box">
                    <h3>Create Events</h3>
                    <button id="addEventBtn">Add Event</button>
                </div>
                <div class="box">
                    <h3>Update Events</h3>
                    <div id="eventButtonsContainer"></div>
                </div>
            `;
            // Add event listener for the add event button
            document.getElementById('addEventBtn').addEventListener('click', function () {
                showEventModal();
            });
            fetchEvents();
            break;
        case 'join':
            // Display join section
            showJoinContent();
            break;
        case 'event':
            // Display manage updates section
            content.innerHTML = `
                <h2>Manage Updates</h2>
                <div class="box">
                    <h3>Post Public Update</h3>
                    <textarea id="publicUpdateContent" placeholder="Write your public update here..."></textarea><br>
                    <button id="postPublicUpdateBtn">Post Public Update</button>
                    <div id="publicUpdatesContainer"></div>
                </div>
                ${localStorage.getItem('userType') !== 'user' ? `
                <div class="box">
                    <h3>Post Private Update</h3>
                    <textarea id="privateUpdateContent" placeholder="Write your private update here..."></textarea><br>
                    <button id="postPrivateUpdateBtn">Post Private Update</button>
                </div>` : ''}
                `;
            // Add event listeners for post update buttons
            document.getElementById('postPublicUpdateBtn').addEventListener('click', postPublicUpdate);
            if (localStorage.getItem('userType') !== 'user') {
                document.getElementById('postPrivateUpdateBtn').addEventListener('click', postPrivateUpdate);
            }
            break;
        // Display admin users management section
        case 'admin-users':
            content.innerHTML = `
                <div class="box">
                    <h3>Sign up Users/Admins/Managers</h3>
                    <button id="signUpAdminBtn">Sign Up</button>
                </div>
                <div class="box">
                    <h3>Manage Users</h3>
                    <table id="adminMembersTable" class="members-table">
                        <thead>
                            <tr>
                                <th>User Type</th>
                                <th>Full Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Data will be populated here -->
                        </tbody>
                    </table>
                </div>
                <div id="adminSignupModal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2>Sign Up User</h2>
                        <form id="adminSignupForm">
                            <label for="userType">User Type:</label>
                            <select id="userType" name="userType" required>
                                <option value="user">User</option>
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                            </select>
                            <label for="fullName">Full Name:</label>
                            <input type="text" id="fullName" name="fullName" required>
                            <label for="phoneNumber">Phone Number:</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" required>
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" required>
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            `;
            // Add event listener for sign up button
            document.getElementById('signUpAdminBtn').addEventListener('click', function () {
                document.getElementById('adminSignupModal').style.display = 'block';
            });

            // Display users in the admin members table
            fetch('/getUsers')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const adminMembersTableBody = document.querySelector('#adminMembersTable tbody');
                        data.users.forEach(user => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${user.user_type}</td>
                                <td>${user.full_name}</td>
                                <td>${user.phone_number}</td>
                                <td>${user.email}</td>
                                <td><button onclick="deleteUser('${user.email}')">Delete</button></td>
                            `;
                            adminMembersTableBody.appendChild(row);
                        });
                    } else {
                        alert('Failed to load members');
                    }
                })
                .catch(err => console.error('Error:', err));

            // Add event listener for the sign up form
            document.getElementById('adminSignupForm').addEventListener('submit', function (event) {
                event.preventDefault();
                const userType = document.getElementById('userType').value;
                const fullName = document.getElementById('fullName').value;
                const phoneNumber = document.getElementById('phoneNumber').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                fetch('/admin-signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ user_type: userType, full_name: fullName, phone_number: phoneNumber, email: email, password: password })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert(data.message);
                            document.getElementById('adminSignupModal').style.display = 'none';
                            showContent('admin-users');
                        } else {
                            alert(data.message);
                        }
                    })
                    .catch(err => console.error('Error:', err));
            });

            // Close the modal when the close button is clicked or outside of it
            document.querySelector('.modal .close').onclick = function () {
                document.getElementById('adminSignupModal').style.display = 'none';
            };

            window.onclick = function (event) {
                if (event.target == document.getElementById('adminSignupModal')) {
                    document.getElementById('adminSignupModal').style.display = 'none';
                }
            };
            break;
        // Display branch management section
        case 'branch':
            content.innerHTML = `
                <h2>Branch Manage</h2>
                <div class="branch-box">
                    <h3>Branch: Food Link Adelaide</h3>
                    <button onclick="editEventDetails('Local Food Drive', 'Adelaide', '8/9/24', 'Local Food Drive description')">Local Food Drive</button>
                </div>
                <div class="branch-box">
                    <h3>Branch: Food Link Sydney</h3>
                    <button onclick="editEventDetails('Halloween Food Drive', 'Sydney', '31/10/24', 'Halloween Food Drive description')">Halloween Food Drive</button>
                </div>
                <div class="branch-box">
                    <h3>Branch: Food Link Brisbane</h3>
                    <button onclick="editEventDetails('Woman in Power Luncheon', 'Brisbane', '13/9/24', 'Woman in Power Luncheon description')">Woman in Power Luncheon</button>
                </div>
                <div class="branch-box">
                    <h3>Branch: Food Link Melbourne</h3>
                    <button onclick="editEventDetails('Packathon', 'Melbourne', '26/10/24', 'Packathon description')">Packathon</button>
                    </div>
                `;
            break;
        default:
            // Default content if no valid section is provided
            content.innerHTML = '<h2>Welcome to the Dashboard</h2><p>Select an option from the sidebar to view more details.</p>';
    }
}

function showJoinContent() {
    const content = document.getElementById('content');
    // Clear the current content and set the new innerHTML for the join section
    content.innerHTML = `
            <h2>Join</h2>
            <section class="events">
                ${events.map(event => `
                    <article class="event box">
                        <h2>${event.date} - ${event.title}</h2>
                        <div class="content">
                            <img src="Event1.png" alt="Event Image">
                            <div class="event-description">
                                <h1>${event.title}</h1>
                                <p>${event.description}</p>
                                <button class="rsvp-button" onclick="rsvpEvent('${event.title}')">RSVP</button>
                            </div>
                        </div>
                    </article>
                `).join('')}
            </section>
        `;
}

function rsvpEvent(eventName) {
    // Get the RSVP modal element
    const rsvpModal = document.getElementById('rsvpModal');
    // Display the event name in the modal
    const rsvpEventName = document.getElementById('rsvpEventName');
    // Set the event name in the modal
    rsvpEventName.textContent = eventName;
    // Display the RSVP modal
    rsvpModal.style.display = 'flex';

    const rsvpForm = document.getElementById('rsvpForm');
    // Set the form submission handler
    rsvpForm.onsubmit = function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Get the user's email from the form input
        const userEmail = document.getElementById('rsvpEmail').value;
        // Show a confirmation alert with event and user email details
        alert(`Thank you! You have successfully RSVP'd for the ${eventName}. A confirmation email will be sent to ${userEmail}.`);
        // Hide the RSVP modal
        rsvpModal.style.display = 'none';
    };
}
// Get the event modal element by its ID
var modal = document.getElementById("eventModal");

// Get the first element with the class name "close"
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    // Set the modal's display style to "none" to hide the modal
    modal.style.display = "none";
    // Call the resetEventForm function to clear and reset the event form fields
    resetEventForm();
};


window.onclick = function (event) {
    // Check if the clicked target is the modal
    if (event.target == modal) {
        // Hide the modal by setting its display style to "none"
        modal.style.display = "none";
        // Call the resetEventForm function to clear and reset the event form fields
        resetEventForm();
    }
};

// Attach an event listener to the form's submit event
document.getElementById('eventForm').onsubmit = function (event) {
    event.preventDefault();
    // Get the value of the title, location, date and description
    var title = document.getElementById('eventTitle').value;
    var location = document.getElementById('eventLocation').value;
    var date = document.getElementById('eventDate').value;
    var description = document.getElementById('eventDescription').value;

    if (currentEventButton) {
        // Update the existing event button with the new values
        updateEventButton(currentEventButton, title, location, date, description);
    } else {
        // Add a new event with the provided values
        addEvent(title, location, date, description);
    }

    modal.style.display = "none";
    // Reset the form to its default state
    resetEventForm();
};


document.getElementById('eventUpdateBtn').onclick = function () {
    // Get the values of the event title, location, date and description
    var title = document.getElementById('eventTitle').value;
    var location = document.getElementById('eventLocation').value;
    var date = document.getElementById('eventDate').value;
    var description = document.getElementById('eventDescription').value;

    // Calling the updateEventButton function with the current event details
    updateEventButton(currentEventButton, title, location, date, description);

    // Hide the modal window
    modal.style.display = "none";
    // Reset the event form fields
    resetEventForm();
};

function showEventModal(isUpdate = false) {
    // Toggle the visibility of the submit button
    document.getElementById('eventSubmitBtn').style.display = isUpdate ? 'none' : 'inline-block';

    // Toggle the visibility of the update button b
    document.getElementById('eventUpdateBtn').style.display = isUpdate ? 'inline-block' : 'none';

    modal.style.display = 'block';
}

function resetEventForm() {
    // Clear the value of the event title, location date and description
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventLocation').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventDescription').value = '';

    // Reset the current event button to null
    currentEventButton = null;
}

function addEvent(title, location, date, description) {
    // Send a POST request to the server to add a new event
    fetch('/addEvent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, location, date, description })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // If the event was added successfully, show a success message
                alert(data.message);
                // Display the updated list of events
                fetchEvents();
            } else {
                alert('Failed to add event');
            }
        })
        .catch(err => console.error('Error:', err));
}

function fetchEvents() {
    // Fetch events data from the server
    fetch('/getEvents')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Store the events data
                events = data.events;
                 // Get the container for event buttons
                const container = document.getElementById('eventButtonsContainer');
                // Clear any existing content in the container
                container.innerHTML = '';

                // Iterate through each event and create corresponding buttons
                events.forEach(event => {
                    const button = document.createElement('button');
                    button.innerHTML = event.title;
                    button.classList.add('event-button');
                    button.onclick = function () {
                        editEvent(button, event.title, event.location, event.date, event.description);
                    };

                    // Create a delete button for the event
                    const deleteButton = document.createElement('button');
                    deleteButton.innerHTML = 'Delete';
                    deleteButton.classList.add('delete-button');
                    deleteButton.onclick = function () {
                        deleteEvent(event.id);
                    };
                    // Create a container for the event buttons
                    const eventContainer = document.createElement('div');
                    eventContainer.appendChild(button);
                    eventContainer.appendChild(deleteButton);
                    container.appendChild(eventContainer);
                });
            } else {
                // Alert the user
                alert('Failed to load events');
            }
        })
        .catch(err => console.error('Error:', err));
}

function deleteEvent(id) {
    // Send a POST request to the '/deleteEvent'
    fetch('/deleteEvent', {
        // Specify the request method, request headers, and converting ID to JSON
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
        // Parse the response as JSON
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success message and refresh list of events
                alert(data.message);
                fetchEvents();
            } else {
                alert('Failed to delete event');
            }
        })
        .catch(err => console.error('Error:', err));
}

function updateEventButton(button, title, location, date, description) {
    // Check if the button element is provided and exit if not provided
    if (!button) {
        console.error("No button to update");
        return;
    }

    // Update the button's inner HTML to display the new title
    button.innerHTML = title;

    // Setting the button's onclick event to call the editEvent function
    button.onclick = function () {
        editEvent(button, title, location, date, description);
    };

    // Retrieve the event ID
    const eventId = button.getAttribute('data-event-id');
    fetch('/updateEvent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: eventId, title, location, date, description })
    })
        .then(response => response.json())
        .then(data => {
            // Check if successful if it is show message and fetch events list
            if (data.success) {
                alert(data.message);
                fetchEvents();
            } else {
                alert('Failed to update event');
            }
        })
        .catch(err => console.error('Error:', err));
}

function editEvent(button, title, location, date, description) {
    // Set the value of the input fields for the title and other sutff
    document.getElementById('eventTitle').value = title;
    document.getElementById('eventLocation').value = location;
    document.getElementById('eventDate').value = date;
    document.getElementById('eventDescription').value = description;
    currentEventButton = button;
    showEventModal(true);
}

function postPublicUpdate() {
    // Get content of public update
    const updateContent = document.getElementById('publicUpdateContent').value;
    // Check if its empty or has only whitepsaces
    if (updateContent.trim() === '') {
        alert('Public update content cannot be empty.');
        return;
    }

    // Sending Post request
    fetch('/postPublicUpdate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // Encode the content as URL-encoded form data
        body: new URLSearchParams({ content: updateContent })
    })
        .then(response => response.json())
        .then(data => {
            // If sucessfull show success message, clear input field and display updated content
            if (data.success) {
                alert(data.message);
                document.getElementById('publicUpdateContent').value = '';
                showContent('view');
            } else {
                alert('Failed to post public update');
            }
        })
        // Log errors to console
        .catch(err => console.error('Error:', err));
}

// Same function as public update, but for private updates
function postPrivateUpdate() {
   // Getting content of private update and checking for blank or whitespaces
    const updateContent = document.getElementById('privateUpdateContent').value;
    if (updateContent.trim() === '') {
        alert('Private update content cannot be empty.');
        return;
    }

    // Sending post request
    fetch('/postPrivateUpdate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ content: updateContent })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // If successful, clear then display the updated content
                alert(data.message);
                document.getElementById('privateUpdateContent').value = '';
                showContent('view');
            } else {
                alert('Failed to post private update');
            }
        })
        .catch(err => console.error('Error:', err));
}

function deleteUpdate(id, type) {
    // Determinunge the URL based on the type of update ('public' or 'private')
    const url = type === 'public' ? '/deletePublicUpdate' : '/deletePrivateUpdate';

    // Sending a POST request to the appropriate endpoint with the update ID
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ id })
    })
    .then(response => response.json())
    .then(data => {
        // Check if the deletion was successful, and refreshing content view
        if (data.success) {
            alert(data.message);
            showContent('view');
        } else {
            alert(`Failed to delete ${type} update`);
        }
    })
    .catch(err => console.error('Error:', err));
}


function deleteUser(email) {
    // Send a POST request to the '/deleteUser' endpoint with the user's email
    fetch('/deleteUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email })
    })
    .then(response => response.json())
    .then(data => {
        // Check if the deletion was successful, then showing message and refereshing list of users if successfull
        if (data.success) {
            alert(data.message);
            showContent('admin-users');
        } else {
            alert('Failed to delete user');
        }
    })
    .catch(err => console.error('Error:', err));
}


function populateUserInfo() {
    // Populating in local storage user information
    const name = localStorage.getItem('name') || '';
    const userType = localStorage.getItem('userType') || '';
    const email = localStorage.getItem('email') || '';
    const phone = localStorage.getItem('phone') || '';
    const password = localStorage.getItem('password') || '';

    // Setting user information by the provided information
    document.getElementById('name').value = name;
    document.getElementById('user-type').value = userType;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
    document.getElementById('password').value = password;
}

window.onload = function () {
    // Retrieve login status and user type from local storage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userType = localStorage.getItem('userType');


   // Check if the user is logged in
    if (isLoggedIn) {
        // Define sidebar content based on user type
        if (userType === 'user') {
            // Sidebar for users
            document.querySelector('.sidebar').innerHTML = `
                    <a href="#" onclick="showContent('manage')">Manage User Info</a>
                    <a href="#" onclick="showContent('view')">View Updates</a>
                    <a href="#" onclick="showJoinContent()">Events Joined</a>
                `;
        } else if (userType === 'manager') {
            // Sidebar for managers
            document.querySelector('.sidebar').innerHTML = `
                    <a href="#" onclick="showContent('manage')">Manage User Info</a>
                    <a href="#" onclick="showContent('view members')">View Members</a>
                    <a href="#" onclick="showContent('view')">View Updates</a>
                    <a href="#" onclick="showJoinContent()">Events Joined</a>
                    <a href="#" onclick="showContent('create-update')">Manage Events</a>
                    <a href="#" onclick="showContent('event')">Manage Updates</a>
                `;
        } else if (userType === 'admin') {
            // Sidebar for admin
            document.querySelector('.sidebar').innerHTML = `
                    <a href="#" onclick="showContent('manage')">Manage User Info</a>
                    <a href="#" onclick="showContent('view members')">View Members</a>
                    <a href="#" onclick="showContent('view')">View Updates</a>
                    <a href="#" onclick="showJoinContent()">Events Joined</a>
                    <a href="#" onclick="showContent('create-update')">Manage Events</a>
                    <a href="#" onclick="showContent('event')">Manage Updates</a>
                    <a href="#" onclick="showContent('admin-users')">Manage Users</a>
                    <a href="#" onclick="showContent('branch')">Manage Branches</a>
                `;
        }
        // Show the default content when the page loads
        showContent('manage');
    }
};

