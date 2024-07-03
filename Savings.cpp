#include "Savings.h" 
#include <iostream>  
#include <string>

using namespace std;  

//-----------------------------------------------------------------

// Default constructor: Initializes the 'Goal' member variable with a default value
Savings::Savings() {
    Goal = "NULL";  
}

//-----------------------------------------------------------------

// Parameterized constructor
Savings::Savings(int Bal, string Type, string goal) : Account(Bal, Type) {
    Goal = goal;  
}

//-----------------------------------------------------------------

// ChangeGoal: Updates the savings goal with provided new goal
void Savings::ChangeGoal(string newGoal) {
    Goal = newGoal;  
}

//-----------------------------------------------------------------

// getGoal: Retrieves the current savings goal
string Savings::getGoal() {
    return Goal;  // Return the goal
}

//-----------------------------------------------------------------

// Destructor
Savings::~Savings() {
    // No dynamic memory allocation was used, so destructor remains empty
}

//-----------------------------------------------------------------
