import sys
import json
import os
from ImportScoreDraft import *

def set_note_vol_pan(item, info):
	if 'vol' in info:
		item.shell.volume=info['vol']
	if 'pan' in info:
		item.shell.pan=info['pan']

# instrument initializers
def KarplusStrong(info):
	inst =  sd.KarplusStrongInstrument()
	set_note_vol_pan(inst, info)
	if 'cut_frequency' in info:
		inst.setCutFrequency(info['cut_frequency'])
	if 'loop_gain' in info:
		inst.setLoopGain(inst, info['loop_gain'])
	if 'sustain_gain' in info:
		inst.setSustainGain(inst, info['sustain_gain'])
	return inst

def SynthFontViena(info):
	preset_index = 0
	if 'preset_index' in info:
		preset_index= info['preset_index']
	inst = sd.SynthFontViena(preset_index)
	set_note_vol_pan(inst, info)
	return inst

def Piano_Sampler(info):
	inst = sd.Piano()
	set_note_vol_pan(inst, info)
	return inst


InstInitializerMap = {
	'KarplusStrong': KarplusStrong,
	'SynthFontViena': SynthFontViena,
	'Piano_Sampler': Piano_Sampler
}

# Percussion initializers
def BassDrum(info):
	perc = sd.BassDrum()
	set_note_vol_pan(perc, info)
	return perc

def Snare(info):
	perc = sd.Snare()
	set_note_vol_pan(perc, info)
	return perc

def Clap(info):
	perc = sd.Clap()
	set_note_vol_pan(perc, info)
	return perc

def ClosedHitHat(info):
	perc = sd.ClosedHitHat()
	set_note_vol_pan(perc, info)
	return perc

def Tom1(info):
	perc = sd.Tom1()
	set_note_vol_pan(perc, info)
	return perc

def Tom2(info):
	perc = sd.Tom2()
	set_note_vol_pan(perc, info)
	return perc

def Tom3(info):
	perc = sd.Tom3()
	set_note_vol_pan(perc, info)
	return perc

def Tom4(info):
	perc = sd.Tom4()
	set_note_vol_pan(perc, info)
	return perc

PercInitializerMap = {
	'BassDrum': BassDrum,
	'Snare': Snare,
	'Clap': Clap,
	'ClosedHitHat': ClosedHitHat,
	'Tom1': Tom1,
	'Tom2': Tom2,
	'Tom3': Tom3,
	'Tom4': Tom4
}

#Singer Initializers
def GePing(info):
	singer = sd.GePing_UTAU()
	set_note_vol_pan(singer, info)
	return singer

SingerInitializerMap = {
	'GePing' : GePing
}


if len(sys.argv)>1:
	json_name = "sessions/"+sys.argv[1]+".json"
	wav_name = "sessions/"+sys.argv[1]+".wav"
	mp3_name = "sessions/"+sys.argv[1]+".mp3"
	meteor_name = "sessions/"+sys.argv[1]+".meteor"
	print("proccessing: "+json_name)

	json_data= []
	with open(json_name,"r") as f:
		json_data = json.load(f)

	doc = sd.MeteorDocument()
	doc.setTempo(json_data['tempo'])
	doc.setReferenceFrequency(json_data['refFreq'])

	for trackInfo in json_data['tracks']:
		bufId= doc.newBuf()
		if 'vol' in trackInfo:
			doc.setTrackVolume(bufId,trackInfo['vol'])
		if 'pan' in trackInfo:
			doc.setTrackPan(bufId,trackInfo['pan'])

	insts = []
	for instInfo in json_data['insts']:
		inst = None
		if instInfo['class'] in InstInitializerMap:
			initializer = InstInitializerMap[instInfo['class']]
			inst = initializer(instInfo)
		else:
			inst = KarplusStrong(instInfo)
		insts+=[inst]

	percs = []
	for percInfo in json_data['percs']:
		perc = None
		if percInfo['class'] in PercInitializerMap:
			initializer = PercInitializerMap[percInfo['class']]
			perc = initializer(percInfo)
		else:
			perc = Clap(percInfo)
		percs += [perc]

	singers = []
	for singerInfo in json_data['singers']:
		singer = None
		if singerInfo['class'] in SingerInitializerMap:
			initializer = SingerInitializerMap[singerInfo['class']]
			singer = initializer(singerInfo)
		else:
			singer = GePing(singerInfo)
		singers += [singer]

	# instrument plays
	for play in json_data['inst_plays']:
		instId = play['instId']
		trackId = play['trackId']
		seq = play['seq']
		doc.playNoteSeq(seq, insts[instId], trackId)

	# percussion plays
	for play in json_data['perc_plays']:
		percId_list = play['percIds']
		perc_list = [percs[percId] for percId in percId_list]
		trackId = play['trackId']
		seq = play['seq']
		doc.playBeatSeq(seq, perc_list, trackId)

	# singings
	for singing in json_data['singings']:
		singerId = singing['singerId']
		trackId = singing['trackId']
		seq = singing['seq']
		doc.sing(seq, singers[singerId], trackId)

	doc.saveToFile(meteor_name)

	doc.mixDown(wav_name)

	os.system("lame "+wav_name+" "+mp3_name)
	os.remove(wav_name)

	print("generated: "+mp3_name)





