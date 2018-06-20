<?php 
move_uploaded_file($_FILES["json"]["tmp_name"],$_FILES["json"]["name"].".json");
echo shell_exec("python ./SynthFromJson.py ".$_FILES["json"]["name"]);
?>
