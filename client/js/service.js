
allCoursesArray = [];
allStudentsArray = [];
curUser = [];
curStudentCourseNumber = [];
curCoursesStudentNumber = [];

function getTemplate(param, where, callback) {

    $.ajax({
        method: "GET",
        url: config.serverUrl + config.templates + param + ".html",

        success: function (response) {
            DOM[where].innerHTML = response;

            if (callback) {
                callback();
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function isLoggedIn() {
    if (router.currentPage !== 'login') {
        $.ajax({
            method: "GET",
            url: config.serverUrl + config.server + config.loginUrl,
            success: function (response) {
                console.log(response);
                router.nav(response.name, response.role_number);
                curRoleNum = response.role_number;
                curUser = response;

            },
            error: function (error) {
                console.log(error);
                router.getLogin();
            }
        });
    }
}

function loginAction(userName, password, callback) {
    $.ajax({
        method: "POST",
        url: config.serverUrl + config.server + config.loginUrl,
        data: { userName, password },
        success: function (response1) {
            console.log(response1);
            callback(response1);
            curUser = response1;
            curRoleNum = response1.role_number;
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function getStudents() {


    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getStudents",
        success: function (response) {
            draw(JSON.parse(response), "Students");
            //console.log(response);
            allStudentsArray = JSON.parse(response);
            console.log(allStudentsArray);
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function getCourses() {
    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getCourses",
        success: function (response) {
            draw(JSON.parse(response), "Courses");
            allCoursesArray = JSON.parse(response);
            console.log(allCoursesArray);
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function getAdmin(roleNum) {
    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getAdmins",
        success: function (response) {
            draw(JSON.parse(response), "Admins", roleNum);
            console.log(JSON.parse(response));
        },
        error: function (error) {
            console.log(error)
        }
    })
}


function getTheCourseDetails(_curId, _curRoleNum) {

    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getCourseDetails",
        data: { curId: _curId },

        success: function (response) {

            getAllStudentsForCourse(_curId);
            getAllStudentsForCourseChecked(_curId);
            draw(JSON.parse(response), "courseDetails", _curRoleNum);

        },
        error: function (error) {
            console.log(error)
        }
    })
}

function getTheStudentDetails(_curId) {

    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getStudentDetails",
        data: { curId: _curId },

        success: function (response) {

            draw(JSON.parse(response), "studentDetails");
            getAllCoursesForStudent(_curId);

        },
        error: function (error) {
            console.log(error)
        }
    })
}

function getTheAdminDetails(_curId) {

    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getTheAdminDetails",
        data: { curId: _curId },

        success: function (response) {
            draw(JSON.parse(response), "adminDetails", curRoleNum);
            console.log(response);
        },
        error: function (error) {
            console.log(error)
        }
    })
}


function getAllCoursesForStudent(_curId) {

    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getAllCoursesForStudent",
        data: { curId: _curId },

        success: function (response) {

            draw(JSON.parse(response), "enroll");
            //console.log(JSON.parse(response));

        },
        error: function (error) {
            console.log(error)
        }
    })
}


function getAllStudentsForCourse(_curId) {

    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getAllStudentsForCourse",
        data: { curId: _curId },

        success: function (response) {

            draw(JSON.parse(response), "studentInCourse");
            console.log(JSON.parse(response));

        },
        error: function (error) {
            console.log(error)
        }
    })
}

function editTheCourseDetails(_curId) {

    console.log(_curId);
    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getCourseDetails",
        data: { curId: _curId },

        success: function (response) {

            draw(JSON.parse(response), "editCourseDetails");
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function editTheStudentDetails(_curId) {

    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getStudentDetails",
        data: { curId: _curId },

        success: function (response) {

            draw(JSON.parse(response), "editStudentDetails");
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function getAllCoursesForStudentChecked(_curId) {

    curStudentCourseNumber = [];
    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getAllCoursesForStudentChecked",
        data: { curId: _curId },

        success: function (response) {

            var ans = (JSON.parse(response));

            for (let index = 0; index < (ans.length); index++) {

                var curNum = ans[index].courseId;
                console.log(curNum);
                curStudentCourseNumber.push(curNum);
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function getAllStudentsForCourseChecked(_curId) {

    curCoursesStudentNumber = [];
    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getAllStudentsForCourseChecked",
        data: { curId: _curId },

        success: function (response) {

            var ans = (JSON.parse(response));

            for (let index = 0; index < (ans.length); index++) {

                var curNum = ans[index].courseId;
                console.log(curNum);
                curCoursesStudentNumber.push(curNum);
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}


function editTheAdminDetails(_curId) {

    console.log(_curId);
    $.ajax({
        method: "GET",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=getTheAdminDetails",
        data: { curId: _curId },

        success: function (response) {

            draw(JSON.parse(response), "editAdminDetails", curRoleNum);
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function updateTheCourseDetails() {

    console.log(curId);
    var curEnrolledStudents = [];
    for (let index = 0; index < allStudentsArray.length; index++) {
        if (document.getElementById('checkBox' + (index + 1)).checked) {
            curEnrolledStudents.push(index + 1);
        }
    }

    var json_arr = JSON.stringify(curEnrolledStudents);
    var cTitle = document.getElementById("courseTitle").value;
    var cDesc = document.getElementById("courseDesc").value;
    var curId = document.getElementById("courseId").value;

    let form = new FormData($("form")[0]);
    form.append("cTitle", cTitle);
    form.append("cDesc", cDesc);
    form.append("curId", curId);
    form.append("curEnrolledStudents", json_arr);

    $.ajax({
        method: "POST",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=updateCourse",
        data: form,
        contentType: false,
        cache: false,
        processData: false,

        success: function (response) {
            alert("course update !");
            getTemplate("home", "main");
            getStudents();
            getCourses();

        },
        error: function (error) {
            console.log(error);
        }
    })
}


function updateTheStudentDetails(curId) {

    var curEnrolledCourse = [];
    for (let index = 0; index < allCoursesArray.length; index++) {
        if (document.getElementById('checkBox' + (index + 1)).checked) {
            curEnrolledCourse.push(index + 1);

        }
    }
    var json_arr = JSON.stringify(curEnrolledCourse);
    var sTitle = document.getElementById("studentTitle").value;
    var sPhone = document.getElementById("studentPhone").value;
    let form = new FormData($("form")[0]);
    form.append("sTitle", sTitle);
    form.append("sPhone", sPhone);
    form.append("curEnrolledCourse", json_arr);

    $.ajax({
        method: "POST",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=updateStudent",
        data: form, curId,
        contentType: false,
        cache: false,
        processData: false,

        success: function (response) {

            alert("Student details update!");
            getTemplate("home", "main");
            getStudents();
            getCourses();
        },
        error: function (error) {
            alert("Student details NOT update!");
            console.log(error);
        }
    })

}

function updateTheAdminDetails(_curId) {

    var aName = document.getElementById("adminName").value;
    var aPhone = document.getElementById("adminPhone").value;
    var aEmail = document.getElementById("adminEmail").value;
    var aRole = document.getElementById("adminRole").value;



    $.ajax({
        method: "POST",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=updateAdmin",
        data: { aName, aPhone, aEmail, aRole, aId: _curId },

        success: function (response) {

            alert("Admin details update!");
            getAdmin();
        },
        error: function (error) {
            console.log(error);
        }
    })
}


function deleteTheCurCourse(_curId) {

    var toDelete = confirm("Do you want to delete this course?");

    if (toDelete) {
        $.ajax({
            method: "POST",
            url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=deleteCourse",
            data: { cId: _curId },

            success: function (response) {

                alert("The course Deleted !");
                getTemplate("home", "main");
                getStudents();
                getCourses();

            },
            error: function (error) {
                console.log(error);
            }
        })
    }
}

function deleteTheCurStudent(_curId) {

    var toDelete = confirm("Do you want to delete this student?");

    if (toDelete) {
        $.ajax({
            method: "POST",
            url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=deleteStudent",
            data: { cId: _curId },

            success: function (response) {

                alert("The student Deleted !");
                getTemplate("home", "main");
                getCourses();
                getStudents();

            },
            error: function (error) {
                console.log(error);
            }
        })
    }
}


function deleteTheCurAdmin(_curId) {

    var toDelete = confirm("Do you want to delete this admin?");

    if (toDelete) {
        $.ajax({
            method: "POST",
            url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=deleteAdmin",
            data: { cId: _curId },

            success: function (response) {

                alert("The Admin Deleted !");
                getAdmin();

            },
            error: function (error) {
                console.log(error);
            }
        })
    }
}

function addNewCourse() {
    var curId = allCoursesArray.length + 1;
    var cTitle = document.getElementById("courseTitle").value;
    var cDesc = document.getElementById("courseDesc").value;

    let form = new FormData($("form")[0]);

    form.append("curId", curId);
    form.append("cTitle", cTitle);
    form.append("cDesc", cDesc);

    $.ajax({
        method: "POST",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=addCourse",
        data: form,
        contentType: false,
        cache: false,
        processData: false,

        success: function (response) {
            alert("New course added !");
            getTemplate("home", "main");
            getStudents();
            getCourses();

        },
        error: function (error) {
            console.log(error);
        }
    })
}

function addNewStudent() {
    var curId = allStudentsArray.length + 1;
    var sTitle = document.getElementById("studentTitle").value;
    var sPhone = document.getElementById("studentPhone").value;
    var sEmail = document.getElementById("studentEmail").value;

    let form = new FormData($("form")[0]);

    form.append("sTitle", sTitle);
    form.append("sPhone", sPhone);
    form.append("sEmail", sEmail);
    form.append("curId", curId);

    $.ajax({
        method: "POST",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=addStudent",
        data: form,
        contentType: false,
        cache: false,
        processData: false,


        success: function (response) {
            alert("New Student added !");
            getStudents();

        },

        error: function (error) {
            console.log(error);
        }
    })
}

function addNewAdmin() {

    var aName = document.getElementById("adminTitle").value;
    var aPhone = document.getElementById("adminPhone").value;
    //var aImg = document.getElementById("studentImg").value;
    var aEmail = document.getElementById("adminEmail").value;
    var aRole = document.getElementById("adminRole").value;

    $.ajax({
        method: "POST",
        url: " http://localhost/PROJECT2.1/server/index.php?controller=data&action=addAdmin",
        data: { aName, aPhone, aEmail, aRole },

        success: function (response) {
            alert("New Admin added !");
            getAdmin();

        },
        error: function (error) {
            console.log(error);
        }
    })
}





