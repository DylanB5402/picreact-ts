import { observer } from "mobx-react-lite";
import { useContext } from "react";
import CellStatus from "../CellStatus";
import GameContext from "../store/GameContext";
import GameStore from "../store/GameStore";
import './Board.css'

interface BoardCellProps {
    row: number,
    col: number
}

const BoardCell = ({row, col} : BoardCellProps) => {
    const gameStore : GameStore | null = useContext(GameContext);
    const trueCellStatus : CellStatus = gameStore?.trueBoardStatus[row][col] as CellStatus;

    return (
        <td 
            className={`cell `}
        >
            {trueCellStatus}
        </td>
    )
}

export default observer(BoardCell);