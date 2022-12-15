<?php


header('Content-Type: application/json');

require __PWDROOT__."/services/AccountService.php";
require __PWDROOT__."/services/AwsSesService.php";

if (!empty($_POST) && isset($_POST["request"])) {

    $operation = $_POST["request"];

    switch ($operation) {

        case 'get_details' :

            $account_id = $_POST["account_id"];
            $region = $_POST["region"];

            try{
                $accountService = new AccountService( $configurations["db"] );
                $account = $accountService->getAccount( $account_id );

                $awsSesService = new AwsSesService( $account , $region );

                $response = [ 
                    "status"  => true ,
                    "data"    =>  $awsSesService->getSesDetails() ,
                    // "data"    =>  $awsSesService->getSesDetailsMock() ,
                    "message" => "details got successfully" ,
                    "error"   => null
                ];

            }catch( Exception $e ){
                $response = [ 
                    "status"  => false ,
                    "data"    => [] ,
                    "message" => "Error on getting details" ,
                    "error"   => $e->getMessage()
                ];
            }

        
            break;

        
        default:
            $response = [ "status" => false , "data" => null , "message" => "this request not exist here" ];
            break;
    }
}


echo json_encode( $response );
