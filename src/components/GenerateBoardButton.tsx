import { observer } from "mobx-react"
import { useContext } from "react";
import GameContext from "../store/GameContext";
import GameStore from "../store/GameStore";
import {Button} from 'reactstrap';
import './Board.css'
import { cp } from "fs";
import CellStatus from "../CellStatus";


const DummyDisplay = () => {
    const gameStore : GameStore | null = useContext(GameContext);
    
    const generateRandomBoolean = () => {
        return Math.random() >= 0.5;
    }

    const onClick = () => {
        const numCols = gameStore?.boardWidth as number;
        const numRows = gameStore?.boardHeight as number;
        const board : CellStatus[][] = []
        for (var row : number = 0; row < numRows; row++) {
            board[row] = [];
            for (var col : number = 0; col < numCols; col++) {
                var status : CellStatus;
                if (generateRandomBoolean()) {
                    status = CellStatus.Blank;
                } else {
                    status = CellStatus.Filled;
                }
                board[row][col] = status;
            }
            gameStore?.setTrueBoardStatus(board);
        }

    }
    return (
        <Button
            onClick={onClick}
            id='newGame'
        >
            New Game 
        </Button>
    )
}

export default observer(DummyDisplay);