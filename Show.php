<?php
session_start(); 
$session_num =  session_id();
if (isset($_GET["num"]))
{
	$session_num=$_GET["num"];
}
session_regenerate_id(FALSE);
session_unset();
?>
<html>
	<header>
		<title>ScoreDraft Online</title>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js" type="text/javascript" charset="utf-8"></script>
		<?php
		echo "<script type=\"text/javascript\">\n";
		echo "		var session_num=\"".$session_num."\"\n";
		echo "</script>\n";
		?>
		<script type="text/javascript">
			function loadJS(jsFileName)
			{
				var xhr = new XMLHttpRequest(); 
				xhr.open("POST", jsFileName); 
				xhr.onload = function() 
				{
					editor = ace.edit("code");
					editor.setValue(xhr.response);
				}
				xhr.send();
			}
		</script>
 		 
		<style type="text/css" media="screen">
		#displayer{
			display: block;
			position: relative;
			margin-left: auto;
    		margin-right: auto;
		    top: 0;
		    left: 0;
		    width: 850px;
		    height: 550px;
		}
		#code {
			display: block;
			position: relative;
			margin-left: auto;
    		margin-right: auto;
			top : 0;
			left : 0;
			width: 80%;
			height: 500px;
			border: 1px solid lightgray;
		}		
	    </style>
	</header>
	<body>
		<?php
		echo "<iframe id=\"displayer\" src=\"Meteor.php?num=".$session_num."\"></iframe>";
		?>
		<pre id="code" class="ace_editor"></pre>		
		<script type="text/javascript">
			var editor = ace.edit("code");
			editor.setTheme("ace/theme/chrome");
			editor.session.setMode("ace/mode/javascript");
			editor.setFontSize(16);
			editor.setReadOnly(true); 

			var jsFileName= "sessions/"+session_num+".js"
			loadJS(jsFileName);
		</script>

	</body>
</html>
