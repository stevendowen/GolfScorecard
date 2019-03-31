

let selectedcourse;

function showCourses(){
    $('.home').fadeOut(100, loadCourses());
}

function loadCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let courses = JSON.parse(this.responseText);

            for(let i = 0; i < courses.courses.length; i++){
                let course = courses.courses[i];
                let img = course.image;
                let courseid = course.id;
                $('.courses').append(`<div class="course mdl-card-square mdl-shadow--16dp">
                <img src="${img}">
                <div class="cardbottom mdl-card__actions">
                <h2 class="name mdl-card__title-text">${course.name}</h2>
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect" onclick="hideCourses(${courseid})">Play Course
                <i class="fas fa-golf-ball"></i>
                </button>
                </div>
                </div>`);
                $('.coursebox').fadeIn(600);
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}

function hideCourses(courseid){
    $('.coursebox').fadeOut(100, loadCourse(courseid));
}


function loadCourse(courseid) {
    let tees = $('.cardbottom').parent();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            selectedcourse = JSON.parse(this.responseText);
            console.log(selectedcourse);
            $(tees).append(`<div>Here</div>`);
            loadCourseInfo(courseid);

        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${courseid}`, true);
    xhttp.send();
}

function loadCourseInfo(){
    let name = selectedcourse.data.name;
    let address = selectedcourse.data.addr1;
    let city = selectedcourse.data.city;
    let state = selectedcourse.data.stateOrProvince;
    let zip = selectedcourse.data.zipCode;
    let website = selectedcourse.data.website;
    let phone = selectedcourse.data.phone;

    $('.courseinfo').append(`<h2>${name}</h2>
            <h4>${address} - ${city}, ${state} ${zip}</h4>
            <h4>${phone}</h4>
            <h6>${website}</h6>`);
    displayFrontNine();
}

function displayFrontNine(){
    let holes = selectedcourse.data.holes;
    for(let h = 0; h < 9; h++){
        let hole = holes[h].hole;
        let par = holes[h].teeBoxes[0].par;
        let handicap = holes[h].teeBoxes[0].hcp;
        let yards = holes[h].teeBoxes[0].yards;
        $('.scorecard').append(`<div><div class="hole">Hole ${hole}</div>
                <div class="par">Par ${par}</div>
                <div class="hcp">HCP ${handicap}</div>
                <div class="yards">${yards}</div>
                </div>`);
        $('.coursemain').fadeIn(600);
    }
    $('.scorecard').append(`<div class="total">Out Total</div>`);
    displayBackNine();
}

function displayBackNine(){
    let holes = selectedcourse.data.holes;
    for(let h = 9; h < holes.length; h++){
        let hole = holes[h].hole;
        let par = holes[h].teeBoxes[0].par;
        let handicap = holes[h].teeBoxes[0].hcp;
        let yards = holes[h].teeBoxes[0].yards;
        $('.scorecard').append(`<div><div class="hole">Hole ${hole}</div>
                <div class="par">Par ${par}</div>
                <div class="hcp">HCP ${handicap}</div>
                <div class="yards">${yards}</div>
                </div>`);
        $('.coursemain').fadeIn(600);
    }
    $('.scorecard').append(`<div class="total">In Total</div>`);
    $('.scorecard').append(`<div class="total">Total</div>`);
}
