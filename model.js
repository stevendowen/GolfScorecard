

class Players{
    constructor(){
        this.playerCollection = [];
    }
    addPlayer(id, name){
        this.playerCollection.push(new Player(id, name));
    }
}

class Player {
    constructor(id, name) {
        this.name = name;
        this.id = id;
        this.scores = [];
    }
    addScore() {
    }
}



let golfplayers = new Players();