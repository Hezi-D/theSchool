<?php
//$controller = somthing and $action = somthing
$controllers = array("data" => [
    "getStudents", "getCourses", "getAdmins",
    "getCourseDetails", "getStudentDetails", "getTheAdminDetails",
    "getAllCoursesForStudent", "getAllStudentsForCourse",
    "getAllCoursesForStudentChecked", "getAllStudentsForCourseChecked",
    "addCourse", "addAdmin", "addStudent",
    "updateCourse", "updateStudent", "updateAdmin",
    "updateStudentImage",
    "deleteCourse", "deleteStudent", "deleteAdmin"
]);

if (array_key_exists($controller, $controllers)) { //do we have such controller
    if (in_array($action, $controllers[$controller])) { //do we have such action
        navigate($controller, $action);
    }
} else {
   // navigate("products", "products");
}

function navigate($controllerName, $action)
{

    require_once("./controllers/" . $controllerName . "Controller.php");
    $controllerName = $controllerName . "Controller";
    $controller = new $controllerName();

    $controller->{$action}();

}


?>