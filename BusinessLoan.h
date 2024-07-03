#ifndef BUSINESSLOAN_H 
#define BUSINESSLOAN_H


#include "Loan.h"
#include <string>

class BusinessLoan : public Loan {
protected:
    int loanYears;
    std::string loanType; // Can be "vehicle" or "shop"

public:
    BusinessLoan();
    void askForLoanDuration();
    void askForLoanType();
    void displayLoanDetails();
};

#endif
