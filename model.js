

class Players{
    constructor(){
        this.playerCollection = [];
    }
    addPlayer(id, name){
        this.playerCollection.push(new Player(id, name));
    }
}

class Player{
    constructor(id, name){
        this.name = name;
        this.id = id;
        this.score = [];
    }
    addScore(id){
        this.score.push(new Scores(id));
    }
}

class Scores{
    constructor(){
        this.score = score;
    }
}

let golfplayers = new Players();