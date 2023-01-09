<?php 


use Aws\Credentials\Credentials;
use Aws\Ses\SesClient;

class AwsService {

    private $account ;
    private $region  ;

    public function __construct( $account , $region )
    {
        $this->account = $account ;
        $this->region = $region;
    }



    public function getAccountStatistiques(){

        // return $this->responseMock();

        $account_health = new AuditManagerRepository( $this->account , $this->region );
        $account_watch  = new CloudWatchRepository( $this->account , $this->region );
        $account_ses    = new AwsSesRepository( $this->account , $this->region );


        return [
            "health" => $account_health->getAccountHealth() , 
            "watch"  => $account_watch->getMetricStatistics() ,
            "ses"    => $account_ses->getSesDetails()
        ];

    }

    private function responseMock(){
        $content = file_get_contents( __DIR__ ."/../mock/response_back.json" );
        $content = json_decode( $content );
        return $content;
    }
    
}