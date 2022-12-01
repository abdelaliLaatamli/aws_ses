<?php 


class AwsSesService {

    private $account ;
    private $region  ;
    private $sesClient;


    public function __construct( $account , $region )
    {
        $this->account = $account ;
        $this->region = $region;

    }



    public function getSesDetails(){

        // $result = $this->sesClient->getSendQuota([ ]);
        // $result = $this->sesClient->getSendStatistics([ ]);
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