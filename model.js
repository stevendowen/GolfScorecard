

class Players{
    constructor(){
        this.playerCollection = [];
    }
    addPlayer(id, name){
        for(let p = 0; p < this.playerCollection.length; p++){
            if(name === this.playerCollection[p].name){
                noSamePlayer();
                this.playerCollection.splice(p, 1);
            }
        }
        this.playerCollection.push(new Player(id, name));
    }
}

class Player {
    constructor(id, name) {
        this.name = name;
        this.id = id;
        this.score = 0;
    }
    addOutScore(playerid) {
        let total = this.score;
        for(let o = 0; o < 9; o++){
            total += Number($(`#p${playerid}h${o}`).val());
        }
        $(`#out${playerid}`).html(total);
    }
    addInScore(playerid){
        let total = this.score;
        for(let i = 9; i < 18; i++){
            total += Number($(`#p${playerid}h${i}`).val());
        }
        $(`#in${playerid}`).html(total);
    }
    totalScore(playerid){
        let total = this.score;
        for(let t = 0; t < 18; t++){
            total += Number($(`#p${playerid}h${t}`).val());
        }
        $(`#total${playerid}`).html(total);
    }
}



let golfplayers = new Players();