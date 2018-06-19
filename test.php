<?php 
move_uploaded_file($_FILES["text"]["tmp_name"],$_FILES["text"]["name"]);
echo "fileuploaded";
?>
