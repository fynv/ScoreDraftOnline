function Code2Json(code)
{
	json_data={
		tempo: 80,
		refFreq: 261.626,
		tracks: new Array(),
		insts : new Array(),
		percs : new Array(),
		singers : new Array(), 
		inst_plays : new Array(),
		perc_plays : new Array(),
		singings : new Array()
	}

	Track = function()
	{
		this.id = json_data.tracks.length;
		this.info = {
			vol: 1.0,
			pan: 0.0
		}
		json_data.tracks.push(this.info);
	}

	Instrument = function(cls)
	{
		this.id = json_data.insts.length;
		this.info = {
			class: cls,
			vol : 1.0,
			pan: 0.0
		}
		json_data.insts.push(this.info);
	}

	Percussion = function(cls)
	{
		this.id = json_data.percs.length;
		this.info = {
			class: cls,
			vol: 1.0,
			pan: 0.0
		}
		json_data.percs.push(this.info);
	}

	Singer = function(cls)
	{
		this.id = json_data.singers.length;
		this.info = {
			class: cls,
			vol : 1.0,
			pan: 0.0
		}
		json_data.singers.push(this.info);

	}

	Sequence = function()
	{
		this.data=[];
	}

	Sequence.prototype.Clean= function()
	{
		this.data=[];
	}

	Sequence.prototype.Add= function(sub_seq)
	{
		this.data=this.data.concat(sub_seq)
	}

	Sequence.prototype.ReAdd= function(sub_seq)
	{
		this.Clean();
		this.Add(sub_seq);
	}

	Sequence.prototype.AsArray = function()
	{
		return this.data
	}

	Sequence.prototype.AsItem = function()
	{
		return [this.data]
	}

	function setTempo(tempo)
	{
		json_data.tempo=tempo;
	}

	function setRefFreq(refFreq)
	{
		json_data.refFreq=refFreq;
	}

	function playNoteSeq(seq, inst, track)
	{
		var play_item = {
			seq: seq.data,
			instId: inst.id,
			trackId: track.id
		};

		json_data.inst_plays.push(play_item);
	}

	function playBeatSeq(seq, percList, track)
	{
		var perc_id_lst=new Array();
		for (let i=0; i<percList.length; i++)
		{
			perc_id_lst.push(percList[i].id);
		}
		var play_item = {
			seq: seq.data,
			percIds: perc_id_lst,
			trackId: track.id
		};
		json_data.perc_plays.push(play_item);
	}

	function sing(seq, singer, track)
	{
		var singing_item = {
			seq: seq.data,
			singerId: singer.id,
			trackId: track.id
		};

		json_data.singings.push(singing_item);
	}

	// note definitions
	var Freqs=new Array(12);
	for (let i=0; i<12; i++)
		Freqs[i]= Math.pow(2.0, i/12.0);
	
	function note(octave, freq, duration)
	{
		return [freq*Math.pow(2.0, (octave-5.0)), duration]
	}

	function Do(octave=5, duration=48)
	{
		return note(octave,Freqs[0],duration)
	}

	function SetDo(freq)
	{
		Freqs[0]=freq
	}

	function Re(octave=5, duration=48)
	{
		return note(octave,Freqs[2],duration)
	}

	function SetRe(freq)
	{
		Freqs[2]=freq
	}

	function Mi(octave=5, duration=48)
	{
		return note(octave,Freqs[4],duration)
	}

	function SetMi(freq)
	{
		Freqs[4]=freq
	}

	function Fa(octave=5, duration=48)
	{
		return note(octave,Freqs[5],duration)
	}

	function SetFa(freq)
	{
		Freqs[5]=freq
	}

	function So(octave=5, duration=48)
	{
		return note(octave,Freqs[7],duration)
	}

	function SetSo(freq)
	{
		Freqs[7]=freq
	}

	function La(octave=5, duration=48)
	{
		return note(octave,Freqs[9],duration)
	}

	function SetLa(freq)
	{
		Freqs[9]=freq
	}

	function Ti(octave=5, duration=48)
	{
		return note(octave,Freqs[11],duration)
	}

	function SetTi(freq)
	{
		Freqs[11]=freq
	}

	function BL(duration=48)
	{
		return [-1.0, duration]
	}

	function BK(duration=48)
	{
		return [-1.0, -duration]
	}


	eval(code);
	return JSON.stringify(json_data)
}
