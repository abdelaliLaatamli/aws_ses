<?php 


// $routes = $_SERVER["PATH_INFO"];


function uri() {
    $uri = $_SERVER["REQUEST_URI"] ;
    $uri = trim($uri,"/") ;
    $explodedUri = explode("?",$uri);
    return $explodedUri[0] ;
}

define( "__PWDROOT__" , $_SERVER["DOCUMENT_ROOT"] );

$configurations = require __PWDROOT__."/bootstrap/db_conf.inc.php";

switch( uri() ) {
    case '' : 
        require __PWDROOT__."/views/home.inc.php" ;
        break;
    
    case 'accounts': 
        include __PWDROOT__."/views/accouts.inc.php" ;
        break;

    case 'backend':
        include __PWDROOT__."/controllers/endpoint.inc.php";
        break;

    default:
        include __PWDROOT__."/views/error.inc.php" ;
        break;
}
