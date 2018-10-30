<?php

require_once("./models/dataModel.php");


class DataController
{

    public $model;

    public function __construct()
    {
        $this->model = new dataModel();

    }


    public function getStudents()
    {

        $data = $this->model->get_all_students();

        echo json_encode($data);

    }


    public function getCourses()
    {

        $data = $this->model->get_all_courses();

        echo json_encode($data);

    }



    public function getAdmins()
    {

        $data = $this->model->get_all_admins();

        echo json_encode($data);

    }


    public function getCourseDetails()
    {

        $data = $this->model->get_single_course($_GET['curId']);

        echo json_encode($data);

    }

    public function getStudentDetails()
    {

        $data = $this->model->get_single_student($_GET['curId']);

        echo json_encode($data);

    }

    public function getTheAdminDetails()
    {

        $data = $this->model->get_single_admin($_GET['curId']);

        echo json_encode($data);

    }

    public function getAllCoursesForStudent()
    {

        $data = $this->model->get_all_courses_for_student($_GET['curId']);

        echo json_encode($data);

    }

    public function getAllStudentsForCourse()
    {
        $data = $this->model->get_all_students_for_course($_GET['curId']);

        echo json_encode($data);
    }

    public function addCourse()
    {
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
        }

        $data = $this->model->save_course($_POST['cTitle'], $_POST['cDesc'], $_POST['curId']);
        if ($data != 0) {
            echo "course added";
        } else {
            echo "error";
        }
    }

    public function addStudent()
    {

        if (!empty($_FILES['file']['name'])) {
            $fileName = $_POST['curId'];
            $sourcePath = $_FILES['file']['tmp_name'];
            $targetPath = 'C:\xampp\htdocs\PROJECT2.1\client\js\studentImg/' . $fileName . "/" . $fileName . ".jpg";

            $folderPath = 'C:\xampp\htdocs\PROJECT2.1\client\js\studentImg/';
            
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
        }


        $data = $this->model->save_student($_POST['sTitle'], $_POST['sPhone'], $_POST['sEmail'], $_POST['curId']);
        if ($data != 0) {
            echo "student added";
        } else {
            echo "error";
        }
    }

    public function addAdmin()
    {

        $data = $this->model->save_admin($_POST['aName'], $_POST['aPhone'], $_POST['aEmail'], $_POST['aRole']);
        if ($data != 0) {
            echo "admin added";
        } else {
            echo "error";
        }
    }


    public function updateCourse()
    {

        if (!empty($_FILES['file']['name'])) {
            $fileName = $_POST['curId'];
            $sourcePath = $_FILES['file']['tmp_name'];

            $targetPath = 'C:\xampp\htdocs\PROJECT2.1\client\js\coursesImg/' . $fileName . '/' . $fileName . '.jpg';
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
        }

        $data = $this->model->update_the_course($_POST['cTitle'], $_POST['cDesc'], $_POST["curId"], $_POST["curEnrolledStudents"]);
        if ($data) {
            echo "course update";
        } else {
            echo "error";
        }
    }

    public function updateStudent()
    {

        if (!empty($_FILES['file']['name'])) {
            $fileName = $_POST['curId'];
            $sourcePath = $_FILES['file']['tmp_name'];


            $targetPath = 'C:\xampp\htdocs\PROJECT2.1\client\js\studentImg/' . $fileName . '/' . $fileName . '.jpg';

            $folderPath = 'C:\xampp\htdocs\PROJECT2.1\client\js\studentImg/';

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
        }

        $data = $this->model->update_the_student($_POST['sTitle'], $_POST['sPhone'], $_POST["curId"], $_POST["curEnrolledCourse"]);

        if ($data) {
            echo "student update";
        } else {
            echo "error";
        }


    }

    public function updateAdmin()
    {
        $data = $this->model->update_the_admin($_POST['aName'], $_POST['aPhone'], $_POST['aEmail'], $_POST['aRole'], $_POST['aId']);
        if ($data) {
            echo "admin update";
        } else {
            echo "error";
        }
    }

    public function deleteCourse()
    {
        $data = $this->model->delete_cur_course($_POST['cId']);
        if ($data) {
            echo "course delete";
        } else {
            echo "error";
        }
    }

    public function deleteStudent()
    {
        $data = $this->model->delete_cur_student($_POST['cId']);
        if ($data) {
            echo "student delete";
        } else {
            echo "error";
        }
    }

    public function deleteAdmin()
    {
        $data = $this->model->delete_cur_admin($_POST['cId']);
        if ($data) {
            echo "student delete";
        } else {
            echo "error";
        }
    }

    public function getAllCoursesForStudentChecked()
    {

        $data = $this->model->get_All_Courses_For_Student_Checked($_GET['curId']);
        if ($data) {
            echo json_encode($data);
        } else {
            echo "error";
        }
    }

    public function getAllStudentsForCourseChecked()
    {
        $data = $this->model->get_All_Students_For_Course_Checked($_GET['curId']);
        if ($data) {
            echo json_encode($data);
        } else {
            echo "error";
        }


    }


}


?> 