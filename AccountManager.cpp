#include "AccountManager.h"
#include <iostream>
#include <string>
using namespace std;

//-----------------------------------------------------------------

AccountManager::AccountManager(int csh){
    // Initializing the number of accounts and current cash with provided value
    AmntAccounts = 0;
    CurrentCash = csh;

    // Allocating memory for accounts and initializing indices
    accounts = new Account[5];  // Allocate space for 5 Account objects
    index = 0;  // Initialize account index
    
    sav = new Savings[5];  // Allocate space for 5 Savings objects
    savindex = 0;  // Initialize savings account index
    
    fixed = new Fd[5];  // Allocate space for 5 Fd objects
    fixindex = 0;  // Initialize fixed deposit account index
    
    // Initializing deposit variables
    Deposit = 0;
    DepositAcc = "NULL";
    TotalSavingsDeposit = 0;
    TotalFDDeposit = 0;

    // Initializing withdraw variables
    Withdraw = 0;
    WithdrawAcc = "NULL";
    TotalSavingsWithdraw = 0;
    TotalFDWithdraw = 0;

    // Initializing transfer variables
    Transferamnt = 0;
    fromAcc = "NULL";
    toAcc = "NULL";
    indexfrom = 0;
    indexto = 0;

    // Initializing goal and term for fixed deposit
    Goal = "NULL";
    Term = 0;

    // Initializing transaction count (possibly, based on variable name)
    T = 0;
}

//-----------------------------------------------------------------

//Setting the current value of Cash to the provided one when code runs
void AccountManager::setCash(int Cs){
    CurrentCash = Cs;
}

//-----------------------------------------------------------------

//Return the Current Cash value
int AccountManager::getCash(){
    return CurrentCash;
}

//-----------------------------------------------------------------

void AccountManager::AddSavAccount(Savings AA){
    //Add to new savings account as AA and update indexes and counters
    accounts[index]= AA;
    sav[savindex]= AA;
    AmntAccounts++;
    index++;
    savindex++;
    //Setting total deposit to 0
    TotalSavingsDeposit = sav[0].getBalance();
}

//-----------------------------------------------------------------

void AccountManager::AddFdAccount(Fd BB){
    //Add to new fixed deposit account as AA and update indexes and counters
    accounts[index] =BB;
    fixed[fixindex] = BB;
    AmntAccounts++;
    index++;
    fixindex++; 
    TotalFDDeposit = fixed[0].getBalance();
}

//-----------------------------------------------------------------

bool AccountManager::EnoughDepositCash(int number){
    // Check if the number of current cash is more then or equal to 0.
    if ((getCash()-number)>=0){
        return true;
    }
    // Print message is there is not enough cash available
    cout << "Not enough cash availaible"<<endl;
    return false;
}

//-----------------------------------------------------------------

void AccountManager::deposit(Account *array){
  // Display current cash and prompt for deposit amount
    cout << "Current cash: " << getCash() << "\nHow much would you like to deposit?: ";

    // Validate deposit input and ensure enough cash is available
    while(true){
        if((cin >> Deposit && Deposit >= 0) && EnoughDepositCash(Deposit) == 1)
            break;
        cout << "\nPlease try again.\nCurrent cash: " << getCash() << "\nHow much cash do you want to deposit?: ";
        cin.clear();
        cin.ignore(120,'\n');
    }
    
    // Display available accounts for deposit
    for (int i=0; i < AmntAccounts; i++)
    {
        cout << (i+1) << ". " << array[i].getAccType();
         // Update Savings account balance
        if (array[i].getAccType() == "Savings"){
            T = TotalSavingsDeposit - TotalSavingsWithdraw;
            array[i].setBalance(T);
        }
        else if(array[i].getAccType()=="FixedDeposit"){
             // Update Fixed Deposit account balance
            T= TotalFDDeposit - TotalFDWithdraw;
            array[i].setBalance(T);
        }
        // Display current account balance
        cout << ", Current Balance: " << array[i].getBalance() << endl;
    } 

    //Prompt Account Selection
    cout << "Which account would you like to deposit cash into?: ";
    int choice =0;

    // Ensure valid account choice input
    while(true){
        if(cin >> choice && choice >= 1 && choice <=2)
        {
        break;
        }
        // Handle invalid input
        cout << endl;
        cin.clear(); // Clear input buffer 
        cin.ignore(120,'\n'); // Ignore erroneoous inputs 
        cout << "Please try again, enter either 1 or 2: ";
}
cout << endl;

 // Process deposit based on selected account type
    string selectedType = array[choice-1].getAccType();
    if (selectedType == "Savings"){
        TotalSavingsDeposit += Deposit;
    } else if (selectedType == "FixedDeposit"){
        TotalFDDeposit += Deposit;
    }
    depositCash(Deposit, array[choice-1]);
}

//-----------------------------------------------------------------

void AccountManager::depositCash(int cashamnt, Account XO)
{
    string accType = XO.getAccType();

    // Calculate 'T' based on account type
    T = (accType == "Savings") ? (TotalSavingsDeposit - TotalSavingsWithdraw) : 
        (accType == "FixedDeposit") ? (TotalFDDeposit - TotalFDWithdraw) : T;

    XO.setBalance(T);

    // Display deposit success and new balance
    cout << "Cash deposited in " << accType << " successfully.\n"
         << "Current balance of " << accType << " account is: " << XO.getBalance() << endl;

    // Update total cash and display new total cash amount
    setCash(getCash() - cashamnt);
    cout << "Current cash: " << getCash() << endl;
}

//-----------------------------------------------------------------

void AccountManager::withdraw(Account *array){
    // Lambda to display the list of accounts and their balances.
    auto displayAccounts = [&]()
    {
        for(int i = 0; i < AmntAccounts; i++)
        {
            cout << (i+1) << ". " << array[i].getAccType();

            // Update balance based on account type.
            if(array[i].getAccType() == "Savings")
                T = TotalSavingsDeposit - TotalSavingsWithdraw;
            else if(array[i].getAccType() == "FixedDeposit")
                T = TotalFDDeposit - TotalFDWithdraw;

            array[i].setBalance(T);
            cout << ", Current Balance: " << array[i].getBalance() << endl;
        }
    };

    // Lambda to get and validate the user's choice of account.
    auto getChoice = [&]()
    {
        int choice = 0;
        while(true)
        {
            if(cin >> choice && choice >= 1 && choice <= 2)
                return choice;

            cin.clear();  // Clear input errors.
            cin.ignore(120,'\n');  // Ignore invalid inputs.
            cout << "\nPlease try again, enter either 1 or 2: ";
        }
    };

    // Display list of accounts.
    displayAccounts();
    cout << "Which account do you wish to withdraw cash from?: ";
    int choice = getChoice();  // Get user choice for account.

    cout << "\nCurrent cash: " << getCash() << "\nHow much cash do you want to withdraw: ";
    // Validate the amount user wants to withdraw.
    while(!(cin >> Withdraw && Withdraw >= 0))
    {
        cin.clear();
        cin.ignore(120,'\n');
        cout << "\nPlease enter a valid withdrawal amount: ";
    }

    // Ensure the user has enough cash to withdraw and chosen account is valid.
    while(EnoughWithdrawCash(Withdraw,array[choice-1]) != 1)
    {
        cout << "\nPlease try again" << endl;
        displayAccounts();  // Redisplay accounts.
        cout << "Which account do you wish to withdraw cash from?: ";
        choice = getChoice();  // Re-get user choice.

        cout << "\nCurrent cash: " << getCash() << "\nHow much cash do you want to withdraw: ";
        while(!(cin >> Withdraw && Withdraw >= 0))
        {
            cin.clear();
            cin.ignore(120,'\n');
            cout << "\nPlease enter a valid withdrawal amount: ";
        }
    }

    // Execute withdrawal based on chosen account.
    if(array[choice-1].getAccType() == "Savings")
    {
        TotalSavingsWithdraw += Withdraw;
        WithdrawCash(Withdraw,array[choice-1]);
    }
    else if(array[choice-1].getAccType() == "FixedDeposit")
    {
        TotalFDWithdraw += Withdraw;
        WithdrawCash(Withdraw,array[choice-1]);
    }
}

//-----------------------------------------------------------------

void AccountManager::WithdrawCash(int ccashamnt, Account XW){
    string accType = XW.getAccType();

    // Calculate 'T' based on account type
    T = (accType == "Savings") ? (TotalSavingsDeposit - TotalSavingsWithdraw) : 
        (accType == "FixedDeposit") ? (TotalFDDeposit - TotalFDWithdraw) : T;

    XW.setBalance(T);

    // Display withdrawal success, new balance, and updated cash amount
    cout << "Cash successfully withdrawn from " << accType << " account.\n"
         << "Current balance of " << accType << " account is: " << XW.getBalance() << endl;

    setCash(getCash() + ccashamnt);
    cout << "Current cash: " << getCash() << endl;
}

//-----------------------------------------------------------------

// Checks if there is enough funds in the account
bool AccountManager::EnoughWithdrawCash(int number, Account XW){
    if((number)>=0){
        return true;
    }
    cout << "Not Enough funds available in account" << endl;
    return false;
}

//-----------------------------------------------------------------

Account* AccountManager::getAccounts(){
        return accounts;
    }

//-----------------------------------------------------------------

void AccountManager::transferselect(Account *array){
    // Lambda function to display account balances
    auto displayAccountBalances = [&]() {
        for (int i = 0; i < AmntAccounts; i++)
        {
            cout << (i+1) << ". " << array[i].getAccType();
            // Update balance based on account type and display it
            if (array[i].getAccType() == "Savings")
            {
                T = TotalSavingsDeposit - TotalSavingsWithdraw;
                array[i].setBalance(T);
            }
            else if (array[i].getAccType() == "FixedDeposit")
            {
                T = TotalFDDeposit - TotalFDWithdraw;
                array[i].setBalance(T);
            }
            cout << ", Current Balance: " << array[i].getBalance() << endl;
        }
    };

    // Display initial account balances
    displayAccountBalances();

    // Prompt user for the amount they wish to transfer
    cout << "How much money did you want to transfer between accounts: ";
    while (!(cin >> Transferamnt && Transferamnt >= 0))
    {
        cout << "\nPlease enter a valid transfer amount: ";
        cin.clear();
        cin.ignore(120, '\n');
    }

    // Prompt user to select source account
    int from = 0;
    cout << "\nWhich account did you want to transfer the money out of?: ";
    while (!(cin >> from && from >= 1 && from <= 2))
    {
        cout << "\nPlease try again, enter 1 or 2: ";
        cin.clear();
        cin.ignore(120, '\n');
    }

    // Prompt user to select target account, ensuring it's different from source
    int to = 0;
    cout << "\nWhich account did you want to transfer the money into?: ";
    while (!(cin >> to && to >= 1 && to <= 2 && to != from))
    {
        cout << "\nPlease try again, enter 1 or 2, ensure it is not the same as the account being transfered from: ";
        cin.clear();
        cin.ignore(120, '\n');
    }

    // Verify if there's enough balance in the source account for the transfer
    while (Enoughtransfer(array[from - 1], Transferamnt) != 1)
    {
        cout << "Please try again\n\n";
        displayAccountBalances();
        cout << "How much money did you want to transfer between accounts: ";
        while (!(cin >> Transferamnt && Transferamnt >= 0))
        {
            cout << "\nPlease enter a valid transfer amount: ";
            cin.clear();
            cin.ignore(120, '\n');
        }

        // Prompt user to select source and target accounts again
        cout << "\nWhich account did you want to transfer the money out of?: ";
        while (!(cin >> from && from >= 1 && from <= 2))
        {
            cout << "\nPlease try again, enter 1 or 2: ";
            cin.clear();
            cin.ignore(120, '\n');
        }
        cout << "\nWhich account did you want to transfer the money into?: ";
        while (!(cin >> to && to >= 1 && to <= 2 && to != from))
        {
            cout << "\nPlease try again, enter 1 or 2, ensure it is not the same as the account being transfered from: ";
            cin.clear();
            cin.ignore(120, '\n');
        }
    }

    // Once all checks are done, perform the actual money transfer
    transferMoney(array[from-1], array[to-1], Transferamnt);
}

//-----------------------------------------------------------------

bool AccountManager::Enoughtransfer(Account fromm, int howmuchh){
        if(fromm.getAccType() == "Savings")
        {
            T = TotalSavingsDeposit - TotalSavingsWithdraw;
        }
        else if(fromm.getAccType() == "FixedDeposit")
        {
            T = TotalFDDeposit - TotalFDWithdraw;
        }

        if((T - howmuchh) >= 0)
        {
            return true;
        }
        cout << "Not enough funds in account to transfer" << endl;
        return false;
    }

//-----------------------------------------------------------------

void AccountManager::transferMoney(Account From, Account To, int howmuch){
    // If the "From" account type is "Savings"
    if(From.getAccType() == "Savings")
    {
        // Update the total savings withdrawal amount
        TotalSavingsWithdraw = TotalSavingsWithdraw + howmuch;
        // Calculate and set the new balance of the "From" Savings account
        T = TotalSavingsDeposit - TotalSavingsWithdraw;
        From.setBalance(T);
    }
    // If the "From" account type is "FixedDeposit"
    else if(From.getAccType() == "FixedDeposit")
    {
        // Update the total fixed deposit withdrawal amount
        TotalFDWithdraw = TotalFDWithdraw + howmuch;
        // Calculate and set the new balance of the "From" Fixed Deposit account
        T = TotalFDDeposit - TotalFDWithdraw;
        From.setBalance(T);
    }

    // If the "To" account type is "Savings"
    if(To.getAccType() == "Savings")
    {
        // Update the total savings deposit amount
        TotalSavingsDeposit = TotalSavingsDeposit + howmuch;
        // Calculate and set the new balance of the "To" Savings account
        T = TotalSavingsDeposit - TotalSavingsWithdraw;
        To.setBalance(T);
    }
    // If the "To" account type is "FixedDeposit"
    else if(To.getAccType() == "FixedDeposit")
    {
        // Update the total fixed deposit deposit amount
        TotalFDDeposit = TotalFDDeposit + howmuch;
        // Calculate and set the new balance of the "To" Fixed Deposit account
        T = TotalFDDeposit - TotalFDWithdraw;
        To.setBalance(T);
    }

    // Output the successful transfer message and display the new balances
    cout << "Transfer successful, your " << From.getAccType() << " account now has " <<
    From.getBalance() << " dollars and your " << To.getAccType() << " account now has " <<
    To.getBalance() << " dollars in it." << endl;
}

//-----------------------------------------------------------------

void AccountManager::DisplayAccounts(Account *array){
    // Display a header message
    cout << "Here are your account details:" << endl;
    cout << endl;

    // Loop through all accounts
    for(int i = 0; i < AmntAccounts; i++)
    {
        // Display the type of the account
        cout << array[i].getAccType() << " Account: " << endl;
        cout << "Current Balance: ";

        // Check if the account is a Savings account
        if(array[i].getAccType() == "Savings")
        {
            int D1 = TotalSavingsDeposit;  // Store total savings deposits
            int W1 = TotalSavingsWithdraw; // Store total savings withdrawals
            T = TotalSavingsDeposit - TotalSavingsWithdraw; // Calculate and update balance
            array[i].setBalance(T);
            cout << array[i].getBalance() << endl;
            cout << "Total money inflow: " << D1 << endl;  // Display total deposits
            cout << "Total money outflow: " << W1 << endl;  // Display total withdrawals
        }
        // Check if the account is a Fixed Deposit account
        else if(array[i].getAccType() == "FixedDeposit")
        {
            int D2 = TotalFDDeposit;  // Store total fixed deposits
            int W2 = TotalFDWithdraw; // Store total fixed withdrawals
            T = TotalFDDeposit - TotalFDWithdraw; // Calculate and update balance
            array[i].setBalance(T);
            cout << array[i].getBalance() << endl;
            cout << "Total money inflow: " << D2 << endl;  // Display total deposits
            cout << "Total money outflow: " << W2 << endl;  // Display total withdrawals
        }
        cout << endl;
    }

    // Display the current cash value
    cout << "Current Cash: " << getCash() << endl;
    cout << endl;
}

//-----------------------------------------------------------------

void AccountManager::EditAccDetails(Account *array){
    // Display a list of all account types for user to choose from
    for(int i = 0; i < AmntAccounts; i++)
        cout << (i+1) << ". " << array[i].getAccType() << endl;

    // Prompt the user to choose an account
    cout << "Which account would you like to access: ";
    int choice = 0;
    
    // Validate the user's choice; it should be between 1 and 2
    while(!(cin >> choice && choice >= 1 && choice <= 2))
    {
        cout << "\nPlease try again, enter 1 or 2: ";
        cin.clear();           // Clear any error flags
        cin.ignore(120,'\n');  // Discard invalid input
    }
    cout << endl;

    // If the selected account is a Savings account
    if (array[choice-1].getAccType() == "Savings")
    {
        // Display the current goal of the Savings account
        cout << "Current goal: " << sav[0].getGoal() << endl << endl;
        
        // Ask if the user wants to change the goal
        cout << "Would you like to change your goal? If so, enter Y, if not enter N: ";
        string change;
        cin >> change;

        // Validate the user's response; it should be 'Y' or 'N'
        while(change != "Y" && change != "N")
        {
            cout << "Please try again, enter Y or N: ";
            cin >> change;
        }

        // If the user wants to change the goal
        if(change == "Y")
        {
            cout << "\nPlease enter in your new goal: ";
            cin >> Goal;
            sav[0].ChangeGoal(Goal);
            // Confirm the change to the user
            cout << "\nYour new goal has successfully been set to: " << sav[0].getGoal() << endl;
        }
    }
    // If the selected account is a Fixed Deposit account
    else if(array[choice-1].getAccType() == "FixedDeposit")
    {
        // Display the current term of the Fixed Deposit account
        cout << "Current Term: " << fixed[0].getTerm() << " years\n";
        
        // Ask if the user wants to extend the term
        cout << "Would you like to extend your current term? If so, enter Y, if not enter N: ";
        string change;
        cin >> change;

        // Validate the user's response; it should be 'Y' or 'N'
        while(change != "Y" && change != "N")
        {
            cout << "Please try again, enter Y or N: ";
            cin >> change;
        }

        // If the user wants to extend the term
        if(change == "Y")
        {
            cout << "\nPlease enter in by how many years you would like to extend your current term: ";
            int extend = 0;
            
            // Validate the user's input for the extension; it should be non-negative
            while(!(cin >> extend && extend >= 0))
            {
                cout << "\nPlease enter a valid extension period: ";
                cin.clear();           // Clear any error flags
                cin.ignore(120,'\n');  // Discard invalid input
            }

            // Calculate the new term and update it
            Term = fixed[0].getTerm() + extend;
            fixed[0].setTerm(Term);
            // Confirm the change to the user
            cout << "\nYour new term has successfully been extended to: " << fixed[0].getTerm() << " years" << endl;
        }
    }
}

//-----------------------------------------------------------------

//This function will display the choices given when the code is running
void AccountManager::choice(){
        int n = 1;
        string lol;
        while(n == 1)
        {
            if (system("CLS")) system("clear");
            int choice = 0;

            cout << "---------------------------------------------------------------------" << endl;
            cout << "                    WELCOME TO ACCOUNT MANAGER                       " << endl;
            cout << "      Welcome to your Account, What would you like to do today?      " << endl;
            cout << "---------------------------------------------------------------------" << endl;
            cout << "1. Review Account Details" << endl;
            cout << "2. Edit Account Details" << endl;
            cout << "3. Deposit Cash" << endl;
            cout << "4. Withdraw Cash" << endl;
            cout << "5. Transfer money between accounts" << endl;
            cout << "6. Exit back to main menu" << endl;

            cout << "Which service would you like to use: ";
            while(true)
            {
                if(cin >> choice && choice >= 1 && choice <= 6)
                {
                    break;
                }
                cout << endl;
                cin.clear();
                cin.ignore(120,'\n');
                cout << "Please choose an option between 1 to 6 inclusive: ";
            }
            cout << endl;
            switch(choice)
            {
                case 1:
                    DisplayAccounts(getAccounts());
                    cout << "Enter any key to return to the menu screen: ";
                    cin >> lol;
                    cout << endl;
                    break;
                case 2:
                    EditAccDetails(getAccounts());
                    cout << "Enter any key to return to the menu screen: ";
                    cin >> lol;
                    cout << endl;
                    break;
                case 3:
                    deposit(getAccounts());
                    cout << "Enter any key to return to the menu screen: ";
                    cin >> lol;
                    cout << endl;
                    break;
                case 4:
                    withdraw(getAccounts());
                    cout << "Enter any key to return to the menu screen: ";
                    cin >> lol;
                    cout << endl;
                    break;
                case 5:
                    transferselect(getAccounts());
                    cout << "Enter any key to return to the menu screen: ";
                    cin >> lol;
                    cout << endl;
                    break;
                case 6:
                    n = 0;
                    if (system("CLS")) system("clear");
                    break;
            }
            if(n != 1)
            {
                break;
            }
        }
    }

//-----------------------------------------------------------------

//This function will delete the account, savings and FD accounts and reset it to 0
    AccountManager::~AccountManager(){
        delete[] (accounts);
        delete[] (sav);
        delete[] (fixed);

        TotalSavingsDeposit = 0;
        TotalFDDeposit = 0;

        TotalSavingsWithdraw = 0;
        TotalFDWithdraw = 0;
    }

//-----------------------------------------------------------------