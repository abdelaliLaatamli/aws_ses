<?php

// From URL to get webpage contents.
$url = "https://jsonplaceholder.typicode.com/posts";
 
// Initialize a CURL session.
$ch = curl_init();
 
// Return Page contents.
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

// curl_setopt($ch, CURLOPT_PROXY, 'http://awl6q:l14ouq2i@154.13.51.136:5432');
			
// curl_setopt( $ch , CURLOPT_PROXY , 'https://208.82.61.13:3128');
curl_setopt( $ch , CURLOPT_PROXY , 'https://5b16741325:cgjnHpxY@107.173.201.31:8000');
// curl_setopt($ch, CURLOPT_PROXY, 'socks5://awl6q:l14ouq2i@154.13.51.136:5432');
// curl_setopt($ch, CURLOPT_PROXY, 'socks5://bob:marley@localhost:12345');
 
//grab URL and pass it to the variable.
curl_setopt($ch, CURLOPT_URL, $url);
 
$result = curl_exec($ch);
 
echo $result;
 
?>