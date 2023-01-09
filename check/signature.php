


<?php 


// AWSAccessKeyId	AKIAIOSFODNN7EXAMPLE
// AWSSecretAccessKey	wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
$awsAccessKeyId = "AKIAIOSFODNN7EXAMPLE";
$awsAecretAccessKey = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

// https://email.us-west-2.amazonaws.com
// $signature =  hash_hmac('sha1', "some string", "some secret");

$today = date("D, j M Y G:i:s +0000");  

$stringToSign = 'GET' + "\n" +
	'' + "\n" +
	'' + "\n" +
	$today + "\n" +
	CanonicalizedAmzHeaders +
	CanonicalizedResource;

echo $stringToSign;
// echo $today;
// echo $signature;

// import base64
// import hmac
// from hashlib import sha1

// access_key = 'AKIAIOSFODNN7EXAMPLE'.encode("UTF-8")
// secret_key = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'.encode("UTF-8")

// string_to_sign = 'GET\n\n\nTue, 27 Mar 2007 19:36:42 +0000\n/awsexamplebucket1/photos/puppy.jpg'.encode("UTF-8")
// signature = base64.encodestring(
//                                 hmac.new(
//                                          secret_key, string_to_sign, sha1
//                                          ).digest()
//                                 ).strip()


// print(f"AWS {access_key.decode()}:{signature.decode()}")


/* Authorization = "AWS" + " " + AWSAccessKeyId + ":" + Signature;

Signature = Base64( HMAC-SHA1( UTF-8-Encoding-Of(YourSecretAccessKey), UTF-8-Encoding-Of( StringToSign ) ) );

StringToSign = HTTP-Verb + "\n" +
	Content-MD5 + "\n" +
	Content-Type + "\n" +
	Date + "\n" +
	CanonicalizedAmzHeaders +
	CanonicalizedResource;

CanonicalizedResource = [ "/" + Bucket ] +
	<HTTP-Request-URI, from the protocol name up to the query string> +
	[ subresource, if present. For example "?acl", "?location", or "?logging"];

CanonicalizedAmzHeaders = <described below> 
*/