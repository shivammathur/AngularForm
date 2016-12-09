<?php

// read form post data and create body
$txt = "mail body";

$to = "test@test.com";
$subject = "Mail subject";
$headers = "From: no-reply@test.com\r\n";
$headers .= "Reply-To: no-reply@test.com\r\n";
$headers .= "CC: test@test.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($to,$subject,$txt,$headers);
?>