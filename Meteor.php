
<?php 
session_start(); 
?>
<html>
 	<head>
 		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
 		 <script type="text/javascript" src="/js/meteor.js"></script>
 		 <?php
 		 echo " <script type=\"text/javascript\">\n";
 		 echo "		var session_num=\"".session_id()."\"\n";
 		 echo "		var time_hash=\"".microtime()."\"\n";
 		 echo "</script>\n";
 		 ?>
 
 		 <script type="text/javascript">
 		 	window.onload = function() {
                var res = {
                    canvasID : "displayer",
                    audioID : "player",
                    dataPath : "/sessions/"+session_num+".meteor?cb="+time_hash
                };
                meteor = new Meteor(res);
            };
        </script>

        <style type="text/css">
			canvas {
			   	display: block;
				width: 100%;
				height: width*0.5625;
			}		
		</style>
 	</head>
	<body>
		<div>
			<canvas id="displayer" width="800" height="450"></canvas>
		</div>
		<div>
			<audio id='player' controls="controls" autoplay>
			<?php
				echo "<source type=\"audio/mpeg\" src=\"/sessions/".session_id().".mp3?cb=".microtime()."\"/>\n"
			?>
			</audio>
		</div>
	</body>
</html>