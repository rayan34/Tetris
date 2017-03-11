<?php

class Conf {
    
    private static $database = array(
        'hostname' => 'infolimon',
        'database' => 'blascoh',
        'login'    => 'blascoh',
        'password' => 'snoopy'
    );

    static public function getLogin() {
        return self::$database['login'];
    }

    static public function getHostname() {
        return self::$database['hostname'];
    }

    static public function getDatabase() {
        return self::$database['database'];
    }

    static public function getPassword() {
        return self::$database['password'];
    }

}

class Model {

    public static $pdo;

    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            // connexion à la base de données            
            // le dernier argument sert à ce que toutes les chaines de charactères 
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    public static function selectHighScore() {
        try {
            // préparation de la requête
            $sql = "SELECT * FROM score WHERE score = (SELECT MAX(score) from score);"; 
            $req = self::$pdo->prepare($sql);
            // exécution de la requête préparée
            $req->execute();
            $req->setFetchMode(PDO::FETCH_OBJ);
            $tabResults = $req->fetchAll();
            // renvoi du tableau de résultats
            return $tabResults;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

}

// on initialise la connexion $pdo
Model::init_pdo();

// on lance la fonction selectByName avec le nom obtenu
$res = Model::selectHighScore();

//on affiche le résultat avec une fonction plus lisible par js
//echo json_encode($res);
