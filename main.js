

loadCourses();

function loadCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let courses = JSON.parse(this.responseText);
            console.log(courses);
            for(let i = 0; i < courses.courses.length; i++){
                let course = courses.courses[i];
                let img = course.image;
                $('.courses').append(`<div class="course mdl-card-square mdl-shadow--16dp">
                <img src="${img}">
                <div class="cardbottom mdl-card__actions">
                <h2 class="mdl-card__title-text">${course.name}</h2>
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect">Button</button>
                </div>
                </div>`);
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}