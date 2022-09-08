import { observer } from "mobx-react-lite";
import { SyntheticEvent, useContext } from "react";
import GameContext from "../store/GameContext";
import GameStore from "../store/GameStore";
import BoardRow from "./BoardRow";
import './Board.css'
import TopHintRow from "./TopHintRow";


const Board = () => {
    const gameStore : GameStore | null = useContext(GameContext);

    const rows = () => {
        const boardRows = []
        const numRows : number = gameStore?.boardHeight as number;
        for (var i : number = 0; i < numRows; i++) {
            boardRows.push(
            <BoardRow 
                rowNumber={i} 
                key={`row-${i}`}
            />)
        }
        return boardRows;
    }
    
    

    return (
        <table 
            id="board"
        >
            <tbody>
                <TopHintRow />
                {rows()}
            </tbody>
        </table>
    )
}

export default observer(Board);