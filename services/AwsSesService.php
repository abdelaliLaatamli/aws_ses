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
        // socks5://
        if( $this->account["proxy"] != null ){
            $authFactory["http"] = [
                // 'proxy' => "https://". $this->account["proxy"]
                'proxy' => $this->account["proxy"]
            ];
        }
     
        $this->sesClient = new SesClient( $authFactory );

    }

    



    public function getSesDetails(){
        // return $this->authCredentials();
        // $result = $this->sesClient->getSendQuota([ ])->toArray();
        // $result = $this->sesClient->getSendStatistics([])->toArray();//->get("SendDataPoints");
        // return $result ; 
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