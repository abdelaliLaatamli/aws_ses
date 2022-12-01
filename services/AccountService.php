<?php 


class AccountService {

    private $dbConnection;


    public function __construct( $db_config )
    {
        $this->connectDB( $db_config );
    }

    private function connectDB( $db_config ){

        try {
            $connection = new PDO("mysql:host={$db_config['db_host']};dbname={$db_config['db_name']}", $db_config["db_user"] ,$db_config["db_pswd"] );
            // set the PDO error mode to exception
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $this->dbConnection = $connection ;

          } catch(PDOException $e) {
                throw new Exception("can't connect to mysql ,  " . "Connection failed: " . $e->getMessage() );
          }
    }


    public function getAllAccounts(){


        $statement = $this->dbConnection->prepare("
            SELECT 
                id , name , access_key , secret_key , proxy 
            FROM 
                accounts 
            WHERE 
            status = 1 "
        );
        $statement->execute();
      
        // set the resulting array to associative
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        return $statement->fetchAll();
    }


    public function getAccount( $accountId ){
        $statement = $this->dbConnection->prepare("
            SELECT 
                id , name , access_key , secret_key , proxy 
            FROM 
                accounts 
            WHERE 
            id = ? and status = 1 "
        );
        $statement->execute([ $accountId ]);
    
        // set the resulting array to associative
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        return $statement->fetch();
    }

    public function addAccount( $account_name , $access_key , $secret_key , $proxy ){

        $statement = $this->dbConnection->prepare("
            INSERT INTO `accounts` (`name`, `access_key`, `secret_key`, `proxy`, `created_at`)
            VALUES ($account_name, $access_key, $secret_key, $proxy, now());
        ");
        return $statement->execute();
    }


    public function updateAccount( $account_id , $account_name , $access_key , $secret_key , $proxy ){

        $statement = $this->dbConnection->prepare("
            UPDATE accounts SET
                name = $account_name , access_key = $access_key,
                secret_key = $secret_key , proxy = $proxy 
            WHERE id = ? ;
        ");
        return $statement->execute([ $account_id ]);
    }

    public function deleteAccount( $accountId ) {

        $statement = $this->dbConnection->prepare("
            UPDATE `accounts` SET
                `status` = 0
            WHERE `id` = ? ;
        ");
        return $statement->execute([ $accountId ]);

    }


}