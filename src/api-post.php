<?php
  
         header("Access-Control-Allow-Origin: *"); 
         header('content-type:application/json');      
         header('Access-Control-Allow-Headers: Content-Type'); 
        
         $uploaddir = '/kunden/homepages/28/d885838215/htdocs/upload/';
         var_dump($_FILES);
 $uploadfile = $uploaddir . basename($_FILES['file']['tmp_name']);
 $uploadfile = '/kunden/homepages/28/d885838215/htdocs/upload/image.jpeg';
 echo '{"message":';
 if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
     echo '"Le fichier est valide, et a été téléchargé avec succès. Voici plus d\'informations"';
 } else {
     echo '"Attaque potentielle par téléchargement de fichiers. Voici plus d\'informations"';
      // header("HTTP/1.1 404 Not Found");
 }
    

// print_r($_FILES);

echo '}';

        /*

        function blob_to_string($bin){
          $char = explode(' ', $bin);
          $userStr = '';
          foreach($char as $ch) 
          $userStr .= chr(bindec($ch));
          return $userStr;
        }
              
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

        if ($contentType === "application/json") {
          
          //Receive the RAW post data.
          $content = trim(file_get_contents("php://input"));
        
          // $decoded = json_decode($content, true);


        //   If json_decode failed, the JSON is invalid.
          if(is_array($decoded)) {
            // foreach ($decoded as $v) {
            //     echo "Valeur courante : $v.\n";
            // }
            // echo $decoded["username"];
            $db = new PDO('mysql:host=db5005161444.hosting-data.io;dbname=dbs4318125', 'dbu1522474', 'lesoussol06092021', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            $requete = "INSERT INTO post (image, title, description, address, postal, expiration, category) VALUES (:image, :title, :description, :address, :postal, :expiration, :category)";
            $stmt = $db ->prepare($requete);
            $stmt -> execute(array(
              ":image" => blob_to_string($decoded['image']),
              ":title" => $decoded['title'],
              ":description" => $decoded['desc'],
              ":address" => $decoded['address'],
              ":postal" => $decoded['postal'],
              ":expiration" => $decoded['expiration'],
              ":category" => $decoded['category'],

            ));

          } else {
            // Send error back to user.
            echo "{answer:'pas ok'}";
          }
        }else{
            // echo "{'answer' : ".$decoded['image']."}";
            echo '{"answer":"ok"}';
        }
        */
        ?>