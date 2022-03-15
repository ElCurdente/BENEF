<?php
         header("Access-Control-Allow-Origin: *"); 
         header('content-type:application/json');      
         header('Access-Control-Allow-Headers: Content-Type'); 
        // var_dump($_POST);
         $uploaddir = '/kunden/homepages/28/d885838215/htdocs/upload/';
         $upload_name = basename($_FILES['file']['tmp_name']) . basename($_FILES['file']['name']);
 $uploadfile = $uploaddir . basename($_FILES['file']['tmp_name']) . basename($_FILES['file']['name']);
//  $uploadfile = '/kunden/homepages/28/d885838215/htdocs/upload/image2.jpeg';
 echo '{"message":';
 if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
     echo '"Le fichier est valide, et a été téléchargé avec succès. Voici plus d\'informations :"';
     echo $_POST['title'];
     $db = new PDO('mysql:host=db5005161444.hosting-data.io;dbname=dbs4318125', 'dbu1522474', 'lesoussol06092021', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $requete = "UPDATE benef_bdd SET bio = :bio, image = :image WHERE id_user = ".$_POST['id_user']."";
    $stmt = $db ->prepare($requete);
    $stmt -> execute(array(
      ":bio" => $_POST['bio'],
      ":image" => 'https://benef-app.fr/upload/'.$upload_name,
    ));
 } else {
     echo '"Attaque potentielle par téléchargement de fichiers. Voici plus d\'informations"';
 }
    

// print_r($_FILES);

echo '}';

        // header("Access-Control-Allow-Origin: *"); 
        // header('content-type:application/json');      
        // header('Access-Control-Allow-Headers: Content-Type');  

        // $uploaddir = '/kunden/homepages/28/d885838215/htdocs/upload/';
        // $upload_name = basename($_FILES['file']['tmp_name']) . basename($_FILES['file']['name']);
        // $uploadfile = $uploaddir . basename($_FILES['file']['tmp_name']) . basename($_FILES['file']['name']);
              
        // $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

        // if ($contentType === "application/json") {
        //   //Receive the RAW post data.
        //   $content = trim(file_get_contents("php://input"));
        //   $decoded = json_decode($content, true);

        //   if(move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile) && is_array($decoded)) {
        //     echo '"Le fichier est valide, et a été téléchargé avec succès. Voici plus d\'informations :"';
        //     echo $_POST['title'];
        //     $db = new PDO('mysql:host=db5005161444.hosting-data.io;dbname=dbs4318125', 'dbu1522474', 'lesoussol06092021', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        //     $requete = "UPDATE benef_bdd SET bio = :bio, image = :image WHERE id_user =".$decoded['id_user']."";
        //     $stmt = $db ->prepare($requete);
        //     $stmt -> execute(array(
        //       ":bio" => $decoded['bio'],
        //       ":image" => 'https://benef-app.fr/upload/'.$upload_name,
        //     ));
        //     echo "{answer : 'Profil changée par {$decoded['bio']}'}";
        //   } else {
        //     // Send error back to user.
        //     echo "{'answer' : 'pas ok'}";
        //   }
        // }else{
        //     echo "{'answer' : 'test'}";
        //     var_dump($_GET);
        // }
        ?>