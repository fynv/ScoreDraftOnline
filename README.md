ScoreDraftOnline
================

This is the source-code of an online music authoring interface based on SingingGadgets.

Online demo in available:
[http://scoredraft.org/sdol/](http://scoredraft.org/sdol/)


## How it works

The system let the users write musical scores by coding directly their browsers with javascript. The code this be exectuted along with ScoreDraft's client-side (js) APIs and generate an .json file, which will be uploaded to the server. Server-side Pyton script will decode the .json and call SingingGadgets to generate wave-form and Meteor(visualizer) data. The generated data will be transferred back to client browser for playback and visualization.

All samples and voicebanks are deployed are server side, user will see a list of available instruments/percussions/singers. Currently, user cannot extend them from client side.

## Deloying it on your own server

### Getting SingingGadgets

ScoreDraftOnline requires customizing the behavior of how SingingGadgets finds the resources, so it is not recommended to use pip to install SingingGadgets. Instead, please clone/download source-code from 

[https://github.com/fynv/SingingGadgets](https://github.com/fynv/SingingGadgets)
 

### Setting-up SingingGadgets

By default, SingingGadgets searches samples and voicebanks from the starting place of application. User will need to customize the behavior by editing ScoreDraft/__init__.py. Find the line "RESOURCE_ROOT='.'", you need to change the "." to wherever you place the resources using an absolute path. For example:

	RESOURCE_ROOT = '/home/user/SDRes'

You can then place instrument samples into '/home/user/SDRes/InstrumentSamples', percussion samples into '/home/user/SDRes/PercussionSamples', sound fonts to '/home/user/SDRes/SF2', UTAU voicebanks to '/home/user/SDRes/UTAUVoice'.

After setting up RESOURCE_ROOT, you can build and install the source-code using either CMake or setuptools. 

With CMake:
	
	$ cd SingingGadgets
	$ mkdir build
	$ cd build
	$ cmake .. -DCMAKE_INSTALL_PREFIX=../Test
	$ make
	$ make install

With setuptools
	$ cd SingingGadgets
	$ python3 setup.py build
	$ python3 setup.py install

### Setting-up ScoreDraftOnline

You can clone/download the source-code of ScoreDraftOnline from this page.
Before hosting it in you Apache-php environment, you need to do the following minimal setup steps:

1. Create an empty directory "sessions" for holding session data files.
2. Edit ImportScoreDraft.py, set the "sys.path+=" line according to where you installed SingingGadgets. If you installed with setuptools, then "sys.path+=" is not needed and can be removed.
3. Edit "Synth.php". You may need to change "python" to "python3" in some environments where you have multiple Pythons.
4. Setting-up instrument/percussion/singer lists

Part of the source-code need to be customized according to the samples and voicebanks you deployed for SingingGadgets. 2 files are related to this:

* InstList.json: this is used for index.html to generate the lists on the page.
* SynthFromJson.py: this is the back-end script used to synthesis sound from json. Lists of initializers are coded inline.

