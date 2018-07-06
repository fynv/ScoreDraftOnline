var guitarTune = 0.0;

function setGuitarTune(tune)
{
	guitarTune = tune;
}

function gnEB(fret, duration)
{
	var freq=Math.pow(2.0, -1.0+(4.0+fret+guitarTune)/12.0);
	return [freq, duration];
}

function gnA(fret, duration)
{
	var freq=Math.pow(2.0, -1.0+(9.0+fret+guitarTune)/12.0);
	return [freq, duration];
}

function gnD(fret, duration)
{
	var freq=Math.pow(2.0, (2.0+fret+guitarTune)/12.0);
	return [freq, duration];
}

function gnG(fret, duration)
{
	var freq=Math.pow(2.0, (7.0+fret+guitarTune)/12.0);
	return [freq, duration];
}

function gnB(fret, duration)
{
	var freq=Math.pow(2.0, (11.0+fret+guitarTune)/12.0);
	return [freq, duration];
}


function gnE(fret, duration)
{
	var freq=Math.pow(2.0, 1.0+(4.0+fret+guitarTune)/12.0);
	return [freq, duration];
}

var guitarStrings=[gnEB,gnA,gnD,gnG,gnB,gnE];

Chord = function(frets)
{
	this.frets=frets;
}

Chord.prototype.EB = function(duration)
{
	return gnEB(this.frets[0], duration);
}

Chord.prototype.A = function(duration)
{
	return gnA(this.frets[1], duration);
}

Chord.prototype.D = function(duration)
{
	return gnD(this.frets[2], duration);
}

Chord.prototype.G = function(duration)
{
	return gnG(this.frets[3], duration);
}

Chord.prototype.B = function(duration)
{
	return gnB(this.frets[4], duration);
}

Chord.prototype.E = function(duration)
{
	return gnE(this.frets[5], duration);
}

Chord.prototype.forward = function(duration, delay=0, start=0, end=5)
{
	ret=[];
	for (let i=start; i<=end; i++)
	{
		ret.push(guitarStrings[i](this.frets[i], duration));
		duration-=delay;
		ret.push(BK(duration));
	}
	ret.push(BL(duration));
	return ret;
}

Chord.prototype.backward = function(duration, delay=0, start=5, end=0)
{
	ret=[];
	for (let i=start; i>=end; i--)
	{
		ret.push(guitarStrings[i](this.frets[i], duration));
		duration-=delay;
		ret.push(BK(duration));
	}
	ret.push(BL(duration));
	return ret;
}
