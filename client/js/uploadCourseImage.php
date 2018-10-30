<?php

echo $_POST['curId'];
echo "start";
if (!empty($_FILES['file']['name'])) {
    $fileName = $_POST['curId'];
    $sourcePath = $_FILES['file']['tmp_name'];
    $targetPath = 'C:\xampp\htdocs\PROJECT2.1\client\js\coursesImg/' . $fileName . "/" . $fileName . ".jpg";

    $folderPath = 'C:\xampp\htdocs\PROJECT2.1\client\js\coursesImg/';

    //create folder if it dosent exist
    if (!file_exists($folderPath . $fileName)) {
        mkdir($folderPath . $fileName, 0777, true);
    }

    //Clear the folder from any files    
    $files = glob($folderPath . $fileName . '/*'); // get all file names
    foreach ($files as $file) { // iterate files
        if (is_file($file))
            unlink($file); // delete file
    }

    //Create a new image in this directory
    if (move_uploaded_file($sourcePath, $targetPath)) {
        echo " file saved, file name : " . $fileName;
    } else echo " file was not saved ";


    //updateStudentImage($targetPath, $fileName);
    // ../client/js/studentImg/
    //checking if file exsists
    // if (file_exists($targetPath)) {
    //     unlink($targetPath);
    // }


    // if (move_uploaded_file($sourcePath, $targetPath)) {
    //     echo " file saved, file name : " . $fileName;
    // } else echo " file was not saved ";


}

?> 