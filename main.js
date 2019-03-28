

let selectedcourse;

function hideAndShow(){
    $('.home').fadeOut(100, loadCourses());
}


function loadCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let courses = JSON.parse(this.responseText);
            console.log(courses);
            for(let i = 0; i < courses.courses.length; i++){
                let course = courses.courses[i];
                let img = course.image;
                let courseid = course.id;
                $('.courses').append(`<div class="course mdl-card-square mdl-shadow--16dp">
                <img src="${img}">
                <div class="cardbottom mdl-card__actions">
                <h2 class="name mdl-card__title-text">${course.name}</h2>
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect" onclick="getCourse(${courseid}, this)">Tee Types
                <i class="fas fa-golf-ball"></i>
                </button>
                </div>
                </div>`);
                $('.coursebox').fadeIn(2000);
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}

function getCourse(courseid, btn) {
    let courseinfo = $(btn).parent().parent();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            selectedcourse = JSON.parse(this.responseText);
            console.log(selectedcourse);
            let tees = selectedcourse.data.holes[0].teeBoxes;
            console.log(tees);
            for(let t = 0; t < tees.length; t++) {
                let teetypes = tees[t].teeType;
                let upperteetype = teetypes.charAt(0).toUpperCase() + teetypes.slice(1);
                $(courseinfo).append(`<div class="teetypes">
                <h6>${upperteetype}</h6>
                </div>`);
            }
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${courseid}`, true);
    xhttp.send();
}
