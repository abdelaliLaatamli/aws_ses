<?php 

// require __DIR__ ."/bootstrap/bootstrap.inc.php";



// echo json_encode( $data );


// require '/path/to/vendor/autoload.php';
require __DIR__. '/vendor/autoload.php';

// use Aws\S3\S3Client;

// // Instantiate an Amazon S3 client.
// $s3 = new S3Client([
//     'version' => 'latest',
//     'region'  => 'us-west-2'
// ]);
// $key="AKIAQPO2V3YOVMK4URPW";
// $secret="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";
// 154.13.51.136:5432:awl6q:l14ouq2i 

// awl6q:l14ouq2i@154.13.51.136:5432

$key="AKIATAWNNWVZ5PYFBPOT";
$secret="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";

$SesClient = new Aws\Ses\SesClient([
    'version' => '2010-12-01',
    'region' => 'us-east-1',
    'credentials' => [
        'key' => $key,
        'secret' => $secret,
    ]
]);






// Max24HourSend => Number of emails you have sent during the past 24 hours
// MaxSendRate => Sending quota for the current 24-hour period
// SentLast24Hours => Maximum send rate
// [data:Aws\Result:private] => Array(
// [Max24HourSend] => 200
// [MaxSendRate] => 1
// [SentLast24Hours] => 0
// $result = $SesClient->getSendQuota([]);

$result = $SesClient->getSendStatistics([]);


print_r( $result );

// echo "test";



        // return $this->authCredentials();
        // $result = $this->sesClient->getSendQuota([ ])->toArray();
        // $result = $this->sesClient->getSendStatistics([])->toArray();//->get("SendDataPoints");
        // return $result ; 
        // $result = $this->sesClient->getSendQuota([ ]);
        // $result = $this->sesClient->getSendStatistics([ ]);
        // return $this->authCredentials();
        // return [ 
        //     "getSendStatistics" => [
        //         'SendDataPoints' => [
        //             [
        //                 'Bounces' => 1,
        //                 'Complaints' => 9,
        //                 'DeliveryAttempts' => 5,
        //                 'Rejects' => 4,
        //                 'Timestamp' => 0 ,
        //             ],
        //             [
        //                 'Bounces' => 4,
        //                 'Complaints' => 9,
        //                 'DeliveryAttempts' => 3,
        //                 'Rejects' => 1,
        //                 'Timestamp' => 0,
        //             ],
        //             [
        //                 'Bounces' => 9,
        //                 'Complaints' => 5,
        //                 'DeliveryAttempts' => 1,
        //                 'Rejects' => 10,
        //                 'Timestamp' => 0,
        //             ],
        //         ],
        //     ],
        //     "getSendQuota" => [
        //         [
        //             'Max24HourSend' => 200,
        //             'MaxSendRate' => 1,
        //             'SentLast24Hours' => 1,
        //         ]
        //     ]
        // ];



        // {
        //     "getSendStatistics": [],
        //     "getSendQuota": {
        //         "Max24HourSend": 216300,
        //         "MaxSendRate": 14,
        //         "SentLast24Hours": 0,
        //         "@metadata": {
        //             "statusCode": 200,
        //             "effectiveUri": "https://email.us-west-2.amazonaws.com",
        //             "headers": {
        //                 "date": "Thu, 08 Dec 2022 10:38:55 GMT",
        //                 "content-type": "text/xml",
        //                 "content-length": "373",
        //                 "connection": "keep-alive",
        //                 "x-amzn-requestid": "7a6a7350-3971-46b6-825c-13161244e837"
        //             },
        //             "transferStats": {
        //                 "http": [
        //                     []
        //                 ]
        //             }
        //         }
        //     }
        // }