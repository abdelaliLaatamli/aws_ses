<?php 


// $routes = $_SERVER["PATH_INFO"];


function uri(){
    $uri = $_SERVER["REQUEST_URI"] ;
    $uri = trim( $uri , "/" ) ;
    $explodedUri = explode( "?" , $uri );
    return $explodedUri[0] ;
}

// var_dump( [ $routes , $_SERVER["REQUEST_URI"] ,  uri() ] ) ;

// die();
switch( uri() ) {
    case '' : 
        require __DIR__."/../views/home.inc.php" ;
        break;
    
    case 'accounts': 
        include __DIR__."/../views/accouts.inc.php" ;
        break;

    case 'backend':
        include __DIR__."/../controllers/endpoint.inc.php";
        break;

    default:
        include __DIR__."/../views/error.inc.php" ;
        break;
}
