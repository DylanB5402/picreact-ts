import { action, makeObservable, observable } from "mobx";

export default class GameStore {

    constructor() {
        makeObservable(this);
    }
    
    @observable boardHeight = 5;

    @observable boardWidth = 5;

    @action setBoardHeight = (height : number) => {
        this.boardHeight = height;
    }
}