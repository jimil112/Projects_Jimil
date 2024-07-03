var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mysql = require('mysql');
var session = require('express-session');


var app = express();
var port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to manage sessions
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// MySQL database connection setup
const db = mysql.createConnection({
  host: '127.0.0.1',
  database: 'foodlinkdb'
});

// Connect to the MySQL database and show message is success
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database.');
});

// // Route for the homepage that renders the 'index' view with a title of 'Express'
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//--------------------------------- Email System -------------------------------------

app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  // Create a transporter for sending emails using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'food.link.australia1@gmail.com',
      pass: 'cowl ethl ezbo htnd'
    }
  });

    // Check if the email already exists in the database
  const checkEmailSql = 'SELECT * FROM email_subscriptions WHERE email_address = ?';
  db.query(checkEmailSql, [email], (err, result) => {
    if (err) {
      return res.status(500).send('Error checking email in database');
    }

    // If email already exists, send thank you email again
    if (result.length > 0) {
      const mailOptions = {
        from: 'food.link.australia1@gmail.com',
        to: email,
        subject: 'Thank You Again for Your Interest!',
        text: 'Dear Subscriber,\n\nThank you once again for expressing your interest in making a difference with Food Link. We truly appreciate your continued support and enthusiasm for our cause. Stay tuned for more updates on our latest events, volunteer opportunities, and ways you can contribute.\n\nBest Regards,\nThe Food Link Team'
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send('Error sending thank you again email');
        } else {
          return res.send('Email already exists. Re-subscription successful.');
        }
      });
    } else {
      // If email does not exist, send welcome email
      const mailOptions = {
        from: 'food.link.australia1@gmail.com',
        to: email,
        subject: 'Welcome to Food Link!',
        text: 'Dear Subscriber,\n\nThank you for subscribing to Food Link! We are thrilled to have you as part of our community. Stay tuned for updates on our latest events, volunteer opportunities, and ways you can make a difference.\n\nBest Regards,\nThe Food Link Team'
      };

      // Storing email into database if succesfull, or responding with errors if not
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send('Error sending email');
        } else {
          const sql = `INSERT INTO email_subscriptions (email_address) VALUES (?)`;
          db.query(sql, [email], (err, result) => {
            if (err) {
              return res.status(500).send('Error storing email in database');
            }
            res.send('Email sent successfully');
          });
        }
      });
    }
  });
});

//--------------------------------- Sign Up System -------------------------------------

app.post('/signup', (req, res) => {
  // Destructuring user details from the request body
  const { user_type, full_name, phone_number, signup_email, signup_password } = req.body;

  // SQL query to check if a user with the provided email or phone number already exists
  const checkUserExistsSql = 'SELECT * FROM UserInfo WHERE email = ? OR phone_number = ?';
  db.query(checkUserExistsSql, [signup_email, phone_number], (err, result) => {
    if (err) {
      return res.status(500).send('Error checking existing users');
    }

    // If email already is in use, send this message
    if (result.length > 0) {
      return res.send('This email address or phone number is already in use.');
    }

    // SQL query to insert new user details into the UserInfo table
    const sql = `INSERT INTO UserInfo (user_type, full_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [user_type, full_name, phone_number, signup_email, signup_password], (err, result) => {
      if (err) {
        return res.status(500).send('Error signing up user');
      }
      res.send('You have successfully signed up. Now, please log in.');
    });
  });
});

//--------------------------------- Admin Sign Up System -------------------------------------

app.post('/admin-signup', (req, res) => {
  // Destructuring the request body to extract necessary fields
  const { user_type, full_name, phone_number, email, password } = req.body;

  // SQL query to check if a user with the same email or phone number already exists
  const checkUserExistsSql = 'SELECT * FROM UserInfo WHERE email = ? OR phone_number = ?';

  // Executeing the query to check for existing users
  db.query(checkUserExistsSql, [email, phone_number], (err, result) => {
    if (err) {
      return res.status(500).send('Error checking existing users');
    }

    // Send a response indicating the email or phone number is already in use if it already is being used
    if (result.length > 0) {
      return res.json({ success: false, message: 'This email address or phone number is already in use.' });
    }

    // SQL query to insert a new user into the UserInfo table
    const sql = `INSERT INTO UserInfo (user_type, full_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)`;

    // Execute Query
    db.query(sql, [user_type, full_name, phone_number, email, password], (err, result) => {
      if (err) {
        return res.status(500).send('Error signing up user');
      }
      res.json({ success: true, message: 'User successfully signed up.' });
    });
  });
});

//--------------------------------- Login System -------------------------------------

app.post('/login', (req, res) => {
  // Destructuring to extract needed fields
  const { email, password } = req.body;

  // SQL query to select a user with the given email and password
  const sql = 'SELECT * FROM UserInfo WHERE email = ? AND password = ?';

  // Execute Query
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).send('Error logging in');
    }

    if (result.length === 1) {
      // If 1 matching user is found, enter the user data in the session
      const user = result[0];
      req.session.user = user;
      // Send success message
      res.json({ success: true, message: 'You have successfully logged in.', user });
    } else {
      // Send incorrect messasge
      res.json({ success: false, message: 'Incorrect email or password.' });
    }
  });
});

//--------------------------------- Logout System -------------------------------------

app.post('/logout', (req, res) => {
  // Destroy the current session to log the user out
  req.session.destroy((err) => {
    if (err) {
      // Send a message indicating an error occurred during logout
      return res.json({ success: false, message: 'Error logging out.' });
    }
    // Sending a success message indicating the user has been logged out
    res.json({ success: true, message: 'You have successfully logged out.' });
  });
});


//--------------------------------- Public Updates System -------------------------------------

app.post('/postPublicUpdate', (req, res) => {
  const { content } = req.body;

  // SQL query to insert a new public update
  const sql = 'INSERT INTO PublicUpdates (content) VALUES (?)';
  db.query(sql, [content], (err, result) => {
    if (err) {
      return res.status(500).send('Error posting public update');
    }
    // Send a success response indicating the update was posted
    res.json({ success: true, message: 'Public update posted successfully' });
  });
});


app.get('/getPublicUpdates', (req, res) => {
  // SQL query to select all public updates
  const sql = 'SELECT * FROM PublicUpdates';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching public updates');
    }
    // Send a success response with the list of updates
    res.json({ success: true, updates: results });
  });
});

app.post('/deletePublicUpdate', (req, res) => {
  const { id } = req.body;
  // SQL query to delete a public update by id
  const sql = 'DELETE FROM PublicUpdates WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting public update');
    }
    // Send a success response indicating the update was deleted
    res.json({ success: true, message: 'Public update deleted successfully' });
  });
});

//--------------------------------- Private Updates System -------------------------------------

app.post('/postPrivateUpdate', (req, res) => {
  const { content } = req.body;

  // SQL query to insert a new private update
  const sql = 'INSERT INTO PrivateUpdates (content) VALUES (?)';
  db.query(sql, [content], (err, result) => {
    if (err) {
      return res.status(500).send('Error posting private update');
    }
    // Send a success response indicating the update was posted
    res.json({ success: true, message: 'Private update posted successfully' });
  });
});

app.get('/getPrivateUpdates', (req, res) => {
  // SQL query to select all private updates
  const sql = 'SELECT * FROM PrivateUpdates';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching private updates');
    }
    // Send a success response with the list of updates
    res.json({ success: true, updates: results });
  });
});

// Route to delete a private update
app.post('/deletePrivateUpdate', (req, res) => {
  const { id } = req.body;

  // SQL query to delete a private update by id
  const sql = 'DELETE FROM PrivateUpdates WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting private update');
    }
    // Send a success response indicating the update was deleted
    res.json({ success: true, message: 'Private update deleted successfully' });
  });
});

//--------------------------------- Events System -------------------------------------

app.post('/addEvent', (req, res) => {
  const { title, location, date, description } = req.body;

  // SQL query to insert a new event
  const sql = 'INSERT INTO Events (title, location, date, description) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, location, date, description], (err, result) => {
    if (err) {
      return res.status(500).send('Error adding event');
    }
    // Send a success response indicating the event was added
    res.json({ success: true, message: 'Event added successfully' });
  });
});


app.get('/getEvents', (req, res) => {
  // SQL query to select all events
  const sql = 'SELECT * FROM Events';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching events');
    }
    // Send a success response with the list of events
    res.json({ success: true, events: results });
  });
});


app.post('/updateEvent', (req, res) => {
  const { id, title, location, date, description } = req.body;

  // SQL query to update an event by id
  const sql = 'UPDATE Events SET title = ?, location = ?, date = ?, description = ? WHERE id = ?';
  db.query(sql, [title, location, date, description, id], (err, result) => {
    if (err) {
      return res.status(500).send('Error updating event');
    }
    // Send a success response indicating the event was updated
    res.json({ success: true, message: 'Event updated successfully' });
  });
});


app.post('/deleteEvent', (req, res) => {
  const { id } = req.body;
  // SQL query to delete an event by id
  const sql = 'DELETE FROM Events WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting event');
    }
    // Send a success response indicating the event was deleted
    res.json({ success: true, message: 'Event deleted successfully' });
  });
});


//--------------------------------- Users Data System -------------------------------------

app.get('/getUsers', (req, res) => {
  // SQL query to select specific user information
  const sql = 'SELECT user_type, full_name, phone_number, email FROM UserInfo';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching user data');
    }
    // Send a success response with the list of users
    res.json({ success: true, users: results });
  });
});

//--------------------------------- Delete User System -------------------------------------

app.post('/deleteUser', (req, res) => {
  const { email } = req.body;

  // SQL query to delete a user by email
  const sql = 'DELETE FROM UserInfo WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting user');
    }
    // Send a success response indicating the user was deleted
    res.json({ success: true, message: 'User deleted successfully' });
  });
});

//-----------------------------------------Google Stuff------------------------------------
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Serializing and Deserializing user into the sessions
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  db.query('SELECT * FROM UserInfo WHERE id = ?', [id], (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results[0]);
  });
});

// Configureing the Google strategy for use by Passport
passport.use(new GoogleStrategy({
  clientID: '54671936469-i6pqqtb6q39b44486a67l1juvi9c0648.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "http://localhost:3000/auth/google/callback"
},
  function (token, tokenSecret, profile, done) {
     // Extracting the email from the profile
    const email = profile.emails[0].value;

    // Checking if the user already exists in the foodlinkdb database
    db.query('SELECT * FROM UserInfo WHERE email = ?', [email], (err, results) => {
      if (err) {
        return done(err);
      }

      // If the user exists, return the user
      if (results.length > 0) {
        return done(null, results[0]);
      } else {
        // If user does not exist, create a new user
        const newUser = {
          user_type: 'user',
          full_name: profile.displayName,
          email: email,
          password: '',
          phone_number: 'N/A'
        };

        // Insert the new user into the database
        db.query('INSERT INTO UserInfo SET ?', newUser, (err, results) => {
          if (err) {
            return done(err);
          }
          // Assigning the new user's ID to the user object
          newUser.id = results.insertId;
          return done(null, newUser);
        });
      }
    });
  }
));

// Initialise Passport and restoreing authentication state
app.use(passport.initialize());
app.use(passport.session());

// Defineing the route for Google authentication
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Defineing the callback route after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Redirect to Profile Page Upon Successfull login
    res.redirect('/Profile_Page/profile_page.html');
  }
);

//------------------------event-signup-------------------------

app.post('/signupForEvent', (req, res) => {
  // Destructurting email and eventTitle from the request body
  const { email, eventTitle } = req.body;

  // Checking if email and eventTitle are provided
  if (!email || !eventTitle) {
    return res.status(400).json({ success: false, message: 'Email and event title are required' });
  }

  // SQL query to insert the signup details into the JoinedEventSignUp table
  const query = 'INSERT INTO JoinedEventSignUp (email, event_title) VALUES (?, ?)';
  db.query(query, [email, eventTitle], (error, results) => {
    if (error) {
      console.error('Error inserting into JoinedEventSignUp:', error);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    // Setting up email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'food.link.australia1@gmail.com',
        pass: 'cowl ethl ezbo htnd'
      }
    });

    // Defineung email options and what it will say when sent
    const mailOptions = {
      from: 'food.link.australia1@gmail.com',
      to: email,
      subject: 'Sign Up Successful!',
      text: `Sign Up Successful! See you at the ${eventTitle} event!`
    };

    // Sending the email notification
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Email sending failed' });
      } else {
        // Send a success response if the email is sent successfully
        res.json({ success: true, message: 'Successfully signed up for the event and email sent!' });
      }
    });
  });
});


// Start the server on the specific port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Export router to be used elseware on app
module.exports = router;
