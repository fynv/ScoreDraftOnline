var seq= new Sequence();
var line=new Sequence();
line.Add(['ming', Do(5,48), 'yue', Do(5,24), La(4,24)]);
line.Add(['ji', So(4,48),'shi',La(4,24),Do(5,24),'you',Do(5,144)]);
seq.Add([line.AsArray(), BL(48)]);
line.ReAdd(['ba', Do(5,48), 'jiu', Do(5,24), La(4,24)]);
line.Add(['wen', So(4,48),'qing',La(4,24),Re(5,24),'tian',Re(5,144)]);
seq.Add([line.AsArray(), BL(48)]);

var track1 = new Track();
var singer = new Singer("GePing");
sing(seq,singer,track1);
