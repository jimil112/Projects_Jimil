#ifndef CONCRETEUSER_H
#define CONCRETEUSER_H

#include "User.h"

class ConcreteUser : public User {
public:
    ConcreteUser(string username, long password);

    void greeting() const override;  // Override the pure virtual function from the base class
};

#endif
