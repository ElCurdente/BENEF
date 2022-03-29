<?php
        header("Access-Control-Allow-Origin: *"); 
        header('content-type:application/json');      
        header('Access-Control-Allow-Headers: Content-Type');  

        
              
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

        // Reçois le contenu, si c'est en JSON, on décode le JSON qu'on insère dans une variable. 

        if ($contentType === "application/json") {
          //Receive the RAW post data.
          $content = trim(file_get_contents("php://input"));
        
          $decoded = json_decode($content, true);
        //   If json_decode failed, the JSON is invalid.
          if(is_array($decoded)) {
            // foreach ($decoded as $v) {
            //     echo "Valeur courante : $v.\n";
            // }

            //Connexion BDD
            
            $db = new PDO('mysql:host=db5005161444.hosting-data.io;dbname=dbs4318125', 'dbu1522474', 'lesoussol06092021', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            $req = "SELECT * FROM benef_bdd WHERE username='{$decoded['username']}'";
            $stmt=$db->query($req);

            if($stmt->rowcount()==1){

                $result=$stmt->fetch(PDO::FETCH_ASSOC);
                if(password_verify($decoded["mdp"], $result["mdp"])){

                    $encoded = json_encode($result);

                  // On renvoie en JSON les informations du compte si le nom d'utilisateur et le mot de passe correspond.

                    echo($encoded);
                    
                } else{
                   echo('Mdp pas bon');
                }
             }else{
              echo "{'answer' : 'Cet utilisateur a des doublons'}";
             }

          } else {
            // Send error back to user.
            echo "{'answer' : 'pas ok'}";
          }
        }else{
            echo "{'answer' : 'test'}";
            var_dump($_GET);
        }
        ?>
