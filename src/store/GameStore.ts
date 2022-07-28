import { action, makeObservable, observable } from "mobx";
import CellStatus from "../CellStatus";

export default class GameStore {

    constructor() {
        makeObservable(this);
    }

    generateBlankBoardState = () => {
        const numCols = this.boardWidth as number;
        const numRows = this.boardHeight as number;
        const board : CellStatus[][] = []
        for (var row : number = 0; row < numRows; row++) {
            board[row] = []
            for (var col : number = 0; col < numCols; col++) {
                board[row][col] = CellStatus.Blank;
            }
        }
        return board;
    }
    
    @observable 
    boardHeight : number = 5;

    @observable 
    boardWidth = 4;

    @observable
    visualBoardStatus : CellStatus[][] = this.generateBlankBoardState();

    @observable
    trueBoardStatus : CellStatus[][] = this.generateBlankBoardState();


    @action 
    setBoardHeight = (height : number) => {
        this.boardHeight = height;
    }

    @action
    setVisualCellStatus(status : CellStatus, row : number, col : number) {
        this.visualBoardStatus[row][col] = status;
    }

    @action
    setTrueBoardStatus(statuses : CellStatus[][]) {
        this.trueBoardStatus = statuses;
    }

    


}