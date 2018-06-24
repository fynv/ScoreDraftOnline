<?php 
session_start();
putenv('LANG=en_US.UTF-8'); 
$name=session_id();
move_uploaded_file($_FILES["json"]["tmp_name"],"sessions/".$name.".json");
shell_exec("python ./SynthFromJson.py ".$name);
echo $name
?>
