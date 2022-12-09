<?php 



function listProjects( $proxy )
{

    // $link = "https://jsonplaceholder.typicode.com/posts";

    $link = "https://ipinfo.io/ip";

    $curl = curl_init();

      // Check if initialization had gone wrong*    
    if ($curl === false) {
        throw new Exception('failed to initialize');
    }
    curl_setopt($curl, CURLOPT_URL, $link);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");


    // curl_setopt( $curl , CURLOPT_SSL_VERIFYHOST, 0);
    // curl_setopt( $curl , CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($curl, CURLOPT_SSLVERSION, all);

    curl_setopt($curl, CURLOPT_PROXY, $proxy );
    
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $header_size = curl_getinfo( $curl );

 


    $result = curl_exec($curl);

    if ($result === false) {
        throw new Exception(curl_error($curl), curl_errno($curl));
    }
    curl_close($curl);

    return $result ;// json_decode($result, true);
}

// $proxy="https://5.161.47.214:3897";
// $proxy="165.225.8.14:10605";
// $proxy="http://user-46025:123456789@190.112.193.101:1212";

// $proxy="https://142.132.168.173:3897";
// $proxy="https://157.90.20.243:3897";
// $proxy="https://mbenzrak2:iuNNuC9hZb@216.185.46.24:49155";
$proxy="https://5b16741325:cgjnHpxY@107.173.201.31:8000";

var_dump( listProjects( $proxy ) );