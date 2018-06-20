import sys
import json
import os
from ImportScoreDraft import *

if len(sys.argv)>1:
	json_name = "sessions/"+sys.argv[1]+".json"
	wav_name = "sessions/"+sys.argv[1]+".wav"
	mp3_name = "sessions/"+sys.argv[1]+".mp3"
	print("proccessing: "+json_name)

	json_data= []
	with open(json_name,"r") as f:
		json_data = json.load(f)

	Guitar = sd.KarplusStrongInstrument()

	doc = sd.MeteorDocument()

	buffers = {}

	for play in json_data['inst_plays']:
		trackId = play['trackId']
		if not trackId in buffers:
			buffers[trackId]= doc.newBuf()
		buf = buffers[trackId]
		seq = play['seq']
		doc.playNoteSeq(seq, Guitar, buf)

	doc.mixDown(wav_name)

	os.system("lame "+wav_name+" "+mp3_name)
	os.remove(wav_name)

	print("generated: "+mp3_name)





