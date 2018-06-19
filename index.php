<?php 
session_start(); 
$_SESSION['text']="Test"

?>

<html>
	<header>
		<script>
						
			function decorateText()
			{
				text = document.getElementById('text').value;
				dText = 'This is decorated text:<br/>******'+text+"******<br/>";
				var enc = new TextEncoder();
				var buf = enc.encode(dText);
				var blob = new Blob([buf]);

				var formData = new FormData();
				formData.append('text', blob, 'text');

				var xhr = new XMLHttpRequest(); 
				xhr.open("POST", "test.php"); 
				xhr.responseType = "text";
				xhr.onload = function() 
				{

					document.getElementById('text').value = xhr.response;


				}
				xhr.send(formData);


			}
		</script>
	</header>
	<body>
		<p>
			<?php echo $_SESSION['text'];?>
		</p>
		<form action="javascript:decorateText()" method="post">
			<p>
				<textarea id="text" cols="30" rows="10" autofocus>Type Here</textarea>  
			</p>
			<p>
				<button type="submit">Submit</button>
			</p>
		</form>
	</body>

</html>