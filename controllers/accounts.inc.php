<?php


header('Content-Type: application/json');

require __PWDROOT__."/services/AccountService.php";

if (!empty($_POST) && isset($_POST["request"])) {

    $operation = $_POST["request"];

    switch ($operation) {

        case 'list_accounts' :
            try{
                $accounts = new AccountService( $configurations["db"] );
                $response = [ 
                    "status"  => true ,
                    "data"    => $accounts->getAllAccounts() ,
                    "message" => "data getting successfully" ,
                    "error"   => null
                ];
            }catch( Exception $e ){
                $response = [ 
                    "status"  => false ,
                    "data"    => [] ,
                    "message" => "Error on getting accounts" ,
                    "error"   => $e->getMessage() 
                ];
            }
        
            break;

        case 'add_account' :

            $account_name = $_POST["account_name"] == "" ? 'NULL' : "'{$_POST["account_name"]}'" ; 
            $access_key = $_POST["access_key"] == "" ? 'NULL' : "'{$_POST["access_key"]}'" ; 
            $secret_key = $_POST["secret_key"] == "" ? 'NULL' : "'{$_POST["secret_key"]}'" ; 
            $proxy = $_POST["proxy"] == "" ? 'NULL' : "'{$_POST["proxy"]}'" ; 

            try{
                $accounts = new AccountService( $configurations["db"] );
                $createAccount = $accounts->addAccount( $account_name ,  $access_key , $secret_key , $proxy );
                $response = [ 
                    "status"  => true ,
                    "data"    => $createAccount ,
                    "message" => "account added successfully" ,
                    "error"   => null
                ];
            }catch( Exception $e ){
                $response = [ 
                    "status"  => false ,
                    "data"    => null ,
                    "message" => "Error on adding accounts" ,
                    "error"   => $e->getMessage() 
                ];
            }

            
            break;

        case 'update_account' :

            $account_id   = $_POST["account_id"] ; 
            $account_name = $_POST["account_name"] == "" ? 'NULL' : "'{$_POST["account_name"]}'" ; 
            $access_key = $_POST["access_key"] == "" ? 'NULL' : "'{$_POST["access_key"]}'" ; 
            $secret_key = $_POST["secret_key"] == "" ? 'NULL' : "'{$_POST["secret_key"]}'" ; 
            $proxy = $_POST["proxy"] == "" ? 'NULL' : "'{$_POST["proxy"]}'" ; 
            
            try{
                $accounts = new AccountService( $configurations["db"] );
                $updatedAccount = $accounts->updateAccount( $account_id , $account_name , $access_key , $secret_key , $proxy );
                $response = [ 
                    "status"  => true ,
                    "data"    => $updatedAccount ,
                    "message" => "account updated successfully" ,
                    "error"   => null
                ];
            }catch( Exception $e ){
                $response = [ 
                    "status"  => false ,
                    "data"    => null ,
                    "message" => "Error on upditing accounts" ,
                    "error"   => $e->getMessage() 
                ];
            }
            break;

        case 'delete_account' : 
            $accountId = $_POST["accountId"];

            try{
                $accounts = new AccountService( $configurations["db"] );
                $is_deleted = $accounts->deleteAccount( $accountId ) ;
                $response = [ 
                    "status"  => true ,
                    "data"    => null ,
                    "message" => "record deleted successfully" ,
                    "error"   => null
                ];
            }catch( Exception $e ){
                $response = [ 
                    "status"  => false ,
                    "data"    => null ,
                    "message" => "Error on deleting record" ,
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
