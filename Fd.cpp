#include "Fd.h"  
#include <iostream>  
#include <string>

using namespace std;  

//-----------------------------------------------------------------

// Default constructor: Initializes the 'term' member variable with a default value
Fd::Fd() {
    term = 0;  // Set initial term to 0
}

//-----------------------------------------------------------------

// Parameterized constructor
Fd::Fd(int Bal, string Type, int termm) : Account(Bal, Type) {
    term = termm;  // Set initial term to provided value
}

//-----------------------------------------------------------------

// getTerm: Retrieves the current term
int Fd::getTerm() {
    return term;  // Return the term
}

//-----------------------------------------------------------------

// setTerm: Sets the term to the provided value
void Fd::setTerm(int Term) {
    term = Term;  // Update the term
}

//-----------------------------------------------------------------

// Destructor: Handles cleanup when an Fd object is deleted (nothing specific to clean up here)
Fd::~Fd() {
    // No dynamic memory allocation was used, so destructor remains empty
}

//-----------------------------------------------------------------