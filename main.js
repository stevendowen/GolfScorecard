

let selectedcourse;
let pararray = [];
let yardsarray = [];
let totalpar;
let totalyards;
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
            $('.scorecard').append(`<div class="titlebox">
            <div class="title"><span>Hole</span></div>
            </div>`);
            $('.hcpyardbox').append(`<div class="titlebox">
            <div class="title"><span>Par</span></div>
            <div class="title"><span>Yards</span></div>
            <div class="title"><span>Handicap</span></div>
            </div>`);
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
    let holes = selectedcourse.data.holes;
    let tees = holes[0].teeBoxes;

    $('.courseinfo').append(`<h2>${name}</h2>
            <h4>${address} - ${city}, ${state} ${zip}</h4>
            <h4>${phone}</h4>
            <h6>${website}</h6>
            <input class="input" type="text" placeholder="Add Player" onkeyup="addPlayer(this.value, event)">`);
    displayHoles(holes);
    $('.courseinfo').append(`<span class="teebox">Please Select Tee</span>
    <span class="teebox">To Load Par, Yards, HCP</span>`);

    for(let t = 0; t < tees.length; t++){
        let teetype = tees[t].teeType;
        let teecolor = tees[t].teeColorType;
        $('.courseinfo').append(`<div class="teebox">
        <button onclick="hideTeeBox(${t})">${teetype} (${teecolor})</button>
        </div>`);
    }
    $('.coursemain').fadeIn(600);
}

function displayHoles(holes){
    for(let f = 0; f < 9; f++){
        let frontnine = holes[f].hole;
        $('.scorecard').append(`<div class="hole">${frontnine}</div>`);
    }
    $('.scorecard').append(`<div class="hole"><span>Out</span>`);
    for(let b = 9; b < holes.length; b++){
        let backnine = holes[b].hole;
        $('.scorecard').append(`<div class="hole">${backnine}</div>`);
    }
    $('.scorecard').append(`<div class="hole"><span>In</span></div>`);
    $('.scorecard').append(`<div class="hole"><span>Total</span></div>`);
}

function hideTeeBox(teeindex){
    $('.teebox').slideUp(100, displayFrontHcpParYards(teeindex));
}

function displayFrontHcpParYards(teeindex){
    let selectedtee = teeindex;
    let holes = selectedcourse.data.holes;
    let outpararray = [];
    let outyardsarray = [];
    let totaloutpar;
    let totaloutyards;
    for(let t = 0; t < 9; t++){
        $('.hcpyardbox').append(`<div>
        <div class="par">${holes[t].teeBoxes[selectedtee].par}</div>
        <div class="par">${holes[t].teeBoxes[selectedtee].yards}</div>
        <div class="par">${holes[t].teeBoxes[selectedtee].hcp}</div>
        </div>`);
        outpararray.push(Number(`${holes[t].teeBoxes[selectedtee].par}`));
        outyardsarray.push(Number(`${holes[t].teeBoxes[selectedtee].yards}`));
    }
    totaloutpar = outpararray.reduce(add);
    totaloutyards = outyardsarray.reduce(add);
    pararray.push(totaloutpar);
    yardsarray.push(totaloutyards);
    $('.hcpyardbox').append(`<div>
    <div class="par"><span>${totaloutpar}</span></div>
    <div class="par"><span>${totaloutyards}</span></div>
    </div>`);
    displayBackHcpParYards(teeindex);
}

function displayBackHcpParYards(teeindex){
    let selectedtee = teeindex;
    let holes = selectedcourse.data.holes;
    let inpararray = [];
    let inyardsarray = [];
    let totalinpar;
    let totalinyards;
    for(let t = 9; t < holes.length; t++){
        $('.hcpyardbox').append(`<div>
        <div class="par">${holes[t].teeBoxes[selectedtee].par}</div>
        <div class="par">${holes[t].teeBoxes[selectedtee].yards}</div>
        <div class="par">${holes[t].teeBoxes[selectedtee].hcp}</div>
        </div>`);
        inpararray.push(Number(`${holes[t].teeBoxes[selectedtee].par}`));
        inyardsarray.push(Number(`${holes[t].teeBoxes[selectedtee].yards}`));
    }
    totalinpar = inpararray.reduce(add);
    totalinyards = inyardsarray.reduce(add);
    pararray.push(totalinpar);
    yardsarray.push(totalinyards);
    totalpar = pararray.reduce(add);
    totalyards = yardsarray.reduce(add);
    $('.hcpyardbox').append(`<div>
    <div class="par"><span>${totalinpar}</span></div>
    <div class="par"><span>${totalinyards}</span></div>
    </div>`);
    $('.hcpyardbox').append(`<div>
    <div class="par"><span>${totalpar}</span></div>
    <div class="par"><span>${totalyards}</span></div>
    </div>`);
}

function displayPlayers(){
    $('.playerbox').html("");
    $('.playerbox').append(`<div class="namebox"></div>
    <div class="scores"></div>`);
    for(let p = 0; p < golfplayers.playerCollection.length; p++){
        let players = golfplayers.playerCollection[p].name;
        $('.namebox').append(`<div class="player">${players}</div>`);
        $('.scores').append(`<div id="p${p}" class="out"></div>`);
        for(let o = 0; o < 9; o++){
            $(`#p${p}`).append(`<input id="p${p}h${o}" onfocusout="addScore(${p})" class="holescore">`);
        }
        if(golfplayers.playerCollection.length === 4){
            $('.input').hide();
        }
        $(`#p${p}`).append(`<div id="out${p}" class="holescore"></div>`);
        for(let i = 9; i < 18; i++){
            $(`#p${p}`).append(`<input id="p${p}h${i}" onfocusout="addScore(${p})" class="holescore">`);
        }
        $(`#p${p}`).append(`<div id="in${p}" class="holescore"></div>`);
        $(`#p${p}`).append(`<div id="total${p}" class="holescore"></div>`);
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

function addScore(playerid){
    golfplayers.playerCollection[playerid].addOutScore(playerid);
    golfplayers.playerCollection[playerid].addInScore(playerid);
    golfplayers.playerCollection[playerid].totalScore(playerid);
}

function noSamePlayer(){
    $('.sameplayer').show();
}

function closePlayerMessage(){
    $('.sameplayer').hide();
}