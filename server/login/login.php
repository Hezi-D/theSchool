
<?php

header("Content-Type:application/json");
require_once("../db/dbc.php");
$db = DatabaseConnection::getSingleTonInstance();

//Check if the user already conected:
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    session_start();
    if (isset($_SESSION["user"])) {
        echo json_encode($_SESSION["user"]);

    } else {
        http_response_code(401);
        echo "UnAuthorized";
    }
    //If the user try to conect via the login page, check the name and the password:
} else {
    if (isset($_POST["userName"]) && isset($_POST["password"])) {
        $userName = $_POST["userName"];
        $password = $_POST["password"];

        //$_SESSION["user1"] = $_POST["userName"];
        $q = "SELECT * FROM administrator where name = '$userName' AND password = '$password'";
        $res = $db->Select($q);

        if (count($res) > 0) {
            session_start();
            $_SESSION["user"] = $res[0];
            echo json_encode($res[0]);
        } else {
            http_response_code(501);
            echo "User not found";
        }
    }
}


?>