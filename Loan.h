#ifndef LOAN_H 
#define LOAN_H

#pragma once

class Loan {
protected:
    float loanAmount; // Accessible to derived classes.
public:
    Loan();
    void askForLoanAmount();
    float getLoanAmount() const;
};

#endif