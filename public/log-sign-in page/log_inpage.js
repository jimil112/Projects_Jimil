// Event listener for the 'Sign Up' button toggle
document.getElementById('toggle-signup-btn').addEventListener('click', function () {
    // Hides the login container
    document.getElementById('login-container').style.display = 'none';
    // Shows the signup container
    document.getElementById('signup-container').style.display = 'block';
});

// Event listener for the 'Back to Login' button toggle
document.getElementById('toggle-login-btn').addEventListener('click', function () {
    // Shows the login container
    document.getElementById('login-container').style.display = 'block';
    // Hides the signup container
    document.getElementById('signup-container').style.display = 'none';
});

// Event listener for the login form submission
document.getElementById('login-form').addEventListener('submit', function (e) {
    // Prevents form from submitting normally
    e.preventDefault();
    // Gets email and password from the form inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sends a POST request to the server with email and password
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        const loginMessage = document.getElementById('login-message');
        if (data.success) {
            // Stores user information in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('name', data.user.full_name);
            localStorage.setItem('userType', data.user.user_type);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('phone', data.user.phone_number);
            localStorage.setItem('password', data.user.password);
            // Displays success message and redirects after 2 seconds
            loginMessage.textContent = data.message;
            loginMessage.style.color = 'green';
            setTimeout(() => {
                window.location.href = '../Profile_Page/profile_page.html';
            }, 2000);
        } else {
            // Displays error message
            loginMessage.textContent = data.message;
            loginMessage.style.color = 'red';
        }
    })
    .catch(err => console.error('Error:', err));
});

// Event listener for the signup form submission
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const userType = document.getElementById('signup-user-type').value;
    const fullName = document.getElementById('full-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Sends a POST request to the server with the new user data
    fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            user_type: userType,
            full_name: fullName,
            phone_number: phoneNumber,
            signup_email: email,
            signup_password: password
        })
    })
    .then(response => response.text())
    .then(message => {
        // Displays the server response message
        const signupMessage = document.getElementById('signup-message');
        signupMessage.textContent = message;
        signupMessage.style.color = 'green';
    })
    .catch(err => console.error('Error:', err));
});

