#include "BusinessLoanCalculator.h"
#include <iostream>
#include <iomanip> 

BusinessLoanCalculator::BusinessLoanCalculator() : BusinessLoan(), interestRate(0.0f), monthlyPayment(0.0f), totalPayment(0.0f) {}

void BusinessLoanCalculator::calculateInterestRate() {
    if (loanType == "vehicle") {
        interestRate = 5.0f; // 5% interest for vehicle loans
    } else if (loanType == "shop") {
        interestRate = 2.5f; // 2.5% interest for shop loans
    }
}

void BusinessLoanCalculator::calculatePayments() {
    float totalInterest = (loanAmount * interestRate / 100) * loanYears;
    totalPayment = loanAmount + totalInterest;
    monthlyPayment = totalPayment / (loanYears * 12); // Assuming 12 months in a year
}

void BusinessLoanCalculator::displayPaymentDetails() {
    std::cout << std::fixed;  // Use fixed-point notation
    std::cout << "\nLoan Details:\n";
    std::cout << "-----------------------------------------\n";
    std::cout << "Type of Loan: " << loanType << std::endl;
    std::cout << "Duration of Loan: " << loanYears << " years" << std::endl;
    std::cout << "Interest Rate: " << std::setprecision(2) << interestRate << "%\n";
    std::cout << "Total Payment Amount: $" << std::setprecision(2) << totalPayment << std::endl;
    std::cout << "Monthly Payment Amount: $" << std::setprecision(2) << monthlyPayment << std::endl;
}

