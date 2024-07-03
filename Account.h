#ifndef ACCOUNT_H 
#define ACCOUNT_H

#include <iostream>  
#include <string>    

using namespace std;  

// Define the Account class
class Account {
public:
    // Public member variables (Note: it's usually recommended to keep member variables private or protected)
    string Type;  
    int Bal;      

    // Default constructor: initializes member variables with default values
    Account();  
    
    // Parameterized constructor: initializes member variables with provided values
    Account(int Balance, string AccType);

    // setBalance: Sets the account balance
    void setBalance(int A);
    
    // setAccType: Sets the account type
    void setAccType(string B);
    
    // getBalance: Returns the current account balance
    int getBalance();
    
    // getAccType: Returns the current account type
    string getAccType();
    
    // Destructor: Handles cleanup when an object is deleted
    ~Account();
};

#endif  
