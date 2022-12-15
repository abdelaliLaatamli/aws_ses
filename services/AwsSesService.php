<?php 

use Aws\Credentials\Credentials;
use Aws\Ses\SesClient;

class AwsSesService {

    private $account ;
    private $region  ;
    private $sesClient;


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
            'version' => '2010-12-01',
            'credentials' => $credentials
        ];

        if( $this->account["proxy"] != null ){
            $authFactory["http"] = [
                // 'proxy' => "https://". $this->account["proxy"]
                'proxy' => $this->account["proxy"]
            ];
        }
     
        $this->sesClient = new SesClient( $authFactory );

    }

    



    public function getSesDetails(){

        // https://docs.aws.amazon.com/aws-sdk-php/v3/api/api-email-2010-12-01.html#getsendquota
        $sendQuota = $this->sesClient->getSendQuota([ ])->toArray();
        $sendStatistics = $this->sesClient->getSendStatistics([])->toArray();

        return [ 
            "getSendStatistics" =>  $sendStatistics["SendDataPoints"],
            "getSendQuota" =>  $sendQuota
        ];

    }

    public function getSesDetailsMock(){
        $content = file_get_contents( __DIR__ ."/../mock/response.json" );
        $content = json_decode( $content )->data;
        return $content;
    }
    
}