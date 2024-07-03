#include "Loan.h"
#include <iostream>
#include <limits>

Loan::Loan() : loanAmount(0.0f) {}

void Loan::askForLoanAmount() {
    std::cout << "| Welcome To The Business Loan Calculator |\n";
    std::cout << "-------------------------------------------\n\n";
    std::cout << "How large do you want your loan to be? (Between $1000 and $500,000): ";
    std::cin >> loanAmount;

    while (std::cin.fail() || loanAmount < 1000.0f || loanAmount > 500000.0f) {
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        std::cout << "Invalid input. Please enter a loan amount between $1000 and $500,000: ";
        std::cin >> loanAmount;
    }
}

float Loan::getLoanAmount() const {
    return loanAmount;
}
