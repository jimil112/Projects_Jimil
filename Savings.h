#ifndef SAVINGS_H  
#define SAVINGS_H

#include "Account.h"  
#include <iostream>  
#include <string>

using namespace std;  

// Define the Savings class, which inherits publicly from Account class
class Savings : public Account {
private:
    // No private members declared

public:
    // Public member variable 
    string Goal;  
    
    // Default constructor: Initializes member variables with default values
    Savings();
    
    // Parameterized constructor: Initializes member variables with provided values
    Savings(int Bal, string Type, string goal);  

    // ChangeGoal: Updates the savings goal to a new value
    void ChangeGoal(string newGoal);  
    
    // getGoal: Retrieves the current savings goal
    string getGoal();  
    
    // Destructor: Handles cleanup when an object is deleted
    ~Savings();
};

#endif 
