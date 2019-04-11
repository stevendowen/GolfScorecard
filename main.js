

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
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect" onclick="hideCourses(${courseid})">
                <span class="name">Play Course</span>
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
            <div id="hole" class="title"><span>Hole</span></div>
            </div>`);
            $('.hcpyardbox').append(`<div class="titlebox">
            <div id="par" class="title"><span>Par</span></div>
            <div id="yards" class="title"><span>Yards</span></div>
            <div id="hcp" class="title"><span>Handicap</span></div>
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
    $('.courseinfo').append(`<div class="teebox">
    <span>Please Select Tee</span>
    <span>To Load Par, Yards, HCP</span>
    </div>`);

    for(let t = 0; t < tees.length; t++){
        let teetype = tees[t].teeType;
        let teecolor = tees[t].teeColorType;
        $('.teebox').append(`<div>
        <button class="btn mdl-button mdl-js-button mdl-js-ripple-effect" onclick="hideTeeBox(${t})">${teetype} (${teecolor})</button>
        </div>`);
    }
    $('.coursemain').fadeIn(600);
}

function displayHoles(holes){
    for(let f = 0; f < 9; f++){
        let frontnine = holes[f].hole;
        $('.scorecard').append(`<div id="hole" class="hole">${frontnine}</div>`);
    }
    $('.scorecard').append(`<div id="hole" class="hole"><span>Out</span>`);
    for(let b = 9; b < holes.length; b++){
        let backnine = holes[b].hole;
        $('.scorecard').append(`<div id="hole" class="hole">${backnine}</div>`);
    }
    $('.scorecard').append(`<div id="hole" class="hole"><span>In</span></div>`);
    $('.scorecard').append(`<div id="hole" class="hole"><span>Total</span></div>`);
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
        <div id="par" class="par">${holes[t].teeBoxes[selectedtee].par}</div>
        <div id="yards" class="par">${holes[t].teeBoxes[selectedtee].yards}</div>
        <div id="hcp" class="par">${holes[t].teeBoxes[selectedtee].hcp}</div>
        </div>`);
        outpararray.push(Number(`${holes[t].teeBoxes[selectedtee].par}`));
        outyardsarray.push(Number(`${holes[t].teeBoxes[selectedtee].yards}`));
    }
    totaloutpar = outpararray.reduce(add);
    totaloutyards = outyardsarray.reduce(add);
    pararray.push(totaloutpar);
    yardsarray.push(totaloutyards);
    $('.hcpyardbox').append(`<div>
    <div id="par" class="par"><span>${totaloutpar}</span></div>
    <div id="yards" class="par"><span>${totaloutyards}</span></div>
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
        <div id="par" class="par">${holes[t].teeBoxes[selectedtee].par}</div>
        <div id="yards" class="par">${holes[t].teeBoxes[selectedtee].yards}</div>
        <div id="hcp" class="par">${holes[t].teeBoxes[selectedtee].hcp}</div>
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
    <div id="par" class="par"><span>${totalinpar}</span></div>
    <div id="yards" class="par"><span>${totalinyards}</span></div>
    </div>`);
    $('.hcpyardbox').append(`<div>
    <div id="par" class="par"><span class="totalpar">${totalpar}</span></div>
    <div id="yards" class="par"><span>${totalyards}</span></div>
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
            $(`#p${p}`).append(`<input id="p${p}h${o}" onfocusout="addScore(${p}, value)" class="holescore">`);
        }
        $(`#p${p}`).append(`<div id="out${p}" class="holescore"></div>`);
        for(let i = 9; i < 18; i++){
            $(`#p${p}`).append(`<input id="p${p}h${i}" onfocusout="addScore(${p}, value)" class="holescore">`);
        }
        $(`#p${p}`).append(`<div id="in${p}" class="holescore"></div>`);
        $(`#p${p}`).append(`<div id="total${p}" class="holescore"></div>`);
        if(golfplayers.playerCollection.length === 4){
            $('.input').hide();
        }
    }
}

function addPlayer(val, event){
    switch(event.which){
        case 13:
            if(val !== ''){
                let id = golfplayers.playerCollection.length + 1;
                golfplayers.addPlayer(id, val);
                displayPlayers();
                $('.input').val('');
                $('.input').focus();
                break;
            }
    }
}

function addScore(playerid, val){
    golfplayers.playerCollection[playerid].addOutScore(playerid);
    golfplayers.playerCollection[playerid].addInScore(playerid);
    golfplayers.playerCollection[playerid].totalScore(playerid);
    golfplayers.playerCollection[playerid].addScoreArray(val, playerid);
}

function noSamePlayer(){
    $('body').append(`<div class="sameplayer">
    <i class=" close fas fa-window-close" onclick="closePlayerMessage()"></i>
    <span class="sorry">Sorry, You can't have the same name.</span>
    </div>`);
}

function showEndScore(playerid){
    let score = $(`#total${playerid}`).html();
    if($(`#total${playerid}`).html() > 72){
        $('body').append(`<div class="endmessage bad">
            <i class=" close fas fa-window-close" onclick="closePlayerMessage()"></i>
            <div id="bad" class="message"><span>Better Luck Next Time</span></div>
            <div class="message"><span>${score}/72 Par</span></div>
            </div>`);
    } else {
        $('body').append(`<div class="endmessage good">
            <i class=" close fas fa-window-close" onclick="closePlayerMessage()"></i>
            <div id="good" class="message"><span>On To The Pros</span></div>
            <div class="message"><span>${score}/72 Par</span></div>
            </div>`);
    }
}

function closePlayerMessage(){
    $('.sameplayer').remove();
    $('.endmessage').remove();
}