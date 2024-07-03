output: main.o AccountManager.o Account.o Savings.o Fd.o User.o ConcreteUser.o Loan.o BusinessLoan.o BusinessLoanCalculator.o
	g++ main.o AccountManager.o Account.o Savings.o Fd.o User.o ConcreteUser.o Loan.o BusinessLoan.o BusinessLoanCalculator.o -o BANK 

main.o: main.cpp
	g++ -c main.cpp

AccountManager.o: AccountManager.h AccountManager.cpp
	g++ -c AccountManager.cpp

Account.o: Account.h Account.cpp
	g++ -c Account.cpp

Savings.o: Savings.h Savings.cpp
	g++ -c Savings.cpp

Fd.o: Fd.h Fd.cpp
	g++ -c Fd.cpp

User.o: User.h User.cpp
	g++ -c User.cpp

ConcreteUser.o: ConcreteUser.h ConcreteUser.cpp
	g++ -c ConcreteUser.cpp

	
Loan.o: Loan.h Loan.cpp
	g++ -c Loan.cpp

	
BusinessLoan.o: BusinessLoan.h BusinessLoan.cpp
	g++ -c BusinessLoan.cpp


BusinessLoanCalculator.o: BusinessLoanCalculator.h BusinessLoanCalculator.cpp
	g++ -c BusinessLoanCalculator.cpp

clean:
	rm *.o output