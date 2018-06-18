<?php 
session_start(); 
if (isset($_POST["text"]))
{
	$_SESSION['text']=$_POST["text"];
}
else if (!isset($_SESSION['text']))
{
	$_SESSION['text']="<Empty>";
}
?>

<html>
	<header>
		<script>
			// https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
			function post(path, params, method) 
			{
			    method = method || "post"; // Set method to post by default if not specified.

			    // The rest of this code assumes you are not using a library.
			    // It can be made less wordy if you use one.
			    var form = document.createElement("form");
			    form.setAttribute("method", method);
			    form.setAttribute("action", path);

			    for(var key in params) 
			    {
			        if(params.hasOwnProperty(key)) 
			        {
			            var hiddenField = document.createElement("input");
			            hiddenField.setAttribute("type", "hidden");
			            hiddenField.setAttribute("name", key);
			            hiddenField.setAttribute("value", params[key]);

			            form.appendChild(hiddenField);
			        }
			    }

			    document.body.appendChild(form);
			    form.submit();
			}
			function decorateText()
			{
				text = document.getElementById('text').value;
				dText = 'This is decorated text:<br/>******'+text+"******<br/>";
				post("index.php", {text: dText});
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