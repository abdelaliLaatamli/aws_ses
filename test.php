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
$key="AKIAQPO2V3YOVMK4URPW";
$secret="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";
// 154.13.51.136:5432:awl6q:l14ouq2i 

// awl6q:l14ouq2i@154.13.51.136:5432

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

{/* <div className="row">
                            <div className="col-md-6">
                                <p> data For Sheet {key}</p>
                                <p> Bounces : {quete.Bounces}</p>
                                <p> Complaints :  {quete.Complaints}</p>
                                <p> DeliveryAttempts : {quete.DeliveryAttempts}</p>
                                <p> Rejects : {quete.Rejects}</p>
                                <p> Timestamp : {quete.Timestamp}</p>
                            </div>
                            <div className="col-md-6">
                                {/* <canvas id="myChart" style={{ width:'600px', maxWidth : '600px' }}></canvas> 
                            </div>
                            </div>
                             */}