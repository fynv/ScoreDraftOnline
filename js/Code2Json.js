function Real_Code2Json(code)
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
	

	eval(code);
	return JSON.stringify(json_data)
}

function load_next_url(url_list, url_id, code, user_code)
{
	if (url_id>=url_list.length)
	{
		code+=user_code;
		Real_Code2Json(code);
	}
	else
	{		
		var xhr = new XMLHttpRequest(); 
		xhr.open("POST", url_list[url_id]); 
		xhr.responseType = "text";
		xhr.onload = function() 
		{
			code+=xhr.response;
			url_id++;
			load_next_url(url_list, url_id, code, user_code);
		}
		xhr.send();
	}
}


function Code2Json(user_code)
{
	var lines = user_code.split('\n');

	user_code="";
	var url_list= ["notes.js"]

	// parse include commands
	for (let i=0;i<lines.length;i++)
	{
		line = lines[i];
		if (line[0]=="#")
		{
			if (line.substr(0,8)=="#include")
			{
				let start = line.indexOf("\"", 8)+1;
				let end = line.indexOf("\"", start);
				url_list= url_list.concat(line.substr(start,end-start));
			}
		}
		else
		{
			user_code+=line+"\n";
		}
	}


	var code="";
	load_next_url(url_list, 0, code, user_code);
}
