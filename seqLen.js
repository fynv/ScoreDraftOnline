function TellDuration(seq)
{
	var duration = 0;

	for (let i=0; i<seq.data.length; i++)
	{
		var item = seq.data[i];
		if(Array.isArray(item))
		{
			var _item = item[0];
			if (typeof _item=="string") // singing
			{
				var tupleSize = item.length;
				var j =0;
				while (j<tupleSize)
				{
					j++;  // by-pass lyric
					_item=item[j];
					if(Array.isArray(_item)) // singing note
					{
						while (j<tupleSize)
						{
							_item = item[j];
							if(!Array.isArray(_item))
								break;
							var numCtrlPnt= _item.length/2;
							for (let k=0;k<numCtrlPnt;k++)
								duration+=_item[k*2+1];
							j++;
						}
					}
					else if (typeof _item=="number") // singing rap
					{
						duration += item[j];
						j+=3;
					}
				}
			}
			else if (typeof _item=="number") // note or beat
			{
				duration += item[1];
			}
		}
	}
	return duration;
}

