#ifndef FD_H  
#define FD_H

#include "Account.h" 
#include <iostream>  
#include <string>

using namespace std;  

// Define the Fd class, which inherits publicly from Account class
class Fd : public Account {
private:
    // Private member variables (note: always consider keeping member variables private or protected)

public:
    int term;  // Public member variable to store the term (note: consider making this private)

    // Constructors and Destructor
    
    // Default constructor: initializes member variables with default values
    Fd();  
    
    // Parameterized constructor: initializes member variables with provided values
    Fd(int Bal, string Type, int termm);  

    // Member function prototypes
    
    // getTerm: Retrieves the current term
    int getTerm();  
    
    // setTerm: Sets the term
    void setTerm(int Term);
    
    // Destructor: Handles cleanup when an object is deleted
    ~Fd();  
};

#endif  // End of include guard
