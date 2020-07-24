#include "ai.h"

namespace {
    AiMode _ai = PLAYER;
}

AiMode ai() {
    return _ai;
}

void setAi(AiMode ai) {
    _ai = ai;
}
