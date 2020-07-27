
// IDs..
#define AML8_W1 	0
#define AML8_W2 	1
#define AML8_W3 	2
#define AML8_W4 	3

#define AML8_N1 	4
#define AML8_N2 	5

#define AML8_C1 	6
#define AML8_C2 	7
#define AML8_C3 	8
#define AML8_C4 	9

#define AML8_S0 	10
#define AML8_S2 	11
#define AML8_S3 	12

#define AML8_R1 	13
#define AML8_R2 	14
#define AML8_R3 	15
#define AML8_R4 	16
#define AML8_R5 	17
#define AML8_R6 	18
#define AML8_R7 	19
#define AML8_R8 	20

// Channels...
#define AML8_CHANNEL0	1
#define AML8_CHANNEL1	2
#define AML8_CHANNEL2	3
#define AML8_CHANNEL3	4
#define AML8_CHANNEL4	5
#define AML8_CHANNEL5	6
#define AML8_CHANNEL6	7
#define AML8_CHANNEL7	8
#define AML8_CHANNEL8	9
#define AML8_CHANNEL9	10

// Phases...
#define AML8_W1_END	14
#define AML8_W2_END	14
#define AML8_W3_END	14
#define AML8_W4_END	12

#define AML8_R1_END	11
#define AML8_R4_END	6
#define AML8_R5_END	10
#define AML8_R6_END	10
#define AML8_R7_END	18
#define AML8_R8_END	13

#define AML8_C1_END	5
#define AML8_C2_END	5
#define AML8_C3_END	14
#define AML8_C4_END	10

#define AML8_S3_END	18

// Events...
#define AML8_R1_EV	2000
#define AML8_R2_EV	2001
#define AML8_R2_EV2	2002
#define AML8_R3_EV	2003
#define AML8_R3_EV2	2004
#define AML8_R4_EV	2005
#define AML8_R5_EV	2006
#define AML8_R6_EV	2007
#define AML8_R7_EV	2008
#define AML8_R8_EV	2009

#define AML8_FREEZE_CODE	2010

#define AML8_FREEZE_EV	ml_event {					\
				startup 	$AML_SHUTDOWN		\
				startup_data	1			\
									\
				active_time	1			\
									\
				ml_ev_comm {				\
					code	$AML_LOCK $AML8_ML_ID 0 \
				}					\
			}						\
			ml_event {					\
				key_code	$AML8_FREEZE_CODE	\
				sequence				\
									\
				ml_ev_comm {				\
					code	$AML_DISABLE_ML $AML8_ML_ID 0 \
				}					\
				ml_ev_comm {				\
					code	$AML_LOCK $AML8_ML_ID 0 \
				}					\
			}

#define AML8_BUG_EVENTS ml_event {								\
				key_code	     $AML8_BUG_KEY				\
												\
				rnd		5						\
				startup_data	50						\
												\
				sequence							\
				if_locked							\
				no_deactivate							\
												\
				active_time	3						\
												\
				channel 	$AML8_CH_ID					\
												\
				ml_ev_comm {							\
					code	$AML_IS_LOCKED $AML8_WND_ID 0			\
					start_time	0					\
				}								\
				ml_ev_comm {							\
					code	$AML_IS_ACTIVE $AML8_WND_ID 0			\
					start_time	0					\
				}								\
				ml_ev_comm {							\
					code	$AML_UNLOCK $AML8_BUG_ID 0			\
					start_time	1					\
				}								\
				ml_ev_comm {							\
					code	$AML_PUT_IN_CH_QUEUE $AML8_CH_ID $AML8_BUG_ID	\
					start_time	2					\
				}								\
				ml_ev_comm {							\
					code	$AML_START_SOUND $ACI_L8_STEP_SOUND 0		\
					start_time	3					\
				}								\
				ml_ev_comm {							\
					code	$AML_GO_PHASE $AML8_BUG_ID $AML8_BUG_PHASE	\
					start_time	3					\
				}								\
			}									\
			ml_event {								\
				key	$VK_LBUTTON						\
				key	$VK_RBUTTON						\
												\
				sequence							\
				if_not_locked							\
				no_deactivate							\
												\
				active_time	3						\
				priority	-1						\
												\
				channel 	$AML8_CH_ID					\
												\
				ml_ev_comm {							\
					code	$AML_IS_LOCKED $AML8_WND_ID 0			\
					start_time	0					\
				}								\
				ml_ev_comm {							\
					code	$AML_IS_ACTIVE $AML8_WND_ID 0			\
					start_time	0					\
				}								\
				ml_ev_comm {							\
					code	$AML_PUT_IN_CH_QUEUE $AML8_CH_ID $AML8_BUG_ID	\
					start_time	1					\
				}								\
				ml_ev_comm {							\
					code	$AML_START_SOUND $ACI_L8_STEP_SOUND 0		\
					start_time	2					\
				}								\
				ml_ev_comm {							\
					code	$AML_GO_PHASE $AML8_BUG_ID 0			\
					start_time	2					\
				}								\
				ml_ev_comm {							\
					code	$AML_LOCK $AML8_BUG_ID 0			\
					start_time	3					\
				}								\
			}									\
			ml_event {								\
				startup 	$AML_STARTUP					\
												\
				ml_ev_comm {							\
					code	$AML_DISABLE_ML $AML8_BUG_ID 0			   \
				}								\
				ml_ev_comm {							\
					code	$AML_LOCK $AML8_BUG_ID 0			\
				}								\
			}

#define AML8_WND_CLOSE		ml_event {								\
					startup 	$AML_SHUTDOWN					\
					startup_data	$AML8_W1_TIME					\
													\
					channel $AML8_CHANNEL3						\
													\
					sequence							\
					active_time	5						\
					priority	$AML8_W1_PRIORITY				\
													\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_N1 0				\
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_N2 0				\
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_R1 0				\
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_R2 0				\
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_R3 0				\
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_R4 0				\
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_R5 0				\
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_R6 0				\
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_R7 0				\
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_R8 0				\
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_DISABLE_ML $AML8_R1 0			      \
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_DISABLE_ML $AML8_R2 0			      \
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_DISABLE_ML $AML8_R3 0			      \
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_DISABLE_ML $AML8_R4 0			      \
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_DISABLE_ML $AML8_R5 0			      \
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_DISABLE_ML $AML8_R6 0			      \
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_DISABLE_ML $AML8_R7 0			      \
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_DISABLE_ML $AML8_R8 0			      \
						start_time	0					\
					}								\
					ml_ev_comm {							\
						code	$AML_START_SOUND $ACI_WND_SOUND 0		\
						start_time	1					\
					}								\
					ml_ev_comm {							\
						code	$AML_GO_PHASE $AML8_W1 $AML8_W1_END		\
						start_time	1					\
					}								\
					ml_ev_comm {							\
						code	$AML_GO_PHASE $AML8_W2 $AML8_W2_END		\
						start_time	1					\
					}								\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_W2 0				\
						start_time	2					\
					}								\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_W1 0				\
						start_time	2					\
					}								\
					ml_ev_comm {							\
						code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL3 $AML8_W3	\
						start_time	3					\
					}								\
					ml_ev_comm {							\
						code	$AML_START_SOUND $ACI_WND_SOUND 0		\
						start_time	4					\
					}								\
					ml_ev_comm {							\
						code	$AML_GO_PHASE $AML8_W3 $AML8_W3_END		\
						start_time	4					\
					}								\
					ml_ev_comm {							\
						code	$AML_LOCK $AML8_W3 0				\
						start_time	5					\
					}								\
					ml_ev_comm {							\
						code	$AML_CLOSE_SPEECH 0 0				\
						start_time	5					\
					}								\
					ml_ev_comm {							\
						code	$AML_BREATH_OFF 0 0				\
						start_time	5					\
					}								\
				}

ml_data {
	id	$AML8_W1
	name	"resource/iscreen/ldata/l8/data.vot/w1.vot"

	channel $AML8_CHANNEL1

	ml_event {
		startup 	$AML_STARTUP
		startup_data	0

		sequence
		active_time	1

		channel 	$AML8_CHANNEL1

		ml_ev_comm {
			code	$AML_SET_PHASE $AML8_W1 $AML8_W1_END
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_W1 0
			start_time	1
		}
	}

	#define AML8_W1_TIME		1
	#define AML8_W1_PRIORITY	4
	$AML8_WND_CLOSE

	#define AML8_W1_TIME		10
	#define AML8_W1_PRIORITY	3
	$AML8_WND_CLOSE

	#define AML8_W1_TIME		20
	#define AML8_W1_PRIORITY	2
	$AML8_WND_CLOSE

	#define AML8_W1_TIME		30
	#define AML8_W1_PRIORITY	1
	$AML8_WND_CLOSE

	#define AML8_W1_TIME		40
	#define AML8_W1_PRIORITY	0
	$AML8_WND_CLOSE

	#define AML8_W1_TIME		50
	#define AML8_W1_PRIORITY	-1
	$AML8_WND_CLOSE

	#define AML8_W1_TIME		60
	#define AML8_W1_PRIORITY	-2
	$AML8_WND_CLOSE

	#define AML8_W1_TIME		70
	#define AML8_W1_PRIORITY	-3
	$AML8_WND_CLOSE

	#define AML8_W1_TIME		80
	#define AML8_W1_PRIORITY	-4
	$AML8_WND_CLOSE

	#define AML8_W1_TIME		90
	#define AML8_W1_PRIORITY	-5
	$AML8_WND_CLOSE

	#define AML8_W1_TIME		100
	#define AML8_W1_PRIORITY	-6
	$AML8_WND_CLOSE

	ml_event {
		key	$VK_LBUTTON
		key	$VK_RBUTTON

		sequence
		active_time	4

		if_locked
		no_deactivate

		channel 	$AML8_CHANNEL3
		priority	-1

		ml_ev_comm {
			code	$AML_IS_LOCKED $AML8_W3 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_IS_ACTIVE $AML8_W3 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_UNLOCK $AML8_W1 0
			start_time	1
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_WND_SOUND 0
			start_time	2
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_W1 0
			start_time	2
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL1 $AML8_N2
			start_time	3
		}
		ml_ev_comm {
			code	$AML_GO_INFINITE $AML8_N2 0
			start_time	4
		}
		ml_ev_comm {
			code	$AML_ENABLE_ML	$AML8_R3 0
			start_time	4
		}
		ml_ev_comm {
			code	$AML_ENABLE_ML	$AML8_R8 0
			start_time	4
		}
	}
}

ml_data {
	id	$AML8_W2
	name	"resource/iscreen/ldata/l8/data.vot/w2.vot"

	channel $AML8_CHANNEL0

	ml_event {
		startup 	$AML_STARTUP
		startup_data	0

		sequence
		active_time	1

		channel 	$AML8_CHANNEL0

		ml_ev_comm {
			code	$AML_SET_PHASE $AML8_W2 $AML8_W2_END
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_W2 0
			start_time	1
		}
	}

	ml_event {
		key	$VK_LBUTTON
		key	$VK_RBUTTON

		sequence
		active_time	4
		no_deactivate

		if_locked

		channel 	$AML8_CHANNEL3
		priority	-1

		ml_ev_comm {
			code	$AML_IS_LOCKED $AML8_W3 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_IS_ACTIVE $AML8_W3 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_UNLOCK $AML8_W2 0
			start_time	1
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_WND_SOUND 0
			start_time	2
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_W2 0
			start_time	2
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL0 $AML8_N1
			start_time	3
		}
		ml_ev_comm {
			code	$AML_GO_INFINITE $AML8_N1 0
			start_time	4
		}
		ml_ev_comm {
			code	$AML_ENABLE_ML	$AML8_R7 0
			start_time	4
		}
		ml_ev_comm {
			code	$AML_ENABLE_ML	$AML8_R2 0
			start_time	4
		}
	}
}

ml_data {
	id	$AML8_N1
	name	"resource/iscreen/ldata/l8/data.vot/n1.vot"

	channel $AML8_CHANNEL0

	#define AML8_ML_ID	$AML8_N1
	$AML8_FREEZE_EV
}

ml_data {
	id	$AML8_N2
	name	"resource/iscreen/ldata/l8/data.vot/n2.vot"

	channel $AML8_CHANNEL1

	#define AML8_ML_ID	$AML8_N2
	$AML8_FREEZE_EV
}

ml_data {
	id	$AML8_W3
	name	"resource/iscreen/ldata/l8/data.vot/w3.vot"

	channel $AML8_CHANNEL3

	ml_event {
		startup 	$AML_STARTUP
		startup_data	0

		sequence
		active_time	2

		channel 	$AML8_CHANNEL3

		ml_ev_comm {
			code	$AML_SET_PHASE $AML8_W3 $AML8_W3_END
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_W3 0
			start_time	1
		}
		ml_ev_comm {
			code	$AML_SEND2ACTINT $EV_NEXT_PHRASE 0
			start_time	2
		}
	}
}

ml_data {
	id	$AML8_W4
	name	"resource/iscreen/ldata/l8/data.vot/w4.vot"

	channel $AML8_CHANNEL9

	ml_event {
		startup 	$AML_STARTUP
		startup_data	0

		sequence
		active_time	1

		channel 	$AML8_CHANNEL9

		ml_ev_comm {
			code	$AML_LOCK $AML8_W4 0
			start_time	0
		}
	}
	ml_event {
//		  key	  $VK_A
		key_code	$AML_RUBOX_CODE

		if_locked
		sequence
		active_time	1

		channel 	$AML8_CHANNEL9

		ml_ev_comm {
			code	$AML_UNLOCK $AML8_W4 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_W4 $AML8_W4_END
			start_time	1
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_WND_SOUND 0
			start_time	1
		}
	}
	ml_event {
		key	$VK_LBUTTON
		key	$VK_RBUTTON

		if_not_locked
		sequence
		active_time	1
		no_deactivate
		priority	-1

		channel 	$AML8_CHANNEL9

		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_W4 0
			start_time	0
		}
		ml_ev_comm {
			code		$AML_SEND2ACTINT $EV_GET_RUBOX 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_WND_SOUND 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_W4 0
			start_time	1
		}
	}
}

ml_data {
	id	$AML8_R1
	name	"resource/iscreen/ldata/l8/data.vot/r1.vot"

	channel $AML8_CHANNEL8

	frame_check

	#define AML8_CH_ID	$AML8_CHANNEL8
	#define AML8_BUG_ID	$AML8_R1
	#define AML8_BUG_PHASE	$AML8_R1_END
	#define AML8_BUG_KEY	$AML8_R1_EV
	#define AML8_WND_ID	$AML8_W3

	$AML8_BUG_EVENTS

	#define AML8_ML_ID	$AML8_R1
	$AML8_FREEZE_EV
}

ml_data {
	id	$AML8_R2
	name	"resource/iscreen/ldata/l8/data.vot/r2.vot"

	channel $AML8_CHANNEL0

	#define AML8_ML_ID	$AML8_R2
	$AML8_FREEZE_EV
/*
	ml_event {
		key_code	$AML8_R2_EV

		rnd		3
		startup_data	100

		sequence
		no_deactivate

		channel $AML8_CHANNEL3
		active_time	4

		ml_ev_comm {
			code	$AML_IS_LOCKED $AML8_W2 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_IS_ACTIVE $AML8_W2 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL0 $AML8_R2
			start_time	1
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_R2 0
			start_time	2
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL0 $AML8_N1
			start_time	3
		}
		ml_ev_comm {
			code	$AML_GO_INFINITE $AML8_N1 0
			start_time	4
		}
	}
*/
	ml_event {
		key_code	$AML8_R2_EV2

		rnd		3
		startup_data	100

		sequence
		no_deactivate

		channel $AML8_CHANNEL3
		active_time	5

		ml_ev_comm {
			code	$AML_IS_LOCKED $AML8_W2 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_IS_ACTIVE $AML8_W2 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL0 $AML8_R2
			start_time	1
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL0 $AML8_R2
			start_time	2
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_R2 0
			start_time	3
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL0 $AML8_N1
			start_time	4
		}
		ml_ev_comm {
			code	$AML_GO_INFINITE $AML8_N1 0
			start_time	5
		}
	}

}

ml_data {
	id	$AML8_R3
	name	"resource/iscreen/ldata/l8/data.vot/r3.vot"

	channel $AML8_CHANNEL1

	#define AML8_ML_ID	$AML8_R3
	$AML8_FREEZE_EV

	ml_event {
		key_code	$AML8_R3_EV

		rnd		3
		startup_data	100

		sequence
		no_deactivate

		channel $AML8_CHANNEL3
		active_time	4

		ml_ev_comm {
			code	$AML_IS_LOCKED $AML8_W1 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_IS_ACTIVE $AML8_W1 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL1 $AML8_R3
			start_time	1
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_R3 0
			start_time	2
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL1 $AML8_N2
			start_time	3
		}
		ml_ev_comm {
			code	$AML_GO_INFINITE $AML8_N2 0
			start_time	4
		}
	}
	ml_event {
		key_code	$AML8_R3_EV2

		rnd		3
		startup_data	100

		sequence
		no_deactivate

		channel $AML8_CHANNEL3
		active_time	5

		ml_ev_comm {
			code	$AML_IS_LOCKED $AML8_W1 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_IS_ACTIVE $AML8_W1 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL1 $AML8_R3
			start_time	1
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL1 $AML8_R3
			start_time	2
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_R3 0
			start_time	3
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL1 $AML8_N2
			start_time	4
		}
		ml_ev_comm {
			code	$AML_GO_INFINITE $AML8_N2 0
			start_time	5
		}
	}
}

ml_data {
	id	$AML8_R4
	name	"resource/iscreen/ldata/l8/data.vot/r4.vot"

	channel $AML8_CHANNEL7

	frame_check

	#define AML8_ML_ID	$AML8_R4
	$AML8_FREEZE_EV

	#define AML8_CH_ID	$AML8_CHANNEL7
	#define AML8_BUG_ID	$AML8_R4
	#define AML8_BUG_PHASE	$AML8_R4_END
	#define AML8_BUG_KEY	$AML8_R4_EV
	#define AML8_WND_ID	$AML8_W3

	$AML8_BUG_EVENTS
}

ml_data {
	id	$AML8_R5
	name	"resource/iscreen/ldata/l8/data.vot/r5.vot"

	channel $AML8_CHANNEL6

	frame_check

	#define AML8_ML_ID	$AML8_R5
	$AML8_FREEZE_EV

	#define AML8_CH_ID	$AML8_CHANNEL6
	#define AML8_BUG_ID	$AML8_R5
	#define AML8_BUG_PHASE	$AML8_R5_END
	#define AML8_BUG_KEY	$AML8_R5_EV
	#define AML8_WND_ID	$AML8_W3

	$AML8_BUG_EVENTS
}

ml_data {
	id	$AML8_R6
	name	"resource/iscreen/ldata/l8/data.vot/r6.vot"

	channel $AML8_CHANNEL8

	frame_check

	#define AML8_ML_ID	$AML8_R6
	$AML8_FREEZE_EV

	#define AML8_CH_ID	$AML8_CHANNEL8
	#define AML8_BUG_ID	$AML8_R6
	#define AML8_BUG_PHASE	$AML8_R6_END
	#define AML8_BUG_KEY	$AML8_R6_EV
	#define AML8_WND_ID	$AML8_W3

	$AML8_BUG_EVENTS
}

ml_data {
	id	$AML8_R7
	name	"resource/iscreen/ldata/l8/data.vot/r7.vot"

	channel $AML8_CHANNEL5

	frame_check

	#define AML8_ML_ID	$AML8_R7
	$AML8_FREEZE_EV

	#define AML8_CH_ID	$AML8_CHANNEL5
	#define AML8_BUG_ID	$AML8_R7
	#define AML8_BUG_PHASE	$AML8_R7_END
	#define AML8_BUG_KEY	$AML8_R7_EV
	#define AML8_WND_ID	$AML8_W2

	$AML8_BUG_EVENTS
}

ml_data {
	id	$AML8_R8
	name	"resource/iscreen/ldata/l8/data.vot/r8.vot"

	channel $AML8_CHANNEL4

	frame_check

	#define AML8_ML_ID	$AML8_R8
	$AML8_FREEZE_EV

	#define AML8_CH_ID	$AML8_CHANNEL4
	#define AML8_BUG_ID	$AML8_R8
	#define AML8_BUG_PHASE	$AML8_R8_END
	#define AML8_BUG_KEY	$AML8_R8_EV
	#define AML8_WND_ID	$AML8_W1

	$AML8_BUG_EVENTS
}

ml_data {
	id	$AML8_C1
	name	"resource/iscreen/ldata/l8/data.vot/c1.vot"

	channel $AML8_CHANNEL3

	#define AML8_ML_ID	$AML8_C1
	$AML8_FREEZE_EV
}

ml_data {
	id	$AML8_C2
	name	"resource/iscreen/ldata/l8/data.vot/c2.vot"

	channel $AML8_CHANNEL3

	#define AML8_ML_ID	$AML8_C2
	$AML8_FREEZE_EV
}

ml_data {
	id	$AML8_C3
	name	"resource/iscreen/ldata/l8/data.vot/c3.vot"

	channel $AML8_CHANNEL3

	#define AML8_ML_ID	$AML8_C3
	$AML8_FREEZE_EV
}

ml_data {
	id	$AML8_C4
	name	"resource/iscreen/ldata/l8/data.vot/c4.vot"

	channel $AML8_CHANNEL3

	#define AML8_ML_ID	$AML8_C4
	$AML8_FREEZE_EV
}

ml_data {
	id	$AML8_S2
	name	"resource/iscreen/ldata/l8/data.vot/s2.vot"

	channel $AML8_CHANNEL3

	#define AML8_ML_ID	$AML8_S2
	$AML8_FREEZE_EV
}

ml_data {
	id	$AML8_S3
	name	"resource/iscreen/ldata/l8/data.vot/s3.vot"

	channel $AML8_CHANNEL3
}

ml_data {
	id	$AML8_S0
	name	"resource/iscreen/ldata/l8/data.vot/s0.vot"

	channel $AML8_CHANNEL3

	#define AML8_ML_ID	$AML8_S0
	$AML8_FREEZE_EV

	ml_event {
		key_code	$AML_BEG_SPEECH_EV

		channel $AML8_CHANNEL3

		sequence
		active_time	2
		priority	4

		ml_ev_comm {
			code	$AML_UNLOCK $AML8_W3 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_W3 0
			start_time	1
		}
		ml_ev_comm {
			code	$AML_BREATH_ON 0 0
			start_time	1
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_WND_SOUND 0
			start_time	1
		}
		ml_ev_comm {
			code	$AML_ENABLE_ML	$AML8_R1 0
			start_time	2
		}
		ml_ev_comm {
			code	$AML_ENABLE_ML	$AML8_R4 0
			start_time	2
		}
		ml_ev_comm {
			code	$AML_ENABLE_ML	$AML8_R5 0
			start_time	2
		}
		ml_ev_comm {
			code	$AML_ENABLE_ML	$AML8_R6 0
			start_time	2
		}
	}
	ml_event {
		key_code	$AML_END_SPEECH_EV

		channel $AML8_CHANNEL3

		sequence
		active_time	5
		priority	4

		ml_ev_comm {
			code	$AML_LOCK $AML8_N1 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_N2 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_R1 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_R2 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_R3 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_R4 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_R5 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_R6 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_R7 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_R8 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_DISABLE_ML $AML8_R1 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_DISABLE_ML $AML8_R2 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_DISABLE_ML $AML8_R3 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_DISABLE_ML $AML8_R4 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_DISABLE_ML $AML8_R5 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_DISABLE_ML $AML8_R6 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_DISABLE_ML $AML8_R7 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_DISABLE_ML $AML8_R8 0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_WND_SOUND 0
			start_time	1
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_W1 $AML8_W1_END
			start_time	1
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_W2 $AML8_W2_END
			start_time	1
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_W2 0
			start_time	2
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_W1 0
			start_time	2
		}
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL3 $AML8_W3
			start_time	3
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_WND_SOUND 0
			start_time	4
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_W3 $AML8_W3_END
			start_time	4
		}
		ml_ev_comm {
			code	$AML_LOCK $AML8_W3 0
			start_time	5
		}
		ml_ev_comm {
			code	$AML_CLOSE_SPEECH 0 0
			start_time	5
		}
		ml_ev_comm {
			code	$AML_BREATH_OFF 0 0
			start_time	5
		}
	}
	ml_event {
		key_code	$AML_SPEECH3_EV
		sequence

		no_deactivate

		channel 	$AML8_CHANNEL3

		priority	5

		active_time	4
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL3 $AML8_S2
			start_time	0
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_S2 0
			start_time	1
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_L2_GETOUT_SOUND 0
			start_time	1
		}
		ml_ev_comm {
			code	$AML_KEY_TRAP $AML_KEY $AML8_FREEZE_CODE
			start_time	2
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_S3 $AML8_S3_END
			start_time	3
		}
		ml_ev_comm {
			code	$AML_EXIT 0 0
			start_time	4
		}
	}
	ml_event {
		key_code	$AML_SPEECH0_CH0
		key_code	$AML_SPEECH1_CH0

		sequence
		no_deactivate

		channel 	$AML8_CHANNEL3

		priority	1
		active_time	2

		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL3 $AML8_C1
			start_time	0
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_L2_OUTIN_SOUND 0
			start_time	1
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_C1 $AML8_C1_END
			start_time	1
		}
		ml_ev_comm {
			code	$AML_REWIND $AML8_C1 0
			start_time	2
		}
	}
	ml_event {
		key_code	$AML_SPEECH0_CH1
		key_code	$AML_SPEECH1_CH1

		sequence
		no_deactivate

		channel 	$AML8_CHANNEL3

		priority	1
		active_time	2

		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL3 $AML8_C2
			start_time	0
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_L2_OUTIN_SOUND 0
			start_time	1
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_C2 $AML8_C2_END
			start_time	1
		}
		ml_ev_comm {
			code	$AML_REWIND $AML8_C2 0
			start_time	2
		}
	}
	ml_event {
		key_code	$AML_SPEECH0_EV
		sequence

		no_deactivate

		channel 	$AML8_CHANNEL3

		priority	5

		active_time	1
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL3 $AML8_S0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_SPEECH0_SOUND 0
			start_time	1
		}
	}
	ml_event {
		key_code	$AML_SPEECH1_EV
		sequence

		no_deactivate

		channel 	$AML8_CHANNEL3

		priority	5

		active_time	1
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL3 $AML8_S0
			start_time	0
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_SPEECH1_SOUND 0
			start_time	1
		}
	}
	ml_event {
		key_code	$AML_SPEECH2_EV
		sequence

		no_deactivate

		channel 	$AML8_CHANNEL3

		priority	5

		active_time	1
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL3 $AML8_S2
			start_time	0
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_S2 0
			start_time	1
		}
		ml_ev_comm {
			code	$AML_START_SOUND $ACI_SPEECH2_SOUND 0
			start_time	1
		}
	}
	ml_event {
		key_code	$AML_SPEECH2_CH0
		sequence

		no_deactivate

		channel 	$AML8_CHANNEL3

		priority	2

		active_time	2
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL3 $AML8_C3
			start_time	0
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_C3 $AML8_C3_END
			start_time	1
		}
		ml_ev_comm {
			code	$AML_REWIND $AML8_C3 0
			start_time	2
		}
	}
	ml_event {
		key_code	$AML_SPEECH2_CH1
		sequence

		no_deactivate

		channel 	$AML8_CHANNEL3

		priority	2

		active_time	2
		ml_ev_comm {
			code	$AML_PUT_IN_CH_QUEUE $AML8_CHANNEL3 $AML8_C4
			start_time	0
		}
		ml_ev_comm {
			code	$AML_GO_PHASE $AML8_C4 $AML8_C4_END
			start_time	1
		}
		ml_ev_comm {
			code	$AML_REWIND $AML8_C4 0
			start_time	2
		}
	}
}

speech_channel		$AML8_CHANNEL3

ml_event_seq $AML_UNLOCK0_SEQ 1 {

	id	$AML_UNLOCK1_SEQ
	id	$AML_UNLOCK2_SEQ
	id	$AML_UNLOCK3_SEQ

	priority	3
	sequence	$AML_BEG_SPEECH_EV	$AML_KEY
}

ml_event_seq $AML_PREPARE0_SEQ 1 {

	id	$AML_PREPARE1_SEQ
	id	$AML_PREPARE2_SEQ2
	id	$AML_PREPARE3_SEQ2

	priority	1
	sequence	$AML_SPEECH0_CH0	$AML_KEY
}

ml_event_seq $AML_PREPARE2_SEQ 1 {

	id	$AML_PREPARE3_SEQ

	priority	2
	sequence	$AML_SPEECH2_CH0	$AML_KEY
}

ml_event_seq $AML_SPEECH0_SEQ 1 {
	sequence	$AML_SPEECH0_EV 	$AML_KEY
}
ml_event_seq $AML_SPEECH1_SEQ 1 {
	sequence	$AML_SPEECH1_EV 	$AML_KEY
}
ml_event_seq $AML_SPEECH2_SEQ 1 {
	sequence	$AML_SPEECH2_EV 	$AML_KEY
}
ml_event_seq $AML_SPEECH3_SEQ 1 {
	sequence	$AML_SPEECH3_EV 	$AML_KEY
}

ml_event_seq $AML_END0_SEQ 1 {

	id	$AML_END1_SEQ
	id	$AML_END2_SEQ2

	priority	1
	sequence	$AML_SPEECH0_CH1	$AML_KEY
}

ml_event_seq $AML_END2_SEQ 1 {
	priority	2
	sequence	$AML_SPEECH2_CH1	$AML_KEY
}

ml_event_seq $AML_LOCK0_SEQ 1 {

	id	$AML_LOCK1_SEQ
	id	$AML_LOCK2_SEQ

	priority	3
	sequence	$AML_END_SPEECH_EV	$AML_KEY
}

ml_item 	$ACI_BOORAWCHICK       5      "resource/iscreen/ldata/l8/items/itm00.bmo"
ml_item 	$ACI_BOORAWCHICK       5      "resource/iscreen/ldata/l8/items/itm01.bmo"
ml_item 	$ACI_BOORAWCHICK       5      "resource/iscreen/ldata/l8/items/itm02.bmo"

