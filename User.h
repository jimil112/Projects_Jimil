#ifndef USER_H  
#define USER_H

#include <iostream>  
#include <string>    

using namespace std;  

// Define the User class
class User {
private:
    // Private member variables to store user and password information
    string entereduser;
    long enteredpassword;

public:
    // Constructors and Destructor
    User();  // Default constructor
    User(string username, long password);  // Parameterized constructor
    virtual ~User();  // Virtual destructor
    
    virtual void greeting() const = 0;  // Pure virtual function to print a greeting

    // Member function to check if the entered password is correct
    bool isCorrect(long password);

    // Function to set the username
    void setusername(string username);

    // Function to retrieve the username
    string getusername() const;

    // Function to set the password
    void setpassword(long password);

    // Function to retrieve the password
    long getpassword();
};

#endif  
