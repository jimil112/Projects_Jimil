#include "BusinessLoan.h"
#include <iostream>
#include <limits>

BusinessLoan::BusinessLoan() : Loan(), loanYears(0), loanType("") {}

void BusinessLoan::askForLoanDuration() {
    std::cout << "How many years do you want the loan to be? (1-20 years): ";
    std::cin >> loanYears;

    while (std::cin.fail() || loanYears <= 0 || loanYears > 20) {
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        std::cout << "Invalid input. Please enter a duration between 1 and 20 years: ";
        std::cin >> loanYears;
    }
}

void BusinessLoan::askForLoanType() {
    std::cout << "Do you want a vehicle loan or a shop loan? (Enter 'vehicle' or 'shop'): ";
    std::cin >> loanType;

    while (loanType != "vehicle" && loanType != "shop") {
        std::cout << "Invalid input. Please enter 'vehicle' or 'shop': ";
        std::cin >> loanType;
    }
}

void BusinessLoan::displayLoanDetails() {
    std::cout << "Business Loan Amount: $" << loanAmount << std::endl;
    std::cout << "Loan Duration: " << loanYears << " years" << std::endl;
    std::cout << "Loan Type: " << loanType << std::endl;
}
