class UserModel {
    constructor(){
        this.name = null;
    }

    initModel(data){
        this.name = data.name;
    }

    getName(){
        return this.name;
    }
}