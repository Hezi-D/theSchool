<?php
require_once("model.php");

class DataModel extends Model
{

    public function get_all_students()
    {
        $data = $this->dbc->Select("SELECT * FROM student");
        return $data;
    }

    public function get_all_courses()
    {
        $data = $this->dbc->Select("SELECT * FROM course");
        return $data;
    }

    public function get_all_admins()
    {
        $data = $this->dbc->Select("SELECT * from project2.administrator as admin
        JOIN project2.role as role on  admin.role_number = role.idRole");
        return $data;
    }

    public function get_single_course($_curId)
    {
        $data = $this->dbc->Select("SELECT * FROM course WHERE id=$_curId");
        return $data;
    }

    public function get_single_student($_curId)
    {
        $data = $this->dbc->Select("SELECT * FROM student WHERE id = $_curId ");
        return $data;
    }

    public function get_single_admin($_curId)
    {
        $data = $this->dbc->Select("SELECT * from project2.administrator as admin
        JOIN project2.role as role on  admin.role_number = role.idRole WHERE id = $_curId ");
        return $data;
    }

    public function get_all_courses_for_student($_curId)
    {
        $data = $this->dbc->Select("SELECT name,image FROM project2.coursesstudent as cur
        JOIN project2.course ON course.id =  cur.courseId
        WHERE studentId = $_curId ");
        return $data;
    }

    public function get_All_Courses_For_Student_Checked($_curId)
    {

        $data = $this->dbc->Select("SELECT courseId FROM project2.coursesstudent WHERE studentId =$_curId");
        return $data;
    }


    public function get_All_Students_For_Course_Checked($_curId)
    {

        $data = $this->dbc->Select("SELECT studentId FROM project2.coursesstudent WHERE courseId =$_curId");
        return $data;
    }


    public function get_all_students_for_course($_curId)
    {
        $data = $this->dbc->Select("SELECT name FROM project2.coursesstudent as cur
        JOIN project2.student ON student.id =  cur.studentId
        WHERE courseId = $_curId");
        return $data;

    }

    public function save_course($_name, $_desc, $_id)
    {
        $_img = "http://localhost/PROJECT2.1/client/js/coursesImg/" . $_id . "/" . $_id . ".jpg";
        $q = "INSERT INTO project2.course (id, name, description, image) VALUES (?,?, ?,?)";
        $stmt = $this->dbc->Prepare($q);
        $stmt->bind_param("isss", $_id, $_name, $_desc, $_img);
        $stmt->execute();
        return $stmt->insert_id;

    }

    public function save_student($_name, $_phone, $_email, $_id)
    {
        $_img = "http://localhost/PROJECT2.1/client/js/studentImg/" . $_id . "/" . $_id . ".jpg";
        $q = "INSERT INTO project2.student (name, phone, image, email,id) VALUES (?, ?,?,?,?)";
        $stmt = $this->dbc->Prepare($q);
        $stmt->bind_param("sissi", $_name, $_phone, $_img, $_email, $_id);
        $stmt->execute();
        return $stmt->insert_id;

    }

    public function save_admin($_name, $_phone, $_email, $_role)
    {
        $q = "INSERT INTO project2.administrator (name, phone, email,role_number) VALUES (?,?,?,?)";
        $stmt = $this->dbc->Prepare($q);
        $stmt->bind_param("sssi", $_name, $_phone, $_email, $_role);
        $stmt->execute();
        return $stmt->insert_id;

    }


    public function update_the_course($_name, $_desc, $_id, $_curEnrolledStudents)
    {
        $_image = "http://localhost/PROJECT2.1/client/js/coursesImg/" . $_id . "/" . $_id . ".jpg";
        $q = "UPDATE project2.course SET name='$_name',description =  '$_desc' , image = '$_image'  WHERE id = $_id";
            // UPDATE project2.course SET name='avi2', description = 'vi', image = 'sdasd'  WHERE id = 3
        $stmt = $this->dbc->Prepare($q);
        $stmt->execute();

        $this->dbc->Delete("DELETE FROM project2.coursesstudent WHERE courseId = $_id");
        $arr = json_decode($_curEnrolledStudents);

        if ($arr != null) {
            $arr_length = sizeof($arr);
            for ($i = 0; $i < $arr_length; $i++) {
                $q3 = "INSERT INTO project2.coursesstudent (studentId,courseId) VALUES ($arr[$i],$_id)";

                $stmt = $this->dbc->Prepare($q3);
                $stmt->execute();
            };
        }
        $te = true;
        //if ($stmt->affected_rows > 0) {

        if ($te) {
            return true;
        } else {
            return false;
        }

    }

    public function update_the_student($_name, $_phone, $_id, $_curEnrolledCourse)
    {
        $_image = "http://localhost/PROJECT2.1/client/js/studentImg/" . $_id . "/" . $_id . ".jpg";


        $q = "UPDATE project2.student SET name='$_name', phone = '$_phone' , image='$_image'  WHERE id = $_id";
        $stmt = $this->dbc->Prepare($q);
        $stmt->execute();

        $this->dbc->Delete("DELETE FROM project2.coursesstudent WHERE studentId = $_id");
        $arr = json_decode($_curEnrolledCourse);

        echo $_curEnrolledCourse[1];
        if ($_curEnrolledCourse != null) {
            $arr_length = sizeof($arr);
            for ($i = 0; $i < $arr_length; $i++) {
                $q3 = "INSERT INTO `project2`.`coursesstudent` (`studentId`, `courseId`) VALUES ($_id, $arr[$i])";

                $stmt2 = $this->dbc->Prepare($q3);
                $stmt2->execute();
            };
        }


        if ($stmt) {
            return true;
        } else {
            return false;
        }
    }

    public function update_the_admin($_name, $_phone, $_email, $_role, $_id)
    {
        $q = "UPDATE project2.administrator SET name='$_name', phone = '$_phone', email='$_email', role_number=$_role  WHERE id = $_id ";
        $stmt = $this->dbc->Prepare($q);
        
        //$stmt->bind_param("sssi", $_name, $_desc, $_img, $_id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            return true;
        } else {
            return false;
        }

    }


    public function delete_cur_course($_id)
    {
        $q = "DELETE FROM project2.course WHERE id = $_id ";
        $data = $this->dbc->Prepare($q);
        $data->execute();

        if ($data->affected_rows > 0) {
            return true;
        } else {
            return false;

        }
    }


    public function delete_cur_student($_id)
    {
        $q = "DELETE FROM project2.student WHERE id = $_id ";
        $data = $this->dbc->Prepare($q);
        $data->execute();

        if ($data->affected_rows > 0) {
            return true;
        } else {
            return false;

        }
    }

    public function delete_cur_admin($_id)
    {
        $q = "DELETE FROM project2.administrator WHERE id = $_id ";
        $data = $this->dbc->Prepare($q);
        $data->execute();

        if ($data->affected_rows > 0) {
            return true;
        } else {
            return false;

        }
    }

    // public function get_all_products()
    // {
    //     $data = $this->dbc->Select("SELECT * FROM products");
    //     return $data;
    // }

    // public function get_all_categories()
    // {
    //     $data = $this->dbc->Select("SELECT products.category FROM products");
    //     return $data;
    // }

    // public function delete_product($_id)
    // {

    //     $q = "DELETE FROM test_store.products 
    //     WHERE id = $_id ";
    //     $data = $this->dbc->Prepare($q);
    //     $data->execute();

    //     if ($data->affected_rows > 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }


    //------------------------------------------------------------------------------------------------------


    // public function getComments($countryId) {
    //         return $this->dbc->Select(" SELECT * FROM comments  WHERE countryCode = '$countryId' ");
    // }

    // public function deleteComment($country, $userName, $comment){
    //     //validate post delete id is exist isset....
    //     $q = "DELETE FROM countries.comments 
    //     WHERE userName = '$userName' AND countryCode = '$country' AND comment = '$comment'";
    //     $data = $this->dbc->Prepare($q);
    //     $data->execute();

    //     if($data->affected_rows > 0 ){
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
}


?>