<?php


header('Content-Type: application/json');


if (!empty($_POST) && isset($_POST["request"])) {

    $operation = $_POST["request"];

    switch ($operation) {

        case 'list_accounts' :
            $response = [ "status" => true , "data" => [ "aa" , "bb" ] , "message" => "data getting successfully" ];
            break;

        case 'save_account' :
            $response = [ "status" => true , "data" => null , "message" => "" ];
            break;
        
        default:
            $response = [ "status" => false , "data" => null , "message" => "this request not exist here" ];
            break;
    }
}


echo json_encode( $response );
