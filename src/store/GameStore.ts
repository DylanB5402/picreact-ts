import { action, makeObservable, observable } from "mobx";
import CellStatus from "../CellStatus";

export default class GameStore {

    constructor() {
        makeObservable(this);
        this.resetBoard();
    }

    generateBlankBoardState = () => {
        const numCols = this.boardWidth as number;
        const numRows = this.boardHeight as number;
        const board : CellStatus[][] = []
        for (var row : number = 0; row < numRows; row++) {
            board[row] = []
            for (var col : number = 0; col < numCols; col++) {
                board[row][col] = CellStatus.Unknown;
            }
        }
        return board;
    }

    generateBoard = (generateStatus: () => CellStatus) => {
        const numCols = this.boardWidth as number;
        const numRows = this.boardHeight as number;
        const board : CellStatus[][] = []
        for (var row : number = 0; row < numRows; row++) {
            board[row] = [];
            for (var col : number = 0; col < numCols; col++) {
                board[row][col] = generateStatus();
            }
        }
        return board;
    }
    
    @observable 
    boardHeight : number = 5;

    @observable 
    boardWidth : number = 5;

    // @observable
    // visualBoardStatus : CellStatus[][] = this.generateBlankBoardState();

    // @observable
    // trueBoardStatus : CellStatus[][] = this.generateBlankBoardState();

    @observable
    visualBoardStatus : CellStatus[][] = this.generateBoard( () => CellStatus.Unknown);

    @observable
    trueBoardStatus : CellStatus[][] = this.generateBoard( () => CellStatus.Unknown);

    @observable
    numFilledCells : number = 0;

    @observable
    numClickedCells : number = 0;

    @action 
    setBoardHeight = (height : number) => {
        this.boardHeight = height;
    }

    @action
    setVisualCellStatus = (status : CellStatus, row : number, col : number) => {
        this.visualBoardStatus[row][col] = status;
    }

    @action
    setTrueBoardStatus = (statuses : CellStatus[][]) => {
        this.trueBoardStatus = statuses;
    }

    @action 
    setVisualBoardUnknown = () => {
        this.visualBoardStatus = this.generateBlankBoardState();
    }

    @action
    resetBoard = () => {
        this.generateRandomBoard();
        this.setVisualBoardUnknown();
    }

    generateRandomCell = () => {
        var status : CellStatus;
        if (Math.random() >= 0.5) {
            status = CellStatus.Blank;
        } else {
            status = CellStatus.Filled;
        }
        return status;
    }

    generateRandomBoard = () => {
        this.trueBoardStatus = this.generateBoard(this.generateRandomCell)
    };
    

    


}