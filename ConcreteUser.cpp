#include "ConcreteUser.h"
#include "User.h"

ConcreteUser::ConcreteUser(string username, long password) : User(username, password) {}

void ConcreteUser::greeting() const {
    cout << "Hello, " << getusername() << " from NJP Bank!" << endl;
}
