#include <iostream>

#include "../lib/xtool/xglobal.h"
#include "../lib/xtool/xstream.h"
#include "common.h"
#include "3d/3d_math.h"
#include "3d/3dgraph.h"
#include "3d/3dobject.h"
#include "3d/parser.h"
#include "actint/item_api.h"
#include "units/uvsapi.h"
#include "units/hobj.h"
#include "units/items.h"
#include "units/compas.h"
#include "network.h"

#include "ai.h"

namespace {
	AiMode _ai = PLAYER;
}

AiMode ai() {
	return _ai;
}

void setAi(AiMode ai) {
	_ai = ai;
	std::cout<<"CxDebug: setAi:"<<ai<<std::endl;
}

/*void makeDecision() {
	if (NetworkON) {
		if (CurrentWorld == -1) {
			// CxDebug: put autoexit and autoequip here
		} else if (ActD.Active) {
			if (my_server_data.GameType == PASSEMBLOSS && UsedCheckNum < GloryPlaceNum) {
				std::cout<<"  CxDebug: current compass target:"<<GetCompasTarget()<<std::endl;
			} else if (my_server_data.GameType == MECHOSOMA) {
				//
			} else if (my_server_data.GameType == VAN_WAR) {
				//
			}
		}
	}
}*/