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
            $req = "SELECT * FROM favoris WHERE ext_id_user = {$decoded['id_user']} ORDER BY id desc";
      $stmt=$db->query($req);
      $posts=$stmt->fetchAll(PDO::FETCH_ASSOC);

            // Pareil que dans api-favoris-render-2

      $ids = array();
      foreach($posts as $key){
        array_push($ids, $key['ext_id_post']);
      }    // On stocke les id dans une nouvelle variable sous forme de chaîne de caractère "1,2,5,20"..
      $id_posts = join(",",$ids);  
      
            // On récupère les post favoris avec IN 
            
      $req2 = "SELECT * FROM post WHERE id_post IN ($id_posts) ORDER BY id_post desc";
      $stmt2=$db->query($req2);
      $favs=$stmt2->fetchAll(PDO::FETCH_ASSOC);
            echo'{
          "items" :
                ';
          echo json_encode($favs);
          echo'}';
          } else {
            // Send error back to user.
            echo "{'answer' : 'pas ok'}";
          }
        }else{
            echo "{'answer' : 'test'}";
            var_dump($_GET);
        }

     
?>