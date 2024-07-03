#include "Account.h"
#include <iostream>
#include <string>

using namespace std;

//-----------------------------------------------------------------

// Default constructor initializes member variables to default values
Account::Account() {
    Bal = 0;  
    Type = "NULL";  
}

//-----------------------------------------------------------------

// Parameterized constructor initializes member variables with provided arguments
Account::Account(int Balance, string AccType) {
    Bal = Balance;  
    Type = AccType;  
}

//-----------------------------------------------------------------

// setBalance: Updates the account balance with provided value
void Account::setBalance(int A) {
    Bal = A;  
}

//-----------------------------------------------------------------

// setAccType: Updates the account type with provided value
void Account::setAccType(string B) {
    Type = B;  
}

//-----------------------------------------------------------------

// getBalance: Retrieves the current account balance
int Account::getBalance() {
    return Bal;  
}

//-----------------------------------------------------------------

// getAccType: Retrieves the current account type
string Account::getAccType() {
    return Type;  
}

//-----------------------------------------------------------------

// Destructor: Cleans up resources when object is deleted (nothing to clean up here)
Account::~Account() {
}

//-----------------------------------------------------------------