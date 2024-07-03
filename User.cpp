#include <iostream>
#include "User.h"  
#include <string>
using namespace std;

//-----------------------------------------------------------------

// Default constructor: initializes the member variables with empty strings
User::User() {
    entereduser = " ";
    long enteredpassword;
}

//-----------------------------------------------------------------

// Parameterized constructor
User::User(string username, long password) {
    entereduser = username;  // Assign the provided username
    enteredpassword = password;  // Assign the provided password

    // Check if the password is correct using the isCorrect method
    bool status = isCorrect(enteredpassword);

    // Keep prompting for password until a valid one is entered
    while (!status) {
        cout << "Please enter your password again: ";
        cin >> enteredpassword;  // Get the new password
        status = isCorrect(enteredpassword);  // Check if it's valid
        cout << endl;
    } 
}
 
//-----------------------------------------------------------------

// setusername: Sets the user name of the User object
void User::setusername(string username) {
    entereduser = username; 
}

//-----------------------------------------------------------------

// setpassword: Sets the password of the User object
void User::setpassword(long password) {
    enteredpassword = password;  
}

//-----------------------------------------------------------------

// isCorrect: Checks if the password is within the valid length bounds
bool User::isCorrect(long password) {
    long min = 100000;  // Define the minimum acceptable password length
    long max = 9999999999;  // Define the maximum acceptable password length
   // Check if the password is too short or too long
    if (password < min || password > max) {
        cout << "Invalid Password. Must be between " << min << " and " << max << "." << endl;
        return false;
    } 

    // If the password is of valid length
    return true;
} 

//-----------------------------------------------------------------

// getusername: Returns the user name of the User object
string User::getusername() const {
    return entereduser;  // Return the user name
}

//-----------------------------------------------------------------

// getpassword: Returns the password of the User object
long User::getpassword() {
    return enteredpassword;  // Return the password
}

//-----------------------------------------------------------------

// Destructor: Deallocates memory and performs cleanup
User::~User() {
} 

//-----------------------------------------------------------------