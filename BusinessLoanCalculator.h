#ifndef BUSINESSLOANCALCULATOR_H 
#define BUSINESSLOANCALCULATOR_H


#include "BusinessLoan.h"

class BusinessLoanCalculator : public BusinessLoan {
private:
    float interestRate; // Interest rate based on the type of loan
    float monthlyPayment; // Calculated monthly payment
    float totalPayment; // Calculated total payment

public:
    BusinessLoanCalculator();
    void calculateInterestRate();
    void calculatePayments();
    void displayPaymentDetails();
};


#endif