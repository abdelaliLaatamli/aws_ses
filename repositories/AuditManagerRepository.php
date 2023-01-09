<?php 

use Aws\AuditManager\AuditManagerClient;
use Aws\Credentials\Credentials;
use Aws\Exception\AwsException;

class AuditManagerRepository {

    private $account ;
    private $region  ;
    private $auditManagerClient;


    public function __construct( $account , $region )
    {
        $this->account = $account ;
        $this->region = $region;
        $this->authCredentials();

    }

    private function authCredentials(){


        $credentials  = new Credentials( $this->account["access_key"] , $this->account["secret_key"] );

        $authFactory = [
            'region' => $this->region,
            'version' => '2017-07-25',
            'credentials' => $credentials
        ];

        if( $this->account["proxy"] != null ){
            $authFactory["http"] = [
                'proxy' => $this->account["proxy"]
            ];
        }
     
        $this->auditManagerClient = new AuditManagerClient( $authFactory );

    }

    public function getAccountHealth(){
        // https://docs.aws.amazon.com/aws-sdk-php/v3/api/api-auditmanager-2017-07-25.html#getaccountstatus
        try{
            return  [ "status" => $this->auditManagerClient->GetAccountStatus([])->toArray()["status"] ];
        }catch(Exception $e){
            return  [ "status" => "error incactive {$e->getMessage()}" ];
        }
        

    }

    
}