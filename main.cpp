#include <iostream>
#include <limits>  
#include <string.h>
#include "AccountManager.h"
#include "Account.h"
#include "Savings.h"
#include "Fd.h"
#include "User.h"
#include "ConcreteUser.h"
#include "BusinessLoanCalculator.h"  // Including the new header
using namespace std;

//-----------------------------------------------------------------

void start_program_Account(){

    int Cash;

    cout << endl;

    cout << "How much cash do you currently have: ";
    while(true)
    {
        if(cin >> Cash && Cash >= 0)
        {
            break;
        }
        cout << endl;
        cin.clear();
        cin.ignore(120,'\n');
        cout << "Please enter in a valid cash amount: ";
    }
    cout << endl;

    AccountManager User(Cash);

    Savings Savings(0,"Savings","Personal Goal");
    Fd FixedDeposit(100, "FixedDeposit",5);

    User.AddSavAccount(Savings);
    User.AddFdAccount(FixedDeposit);

    User.choice();
}

//-----------------------------------------------------------------

void start_program_BusinessLoan() {
    BusinessLoanCalculator calculator;

    // Collect loan details
    calculator.askForLoanAmount();
    calculator.askForLoanDuration();
    calculator.askForLoanType();

    // Calculate and display
    calculator.calculateInterestRate();
    calculator.calculatePayments();
    calculator.displayLoanDetails();
    calculator.displayPaymentDetails();

    cout << "\nPress any key to continue...\n";
    cin.ignore();  // Clear out newline character for next input
    cin.get();     // Wait for any key
 if (system("CLS")) system("clear");
}

//-----------------------------------------------------------------
void start_program()
{
    if (system("CLS")) system("clear");
    cout << "--------------------------------------"<< endl;
    cout << "WELCOME TO ONLINE NJP BANKING SYSTEM!"<< endl;
    cout << "--------------------------------------"<< endl;
    cout<<endl;

    string entereduser;
    cout<< "Please enter your username: ";
    getline(cin, entereduser);
    if (system("CLS")) system("clear");


//Validates and asks for PIN 
    long enteredpassword;
      while (true) {
        cout << "Please enter your PIN (6-10 digits): ";
        cin >> enteredpassword;

        // Check if the input caused a fail state
        if (cin.fail()) {
            cin.clear();  // Clear the fail state
            cin.ignore(numeric_limits<streamsize>::max(), '\n');  // Ignore invalid input
            cout << "Invalid input. Please enter a numeric PIN." << endl;
        }
        // Additional: Check if the PIN is within the correct range 
        else if(enteredpassword < 100000 || enteredpassword > 9999999999) {
            cout << "Invalid PIN. Must be between 6 digits and 10 digits." << endl;
        }
        else {
            break;  // Exit loop if input is valid
        }
    }
    cout<<endl;
    if (system("CLS")) system("clear");

    ConcreteUser hello(entereduser, enteredpassword);
    hello.greeting();

    cout<<endl;

        while(true)
    {   cout << "___________________________________________________________"<< endl;
        cout << "Press 1 for Accounts\n";
        cout << "___________________________________________________________"<< endl;
        cout << "Press 2 for Business Loan Calculator\n";  // New option added
        cout << "___________________________________________________________"<< endl;
        cout << "Press 3 to exit the program\n";
        cout << "___________________________________________________________"<< endl;
        cout << "\nNumber: ";

        int choice = 0;
        while(true)
        {
            if(cin >> choice && choice >= 1 && choice <= 3)
            {
                break;
            }
            cout << endl;
            cin.clear();
            cin.ignore(120,'\n');
            cout << "Please choose a valid option: ";
        }
        cout << endl;

        switch(choice)
        {
            case 1:
                if (system("CLS")) system("clear");
                start_program_Account();
                break;
            case 2:
                if (system("CLS")) system("clear");
                start_program_BusinessLoan();  // Call the new function when choice is 2
                break;
            case 3:
                if (system("CLS")) system("clear");
                cout << "___________________________________________________________\n"<< endl;
                cout << "Thank you for using our Banking System!\nHope to see you soon!" << endl;
                cout << "___________________________________________________________"<< endl;
                break;
        }
        if(choice == 3)
        {
            break;
        }
    }
}
//-----------------------------------------------------------------

int main()
{
    start_program();

    return 0;
}

//-----------------------------------------------------------------