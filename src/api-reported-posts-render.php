<?php

header("Access-Control-Allow-Origin: *"); 
header('content-type:application/json');      
header('Access-Control-Allow-Headers: Content-Type');  
      
            $db = new PDO('mysql:host=db5005161444.hosting-data.io;dbname=dbs4318125', 'dbu1522474', 'lesoussol06092021', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            $req = "SELECT * FROM reported_posts ORDER BY id desc";
      $stmt=$db->query($req);
      $posts=$stmt->fetchAll(PDO::FETCH_ASSOC);
      $ids = array();
      foreach($posts as $key){
        array_push($ids, $key['ext_id_post']);
      }   
      $id_posts = join(",",$ids);   
      $req2 = "SELECT * FROM post WHERE id_post IN ($id_posts) ORDER BY id_post desc";
      $stmt2=$db->query($req2);
      $favs=$stmt2->fetchAll(PDO::FETCH_ASSOC);
            echo'{
          "items" :
                ';
          echo json_encode($favs);
          echo'}';
        
?>