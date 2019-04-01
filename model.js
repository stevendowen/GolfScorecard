

class Players{
    constructor(){
        this.playerCollection = [];
    }
    addPlayer(){
        this.playerCollection.push(new Player());
    }
}

class Player{
    constructor(){
        this.name = name;
        this.id = id;
        this.score = [];
    }
    addScore(){
        this.score.push(new Scores());
    }
}

class Scores{
    constructor(){
        this.score = score;
    }
}

let golfplayers = new Players();