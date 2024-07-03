#ifndef ACCOUNTS_H
#define ACCOUNTS_H

#include "Account.h"
#include "AccountManager.h" 
#include "Savings.h"
#include "Fd.h"

using namespace std;

class AccountManager : public Account {
private:
    // Various variables; consider a more descriptive naming
    int AmntAccounts, T, CurrentCash, index, savindex, fixindex;
    int Deposit, Withdraw, TotalSavingsDeposit, TotalFDDeposit, TotalSavingsWithdraw, TotalFDWithdraw;
    int Transferamnt, indexfrom, indexto, Term;
    string DepositAcc, WithdrawAcc, fromAcc, toAcc, Goal;

public:
    // Pointer to objects of Account, Savings, and Fd classes
    Account *accounts;  
    Savings *sav;
    Fd *fixed;

    // Constructor with a parameter to initialize the cash
    AccountManager(int csh);

    // Functions to manage and manipulate accounts and transactions
    void setCash(int Cs);
    int getCash();
    void AddSavAccount(Savings AA);
    void AddFdAccount(Fd BB);
    Account* getAccounts();
    void deposit(Account *array);
    void depositCash(int cashamnt, Account XW);
    bool EnoughDepositCash(int number);
    void withdraw(Account *array);
    void WithdrawCash(int ccashamnt, Account XW);
    bool EnoughWithdrawCash(int number, Account XW);
    void transferselect(Account *array);
    void transferMoney(Account From, Account To, int howmuch);
    bool Enoughtransfer(Account fromm, int howmuchh);
    void DisplayAccounts(Account *array);
    void EditAccDetails(Account *array);
    void choice();

    // Destructor to manage memory allocated to objects
    ~AccountManager();
};

#endif