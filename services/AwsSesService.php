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

        // return [ $this->account["access_key"] , $this->account["secret_key"] ] ;
        // $credentials  = new Credentials( $this->account["access_key"] , $this->account["secret_key"] );

        // $authFactory = [
        //     'region' => $this->region,
        //     'version' => '2010-12-01',
        //     'credentials' => $credentials
        // ];

        // $authFactory["http"] = [
        //     'proxy' => $this->account["proxy"]
        // ];


        $this->sesClient = new Aws\Ses\SesClient([
            'version' => '2010-12-01',
            'region' => 'us-east-1',
            'credentials' => [
                'key' => $this->account["access_key"] ,
                'secret' => $this->account["secret_key"],
            ]
        ]);

        // $this->sesClient = new SesClient( $authFactory );

        // return $authFactory;

        // 'version' => '2010-12-01',
        // 'region' => 'us-east-1',
        // 'credentials' => [
        //     'key' => $key,
        //     'secret' => $secret,
        // ]

        // $d = Array
        // (
        //     [region] => es
        //     [version] => 2016-11-15
        //     [credentials] => pp
        //     [http] => Array
        //         (
        //             [proxy] => zzzz
        //         )
        
        // )
    }

    



    public function getSesDetails(){
        $result = $this->sesClient->getSendQuota([ ]);
        return $result; 
        // $result = $this->sesClient->getSendQuota([ ]);
        // $result = $this->sesClient->getSendStatistics([ ]);
        // return $this->authCredentials();
        return [ 
            "getSendStatistics" => [
                'SendDataPoints' => [
                    [
                        'Bounces' => 0,
                        'Complaints' => 0,
                        'DeliveryAttempts' => 5,
                        'Rejects' => 0,
                        'Timestamp' => 0 ,
                    ],
                    [
                        'Bounces' => 0,
                        'Complaints' => 0,
                        'DeliveryAttempts' => 3,
                        'Rejects' => 0,
                        'Timestamp' => 0,
                    ],
                    [
                        'Bounces' => 0,
                        'Complaints' => 0,
                        'DeliveryAttempts' => 1,
                        'Rejects' => 0,
                        'Timestamp' => 0,
                    ],
                ],
            ],
            "getSendQuota" => [

                [
                    'Max24HourSend' => 200,
                    'MaxSendRate' => 1,
                    'SentLast24Hours' => 1,
                ]
            ]
        ];

    }
    
}