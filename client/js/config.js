var curRoleNum;


//Define configuration
var config = function () {

    return {
        serverUrl: "http://localhost/PROJECT2.1/",
        templates: "templates/",
        loginUrl: "login/login.php",
        server: "server/",
        indexPhp: "index.php"

    }
}();



//Define DOM
var DOM = function () {

    return {
        main: document.getElementById("main"),
        students: document.getElementById("allStudents"),
        courses: document.getElementById("allCourses"),
        container: document.getElementById("mainContainer"),
        header: document.getElementById("header1"),
        searchValue: {}
    }
}();

//Router
var router = {};
router.currentPage = '';

router.home = function (role_num) {
    var obj1 = {};
    curRoleNum = role_num;
    this.currentPage = 'home';
    getTemplate("home", "main");
    getCourses();
    getStudents();


}

router.nav = function (userFullName, userRole) {
    this.currentPage = 'nav';
    var curRole;


    this.setUserFullName = function () {

        let _userFullName = userFullName;

        if (_userFullName) {

            switch (userRole) {

                case "1200":
                    curRole = "Owner"
                    break;

                case "1205":
                    curRole = "Manager"
                    break;

                case "1210":
                    curRole = "Sales"
                    break;
            }

            document.getElementById("userFullName").innerText = _userFullName + ",  " + curRole;
        }
    };

    getTemplate("clear", "main");
    getTemplate("nav" + userRole, "header", this.setUserFullName);
}

router.getLogin = function () {

    this.currentPage = 'login';
    getTemplate("login", "main");
}

router.adminPage = function (role_num) {
    this.currentPage = 'adminPage';

    getTemplate("clear", "main");
    getTemplate("admin", "main");
    getAdmin(role_num);

}










