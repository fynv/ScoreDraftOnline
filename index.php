<?php 
session_start(); 
$_SESSION['text']="Test"

?>

<html>
	<header>
		<script>

			function submit()
			{
				var code = "var seq="+document.getElementById('text').value;
				eval(code);

				var enc = new TextEncoder();
				var buf = enc.encode(JSON.stringify(seq));
				var blob = new Blob([buf]);

				var formData = new FormData();
				formData.append('json', blob, 'test');

				var xhr = new XMLHttpRequest(); 
				xhr.open("POST", "Synth.php"); 
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
		<form action="javascript:submit()" method="post">
			<p>
				<textarea id="text" cols="30" rows="10" autofocus>[[1.0, 48], [1.25, 48], [1.5, 48]]					
				</textarea>  
			</p>
			<p>
				<button type="submit">Submit</button>
			</p>
		</form>
	</body>

</html>