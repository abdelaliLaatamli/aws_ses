<?php 

use Aws\Credentials\Credentials;
use Aws\CloudWatch\CloudWatchClient; 

class CloudWatchRepository {

    private $account ;
    private $region  ;
    private $cloudWatchClient;


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
            'version' => '2010-08-01',
            'credentials' => $credentials
        ];

        if( $this->account["proxy"] != null ){
            $authFactory["http"] = [
                'proxy' => $this->account["proxy"]
            ];
        }
     
        $this->cloudWatchClient = new CloudWatchClient( $authFactory );

    }

    



    public function getMetricStatistics(){
        
        // return [    
        //     "complaintRate" => $this->getMetricStatisticsMock() , 
        // ];

        return [    
            "Complaints"        => $this->getMetricStatisticsbyType( "Reputation.ComplaintRate" ) ,
            // "DeliveryAttempts"  => $this->getMetricStatisticsbyType( "Delivery" ) ,
            "DeliveryAttempts"  => [] ,
            "Rejects"           => [] ,

            // "send"              => $this->getMetricStatisticsbyType( "Send" ) ,
            // "bounce" => $this->getMetricStatisticsbyType( "Bounce" ) ,
            // "complaint" => $this->getMetricStatisticsbyType( "Complaint" ) ,
            "Bounces" => $this->getMetricStatisticsbyType( "Reputation.BounceRate" ) 
        ];
        // return 

    }


    private function getMetricStatisticsbyType( $type ){
        // https://docs.aws.amazon.com/aws-sdk-php/v3/api/api-monitoring-2010-08-01.html#getmetricstatistics
        $complaintRate = $this->cloudWatchClient->getMetricStatistics([
            'Namespace'  => "AWS/SES" ,
            'MetricName' => $type ,
            'EndTime'    => strtotime('now'),
            // 'StartTime'  => strtotime('-15 days'),
            'StartTime'  => strtotime('-10 days'),
            'Period'     => 3600,
            'Statistics' => array('Average'),
        ]);

        return $complaintRate->toArray()["Datapoints"];
    }

    public function getMetricStatisticsMock(){
        $content = file_get_contents( __DIR__ ."/../mock/reports_complaint.json" );
        $content = json_decode( $content )->Datapoints;
        return $content;
    }
    
}