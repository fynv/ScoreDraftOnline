import sys
import json
from ImportScoreDraft import *

if len(sys.argv)>1:
	json_name = sys.argv[1]+".json"
	wav_name = sys.argv[1]+".wav"
	print("proccessing: "+json_name)

	seq= []
	with open(json_name,"r") as f:
		seq = json.load(f)

	Guitar = sd.KarplusStrongInstrument()
	buf = sg.TrackBuffer()
	Guitar.play(buf, seq)
	sg.WriteTrackBufferToWav(buf, wav_name)

	print("generated: "+wav_name)





