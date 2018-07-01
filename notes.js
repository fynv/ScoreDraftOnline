var Freqs=new Array(12);

function Do5Equals(key)
{
	for (let i=0; i<12; i++)
		Freqs[i]= Math.pow(2.0, i/12.0)*key;
}

Do5Equals(1.0);

function note(octave, freq, duration)
{
	return [freq*Math.pow(2.0, (octave-5.0)), duration]
}

function Do(octave=5, duration=48)
{
	return note(octave,Freqs[0],duration)
}

function Re(octave=5, duration=48)
{
	return note(octave,Freqs[2],duration)
}

function Mi(octave=5, duration=48)
{
	return note(octave,Freqs[4],duration)
}

function Fa(octave=5, duration=48)
{
	return note(octave,Freqs[5],duration)
}

function So(octave=5, duration=48)
{
	return note(octave,Freqs[7],duration)
}

function La(octave=5, duration=48)
{
	return note(octave,Freqs[9],duration)
}

function Ti(octave=5, duration=48)
{
	return note(octave,Freqs[11],duration)
}

function BL(duration=48)
{
	return [-1.0, duration]
}

function BK(duration=48)
{
	return [-1.0, -duration]
}
