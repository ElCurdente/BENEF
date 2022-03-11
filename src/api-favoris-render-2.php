<?php

header("Access-Control-Allow-Origin: *"); 
header('content-type:application/json');      
header('Access-Control-Allow-Headers: Content-Type');  
      
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

        if ($contentType === "application/json") {
          //Receive the RAW post data.
          $content = trim(file_get_contents("php://input"));
        
          $decoded = json_decode($content, true);
        //   If json_decode failed, the JSON is invalid.
          if(is_array($decoded)) {
           
            $db = new PDO('mysql:host=db5005161444.hosting-data.io;dbname=dbs4318125', 'dbu1522474', 'lesoussol06092021', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            $req = "SELECT ext_id_post FROM favoris WHERE ext_id_user = {$decoded['id_user']} ORDER BY id desc";
      $stmt=$db->query($req);
      $favs=$stmt->fetchAll(PDO::FETCH_ASSOC);
      $ids = array();
      foreach($favs as $key){
        array_push($ids, $key['ext_id_post']);
      }   
    //   echo'{
    //       "items" :
    //             ';
          echo json_encode($ids);
        //   echo'}';
          } else {
            // Send error back to user.
            echo "{'answer' : 'pas ok'}";
          }
        }else{
            echo "{'answer' : 'test'}";
            var_dump($_GET);
        }

     
?>