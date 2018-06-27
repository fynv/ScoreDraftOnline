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
