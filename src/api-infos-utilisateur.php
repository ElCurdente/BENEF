<?php
header("Access-Control-Allow-Origin: *"); 
header('content-type:application/json');      
header('Access-Control-Allow-Headers: Content-Type');  
      
      $db = new PDO('mysql:host=db5005161444.hosting-data.io;dbname=dbs4318125', 'dbu1522474', 'lesoussol06092021', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
      $req = "SELECT * FROM benef_bdd WHERE id = :id";
      $stmt=$db->query($req);
      $result=$stmt->fetchAll(PDO::FETCH_ASSOC);
  echo'{
          "username" : '.$result["username"].',
          "email" : '.$result["email"].',
          "birth" : '.$result["birth"].',
          "postal" : '.$result["postal"].',
';
          echo json_encode($result);
          echo'}'
?>