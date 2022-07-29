import { action, computed, makeObservable, observable, toJS } from "mobx";
import CellStatus from "../CellStatus";

export default class GameStore {

    constructor() {
        makeObservable(this);
        this.resetBoard();
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

    generateRandomCell = () => {
        var status : CellStatus;
        if (Math.random() >= 0.5) {
            status = CellStatus.Blank;
        } else {
            status = CellStatus.Filled;
            this.numFilledCells += 1;
        }
        return status;
    }

    generateRandomBoard = () => {
        this.trueBoardStatus = this.generateBoard(this.generateRandomCell)
    };
    
    @observable 
    boardHeight : number = 10;

    @observable 
    boardWidth : number = 10;

    @observable
    visualBoardStatus : CellStatus[][] = this.generateBoard( () => CellStatus.Unknown);

    @observable
    trueBoardStatus : CellStatus[][] = this.generateBoard( () => CellStatus.Unknown);

    @observable
    numFilledCells : number = 0;

    @observable
    numClickedFilledCells : number = 0;

    @observable
    numMistakes = 0;

    

    makeEmptySelectedCells = () => {
        const arr : boolean[][] = [];
        const numCols = this.boardWidth as number;
        const numRows = this.boardHeight as number;
        for (var row : number = 0; row < numRows; row++) {
            arr[row] = [];
            for (var col : number = 0; col < numCols; col++) {
                arr[row][col] = false;
            }
        }
        return arr;
    }

    @observable
    selectedCells : boolean[][] = this.makeEmptySelectedCells();

    

    @observable
    isLeftClick : boolean = false;

    @observable
    isRightClick : boolean = false;

    @action
    setClicks = (left : boolean, right : boolean) => {
        this.isLeftClick = left;
        this.isRightClick = right;
        
    }

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
        this.visualBoardStatus = this.generateBoard( () => CellStatus.Unknown);
    }

    @action
    resetBoard = () => {
        this.numFilledCells = 0;
        this.numClickedFilledCells = 0;
        this.generateRandomBoard();
        this.setVisualBoardUnknown();
        const numCols = this.boardWidth as number;
        const numRows = this.boardHeight as number;
        for (var row : number = 0; row < numRows; row++) {
            this.selectedCells[row] = [];
            for (var col : number = 0; col < numCols; col++) {
                this.selectedCells[row][col] = false;
            }
        }
    }

    @action
    incrementNumClickedFilledCells = () => {
        this.numClickedFilledCells += 1;
    }

    @action
    setSelected = (selected : boolean, row : number, col : number) => {
        if (!this.gameOver) {
            this.selectedCells[row][col] = selected;
        }
    }

    @action
    checkAllSelected = () => {
        if (this.gameOver) {
            return;
        }
        const numCols = this.boardWidth as number;
        const numRows = this.boardHeight as number;
        for (var row : number = 0; row < numRows; row++) {
            for (var col : number = 0; col < numCols; col++) {
                if (this.selectedCells[row][col]) {
                    this.checkCell(row, col);
                    this.selectedCells[row][col] = false;
                }
            }
        }
    }

    @action
    checkCell = (row : number, col : number) => {
        const setVisualCellStatus = (s : CellStatus) => this.setVisualCellStatus(s, row, col);
        const trueCellStatus = this.trueBoardStatus[row][col];
        if (this.isLeftClick) {
            if (trueCellStatus === CellStatus.Filled) {
                setVisualCellStatus(CellStatus.Filled);
                this.incrementNumClickedFilledCells();
            } else if (trueCellStatus === CellStatus.Blank) {
                setVisualCellStatus(CellStatus.BlankWrong);
            }
        } else if (this.isRightClick) {
            if (trueCellStatus === CellStatus.Blank) {
                setVisualCellStatus(CellStatus.Blank);
            } else if (trueCellStatus === CellStatus.Filled) {
                setVisualCellStatus(CellStatus.FilledWrong);
                this.incrementNumClickedFilledCells();
            }
        }
    }

    @computed
    get gameOver() {
        return this.numClickedFilledCells === this.numFilledCells;
    }

    getRowHint = (row: number) => {
        return this.generateHint(this.trueBoardStatus[row]);
    }
    
    generateHint = (statuses : CellStatus[]) => {
        const nums = statuses.map( (s : CellStatus) => {
            if (s === CellStatus.Blank) {
                return 0;
            } else {
                return 1;
            }
        })
        const numStrings = nums.toString().replaceAll(',', '').split('0').filter( (x) => x !== '')
        return numStrings.map((x : string) => x.length)
    }

    getColumnHints = () => {
        const hints : number[][] = []
        for (var i = 0; i < this.boardWidth; i++) {
            hints.push(this.getColumnHint(i));
        }
        return hints;
    }

    getColumnHint = (col : number) => {
        const statuses : CellStatus[] = [];
        for (var r = 0; r < this.boardHeight; r++) {
            statuses.push(this.trueBoardStatus[r][col]);
        }
        return this.generateHint(statuses);
    }


    

    


}