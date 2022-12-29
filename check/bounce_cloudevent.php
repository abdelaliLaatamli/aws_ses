<?php 

// require __DIR__ ."/bootstrap/bootstrap.inc.php";



// echo json_encode( $data );


// require '/path/to/vendor/autoload.php';
require __DIR__. './../vendor/autoload.php';


$key="AKIAUKYLDSYEP2HS53YR";
$secret="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";
$proxy = "vwc6y:mouazpwi@31.204.31.241:5432";

// use Aws\CloudWatch\CloudWatchClient; 
// use Aws\Organizations\OrganizationsClient;
use Aws\AuditManager\AuditManagerClient;
use Aws\Exception\AwsException;
use Aws\Credentials\Credentials;


$credentials  = new Credentials( $key , $secret );

$authFactory = [
    'region'      => 'us-west-2',
    'version'     => '2017-07-25',
    'credentials' => $credentials ,
    "http"        => [ 'proxy' => $proxy ]
];


$client = new AuditManagerClient( $authFactory );
// https://docs.aws.amazon.com/aws-sdk-php/v3/api/api-auditmanager-2017-07-25.html#getaccountstatus
try {
    // $result = $cloudWatchClient->listMetrics();

        // $result = $cloudWatchClient->getMetricStatistics([
        //     'Namespace'  =>  "AWS/SES",
        //     'MetricName' => "Reputation.ComplaintRate",
        //     'EndTime'    => "2022/12/22",
        //     'StartTime'  => "2022/12/15",
        //     'Period'     => 3600,
        //     'Statistics' => array('Average'),
        //     // 'Dimensions' => $dimensions
        // ]);
        // echo '-----------------3';
    // file_put_contents( "aav.json" , json_encode( $result->toArray() ) );
    $result = $client->GetAccountStatus([ ]);
    var_dump( $result->toArray()["status"] );
    // echo '-----------------4';
    echo 'fin';
} catch (Exception $e) {
    // echo '-----------------5';
    echo 'Error: ' . $e->getAwsErrorMessage();
    // echo '-----------------6';
}
