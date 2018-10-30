
function login(e) {
    e.preventDefault();

    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;

    loginAction(userName, password, function (response) {

        router.nav();
        router.nav(response.name, response.role_number);
        console.log(response.name + " " + response.role_number);

    });
}

function StudentCard(singleStudent) {

    var temp = document.getElementById("studentCardTemplate");
    var card = temp.cloneNode(true);

    card.id = singleStudent.id;
    card.style.display = "inline-block";
    card.querySelector("#img").src = singleStudent.image;
    card.querySelector("#phone").innerHTML = singleStudent.phone;
    card.querySelector("#name").innerHTML = singleStudent.name;




    card.addEventListener("click", function () {
        //console.log(this.id);
        getTheStudentDetails(this.id);
        //getAllCoursesForStudent(this.id);
    })
    return card;
}

function StudentDetailsCard(singleStudent) {

    var temp = document.getElementById("studentDetailsCardTemplate");
    var card = temp.cloneNode(true);

    card.id = singleStudent.id;
    card.style.display = "inline-block";
    card.querySelector("#img1").src = singleStudent.image;
    card.querySelector("#phone1").innerHTML = singleStudent.phone;
    card.querySelector("#name1").innerHTML = singleStudent.name;
    card.querySelector("#email1").innerHTML = singleStudent.email;


    card.querySelector("#editBtn").addEventListener("click", function () {

        getAllCoursesForStudentChecked(card.id);
        editTheStudentDetails(card.id);

    })

    return card;
}

function CourseCard(singleCourse) {

    var temp = document.getElementById("courseCardTemplate");
    var card = temp.cloneNode(true);

    card.id = singleCourse.id;
    card.style.display = "inline-block";
    card.querySelector("#img").src = singleCourse.image;
    card.querySelector("#name").innerHTML = singleCourse.name;


    card.addEventListener("click", function () {
        console.log(this.id);
        getTheCourseDetails(this.id, curRoleNum);


    })
    return card;
}

function AdminCard(singleAdmin) {

    var temp = document.getElementById("adminCardTemplate");
    var card = temp.cloneNode(true);

    card.id = singleAdmin.id;
    card.style.display = "inline-block";
    //card.querySelector("#img").src = singleStudent.image;
    card.querySelector("#role").innerHTML = singleAdmin.role;
    card.querySelector("#name").innerHTML = singleAdmin.name;
    card.querySelector("#email").innerHTML = singleAdmin.email;

    card.addEventListener("click", function () {

        getTheAdminDetails(this.id);
    })
    return card;
}

var numOfStudentInCourse;

//Draw the home page (student & courses..)
function draw(obj, typeToDraw, curRoleNum) {

    switch (typeToDraw) {

        case "Students":
            // var mainContainer = document.getElementById("mainContainer");
            //mainContainer.innerHTML = "";

            var mainRow = document.getElementById("all" + typeToDraw);
            mainRow.innerHTML = "";

            for (let index = 0; index < obj.length; index++) {

                var s = StudentCard(obj[index]);
                mainRow.appendChild(s);
            }

            generalDraw("Students", obj.length);

            break;

        case "Courses":
            var mainRow = document.getElementById("all" + typeToDraw);
            mainRow.innerHTML = "";

            for (let index = 0; index < obj.length; index++) {

                var s = CourseCard(obj[index]);
                mainRow.appendChild(s);
            }

            generalDraw("Courses", obj.length);


            break;

        case "Admins":

            var mainRow = document.getElementById("all" + typeToDraw);
            mainRow.innerHTML = "";

            if (curRoleNum == 1200) {
                for (let index = 0; index < obj.length; index++) {
                    var s = AdminCard(obj[index]);
                    mainRow.appendChild(s);
                }
            }
            else {
                for (let index = 0; index < obj.length; index++) {
                    if (obj[index].role_number != 1200) {
                        var s = AdminCard(obj[index]);
                        mainRow.appendChild(s);
                    }
                }

            }

            generalDraw("Admin", obj.length);

            break;

        case "courseDetails":

            var contant = document.createElement("div");

            var mainContainer = document.getElementById("mainContainer");
            mainContainer.innerHTML = "";

            //Title
            var title = document.createElement("h3");
            title.innerText = "Course Details: ";
            //title.className();

            //Image prop
            var img = document.createElement("img");
            img.className = "courseDetailsImg";
            img.src = obj[0].image;

            //ID prop
            var studentInThisCourse = document.createElement("p");
            studentInThisCourse.innerText = "Course : " + obj[0].name;

            //Desc Prop
            var descCell = document.createElement("p");
            descCell.innerText = obj[0].description;

            //Students Enroll
            var studentName = document.createElement("p");
            studentName.setAttribute("id", "studentInCourse");
            studentName.innerHTML = "";
            var studentNameDiv = document.createElement("div");
            studentNameDiv.setAttribute("id", "studentInCourseDiv");

            studentNameDiv.appendChild(studentName);

            //Edit Button 
            if (curRoleNum != 1210) {
                var editBtnCourse = document.createElement("button");
                editBtnCourse.innerText = "EDIT";
                editBtnCourse.setAttribute("class", "btn btn-dark");
                editBtnCourse.addEventListener("click", function () {

                    editTheCourseDetails(obj[0].id);
                })
            }

            contant.appendChild(title);
            contant.appendChild(studentInThisCourse);
            contant.appendChild(img);
            contant.appendChild(descCell);
            contant.appendChild(studentNameDiv);

            if (curRoleNum != 1210) {
                contant.appendChild(editBtnCourse);
            }

            fadeIn(mainContainer.appendChild(contant));

            break;

        case "studentDetails":

            var mainRow = document.getElementById("mainContainer");
            mainRow.innerHTML = "";

            var courseEnroll = document.getElementById("studentCourse");
            courseEnroll.innerHTML = "";

            var studentDetail = StudentDetailsCard(obj[0]);
            console.log(obj[0]);
            //mainRow.appendChild(studentDetail);
            fadeIn(mainRow.appendChild(studentDetail));

            break;

        case "adminDetails":

            var contant = document.createElement("div");

            var mainContainer = document.getElementById("mainContainer");
            mainContainer.innerHTML = "";

            //Title
            var title = document.createElement("h3");
            title.innerText = "Administrator Details: ";

            //Image prop
            // var img = document.createElement("img");
            // img.className = "studentDetailsImg";
            // img.src = obj[0].image;

            //ID prop
            var idCell = document.createElement("p");
            idCell.innerText = "ID Number: " + obj[0].id;
            idCell.style.display = "none";
            //Name prop
            var name = document.createElement("p");
            name.innerText = "Name: " + obj[0].name;

            //Role prop
            var role = document.createElement("p");
            role.innerText = "Role: " + obj[0].role;

            //Phone Prop
            var phone = document.createElement("p");
            phone.innerText = "Phone Number: " + obj[0].phone;

            //Email
            var email = document.createElement("p");
            email.innerText = "Email: " + obj[0].email;

            //Edit Button 
            var editBtnAdmin = document.createElement("button");
            editBtnAdmin.innerText = "EDIT"
            editBtnAdmin.setAttribute("class", " btn btn-dark")
            editBtnAdmin.addEventListener("click", function () {

                editTheAdminDetails(obj[0].id);
            })

            contant.appendChild(title);
            contant.appendChild(name);
            contant.appendChild(idCell);
            contant.appendChild(phone);
            contant.appendChild(email);
            contant.appendChild(role);

            contant.appendChild(editBtnAdmin);

            fadeIn(mainContainer.appendChild(contant));

            break;

        case "enroll":

            var allEnrolledCourse = document.getElementById("studentCourse");
            allEnrolledCourse.innerText = "";


            for (let index = 0; index < obj.length; index++) {

                var courseNameDiv = document.createElement("div");
                courseNameDiv.classList.add("courseInroll");
                var courseName = document.createElement("h3");
                courseName.innerText = obj[index].name;
                courseNameDiv.appendChild(courseName);
                fadeIn(allEnrolledCourse.appendChild(courseNameDiv));
            }

            break;

        case "studentInCourse":

            var allEnrolledStudents = document.getElementById("studentInCourse");
            allEnrolledStudents.innerText = "";

            var header = document.createElement("h4");
            header.innerHTML = "Students in this course: ";

            var footer = document.createElement("h4");
            footer.innerHTML = "Number Students in this course: " + obj.length;

            allEnrolledStudents.appendChild(header);

            numOfStudentInCourse = obj.length;

            for (let index = 0; index < obj.length; index++) {

                var courseNameDiv = document.createElement("button");
                courseNameDiv.setAttribute("id", "buttonx");
                courseNameDiv.innerText = obj[index].name;

                fadeIn(allEnrolledStudents.appendChild(courseNameDiv));
            }

            allEnrolledStudents.appendChild(footer);

            break;

        case "editCourseDetails":

            var mainRow = document.getElementById("mainContainer");
            mainRow.innerHTML = "";

            var temp = document.getElementById("editCourseForm");
            var p_temp = temp.cloneNode(true);
            p_temp.style.display = "inline-block";

            var studentList = document.getElementById("studentInThisCourse");
            studentList.innerHTML = "";

            p_temp.querySelector("#courseTitle").value = obj[0].name;
            p_temp.querySelector("#courseDesc").value = obj[0].description;
            p_temp.querySelector("#courseId").value = obj[0].id;
            p_temp.querySelector("#image-field").src = obj[0].image;
            //p_temp.querySelector("#curCourseId").value = obj[0].id;
            var fullStudentsList = document.createElement("div");

            for (let index = 0; index < allStudentsArray.length; index++) {

                var x = document.createElement("INPUT");
                x.setAttribute("type", "checkbox");
                x.setAttribute("id", "checkBox" + (index + 1));

                for (var t = 0; t < curCoursesStudentNumber.length; t++) {
                    if (curCoursesStudentNumber[t] == index + 1) {
                        x.setAttribute('checked', true);
                        break;
                    }
                }

                var curStudenteName = document.createElement("p");
                curStudenteName.innerHTML = allStudentsArray[index].name;

                fullStudentsList.appendChild(x);
                fullStudentsList.appendChild(curStudenteName);
            }

            p_temp.querySelector('#studentInThisCourse').appendChild(fullStudentsList);
            mainRow.appendChild(p_temp);

            break;

        case "editStudentDetails":
            var mainRow = document.getElementById("mainContainer");
            mainRow.innerHTML = "";

            var courseZone = document.getElementById("coursesList");
            courseZone.innerHTML = "";

            var temp = document.getElementById("editStudentForm");
            var p_temp = temp.cloneNode(true);
            p_temp.style.display = "inline-block";

            p_temp.querySelector("#studentTitle").value = obj[0].name;
            p_temp.querySelector("#studentPhone").value = obj[0].phone;
            p_temp.querySelector("#studentId").value = obj[0].id;
            p_temp.querySelector("#curStudentId").value = obj[0].id;
            p_temp.querySelector("#image-field").src = obj[0].image;
            p_temp.querySelector("#studentEmail").value = obj[0].email;
            var fullCourseList = document.createElement("div");
            var isDeleteAble = true;


            for (let index = 0; index < allCoursesArray.length; index++) {

                var x = document.createElement("INPUT");
                x.setAttribute("type", "checkbox");
                x.setAttribute("id", "checkBox" + (index + 1));

                for (var t = 0; t < curStudentCourseNumber.length; t++) {
                    if (curStudentCourseNumber[t] == index + 1) {
                        isDeleteAble = false;
                        x.setAttribute('checked', true);
                        break;
                    }
                }

                var curCourseName = document.createElement("p");
                curCourseName.innerHTML = allCoursesArray[index].name;

                fullCourseList.appendChild(x);
                fullCourseList.appendChild(curCourseName);
            }


            p_temp.querySelector('#coursesList').appendChild(fullCourseList);
            p_temp.querySelector('#numOfStudents')
            mainRow.appendChild(p_temp);
            if (!isDeleteAble) {
                document.getElementById("deleteBtnStudent").style.display = "none";
            }

            break;

        case "editAdminDetails":
            var mainRow = document.getElementById("mainContainer");
            mainRow.innerHTML = "";

            var temp = document.getElementById("editAdminForm");
            var p_temp = temp.cloneNode(true);
            p_temp.style.display = "inline-block";


            p_temp.querySelector("#adminName").value = obj[0].name;
            p_temp.querySelector("#adminPhone").value = obj[0].phone;
            p_temp.querySelector("#adminEmail").value = obj[0].email;
            p_temp.querySelector("#adminRole").default_label = obj[0].role;


            console.log(obj[0].id);
            p_temp.querySelector("#adminId").value = obj[0].id;

            mainRow.appendChild(p_temp);

            if (curRoleNum == 1205 && curUser.name == obj[0].name && curUser.phone == obj[0].phone) {
                document.getElementById("adminRole").disabled = true;
                document.getElementById("deleteAdminButton").style.display = "none";
            }

            break;

        default:
            break;
    }


}


function generalDraw(type, curNum) {

    var mainRow = document.getElementById("numOf" + type);
    var elem1 = document.createElement("div");
    elem1.innerHTML = "Number of " + type + ": " + curNum;
    mainRow.innerText = "";
    mainRow.appendChild(elem1);

}

function addDraw(add, where) {

    switch (add) {

        case "addCourse":
            var mainRow = document.getElementById(where);
            mainRow.innerHTML = "";
            var temp = document.getElementById("addCourseForm");
            var p_temp = temp.cloneNode(true);
            p_temp.style.display = "inline-block";

            mainRow.appendChild(p_temp);

            break;

        case "addStudent":
            var mainRow = document.getElementById(where);
            mainRow.innerHTML = "";

            var temp = document.getElementById("addStudentForm");
            var p_temp = temp.cloneNode(true);
            p_temp.style.display = "inline-block";

            mainRow.appendChild(p_temp);


            break;

        case "addAdmin":

            var mainRow = document.getElementById(where);
            mainRow.innerHTML = "";

            var temp = document.getElementById("addAdminForm");
            var p_temp = temp.cloneNode(true);
            p_temp.style.display = "inline-block";

            mainRow.appendChild(p_temp);

            break;
        default:
            break;
    }

}


function fadeIn(elem) {

    elem.style.opacity = 0;
    var steps = 1;
    var timer = setInterval(function () {
        steps++;
        elem.style.opacity = 0.08 * steps;
        if (steps >= 60) {
            clearInterval(timer);
            timer = undefined;
        }
    }, 50);
}


function previewImage(event) {

    var reader = new FileReader();
    var imageField = document.getElementById("image-field");

    reader.onload = function () {

        if (reader.readyState == 2) {

            imageField.src = reader.result;
        }
    }
    reader.readAsDataURL(event.target.files[0]);
}

function uploadCourseImage() {


}
