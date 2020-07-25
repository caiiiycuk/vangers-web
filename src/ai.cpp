#include <iostream>
#include "ai.h"

namespace {
    AiMode _ai = PLAYER;
}

AiMode ai() {
    return _ai;
}

void setAi(AiMode ai) {
    _ai = ai;
    std::cout<<"setAi:"<<ai<<std::endl;
}
