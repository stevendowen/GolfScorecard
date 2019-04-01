

let selectedcourse;
let partotal;
let yardtotal;
let totalpar = [];
let totalyards = [];
let allpar;
let allyards;
const add = (a,b) => a + b;

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
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            selectedcourse = JSON.parse(this.responseText);
            console.log(selectedcourse);
            $('.scorecard').append(`<div class="titlebox"><div class="title">Hole</div>
            <div class="title">Par</div>
            <div class="title">Yards</div>
            <div class="title">Handicap</div>
            </div>`);
            displayPlayers();
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
    let pars = [];
    let yards = [];
    for(let h = 0; h < 9; h++){
        let hole = holes[h].hole;
        let par = holes[h].teeBoxes[0].par;
        let yard = holes[h].teeBoxes[0].yards;
        let handicap = holes[h].teeBoxes[0].hcp;
        $('.scorecard').append(`<div><div class="hole">${hole}</div>
                <div class="par">${par}</div>
                <div class="par">${yard}</div>
                <div class="par">${handicap}</div>
                </div>`);
        $('.coursemain').fadeIn(600);
        pars.push(par);
        yards.push(yard);
        partotal = pars.reduce(add);
        yardtotal = yards.reduce(add);
    }
    $('.scorecard').append(`<div class="totalbox">
    <div class="total">Out</div>
    <div class="total">${partotal}</div>
    <div class="total">${yardtotal}</div>
    </div>`);
    totalpar.push(partotal);
    totalyards.push(yardtotal);
    displayBackNine();
}

function displayBackNine(){
    let holes = selectedcourse.data.holes;
    let pars = [];
    let yards = [];
    for(let h = 9; h < holes.length; h++){
        let hole = holes[h].hole;
        let par = holes[h].teeBoxes[0].par;
        let yard = holes[h].teeBoxes[0].yards;
        let handicap = holes[h].teeBoxes[0].hcp;
        $('.scorecard').append(`<div><div class="hole">${hole}</div>
                <div class="par">${par}</div>
                <div class="par">${yard}</div>
                <div class="par">${handicap}</div>
                </div>`);
        $('.coursemain').fadeIn(600);
        pars.push(par);
        yards.push(yard);
        partotal = pars.reduce(add);
        yardtotal = yards.reduce(add);
    }
    $('.scorecard').append(`<div class="totalbox">
    <div class="total">In</div>
    <div class="total">${partotal}</div>
    <div class="total">${yardtotal}</div>
    </div>`);
    totalpar.push(partotal);
    totalyards.push(yardtotal);
    allpar = totalpar.reduce(add);
    allyards = totalyards.reduce(add);
    $('.scorecard').append(`<div class="totalbox">
    <div class="total">Total</div>
    <div class="total">${allpar}</div>
    <div class="total">${allyards}</div>  
    </div>`);
}

function displayPlayers(){
    $('.playerbox').html("");
    $('.coursemain').append(`<div class="playerbox">
    <div class="namebox">
    <input class="input" type="text" placeholder="Add Player" onkeyup="addPlayer(this.value, event)">
    </div>
    <div class="scores"></div>
    </div>`);
    for(let p = 0; p < golfplayers.playerCollection.length; p++){
        let players = golfplayers.playerCollection[p].name;
        $('.namebox').append(`<div class="player">${players}</div>`);
        for(let h = 0; h < 9; h++){
            $('.scores').append(`<div class="holescore">${p}${h}</div>`);
        }
        if(golfplayers.playerCollection.length === 4){
            $('.input').hide();
        }
    }
    console.log(golfplayers.playerCollection);
}

function addPlayer(val, event){
    switch(event.which){
        case 13:
            let id = golfplayers.playerCollection.length + 1;
            golfplayers.addPlayer(id, val);
            displayPlayers();
            $('.input').val('');
            $('.input').focus();
            break;
    }
}