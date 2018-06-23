setTempo(100);

function Dong(duration=48)
{
    return [0, duration];
}

function Cha(duration=48)
{
    return [1, duration];
}


function Chi(duration=48)
{
    return [2, duration];
}

var seq=new Sequence();
seq.Add([Dong(), Cha(), Dong(), Cha(), BK(192), Chi(24), Chi(24), Chi(24), Chi(24), Chi(24), Chi(24), Chi(24), Chi(24)]);

var track1 = new Track();
var BaseDrum = new Percussion("BassDrum");
var Snare = new Percussion("Snare");
var Hat = new Percussion("ClosedHitHat");

var PercGroup = [BaseDrum, Snare, Hat];

playBeatSeq(seq,PercGroup,track1);
			