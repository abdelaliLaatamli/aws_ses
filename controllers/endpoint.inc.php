<?php


header('Content-Type: application/json');

require __PWDROOT__."/services/AccountService.php";
require __PWDROOT__."/services/AwsService.php";
require __PWDROOT__."/repositories/AuditManagerRepository.php";
require __PWDROOT__."/repositories/AwsSesRepository.php";
require __PWDROOT__."/repositories/CloudWatchRepository.php";

if (!empty($_POST) && isset($_POST["request"])) {

    $operation = $_POST["request"];

    switch ($operation) {

        case 'get_details' :

            $account_id = $_POST["account_id"];
            $region = $_POST["region"];

            try{
                $accountService = new AccountService( $configurations["db"] );
                $account = $accountService->getAccount( $account_id );

                $awsService = new AwsService( $account , $region );

                $response = [ 
                    "status"  => true ,
                    "data"    =>  $awsService->getAccountStatistiques() ,
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
