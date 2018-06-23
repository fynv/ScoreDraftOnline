<?php 
session_start(); 
$name=session_id();
move_uploaded_file($_FILES["js"]["tmp_name"],"sessions/".$name.".js");
echo $name
?>
