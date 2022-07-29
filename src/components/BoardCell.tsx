import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { BaseSyntheticEvent, MouseEventHandler, SyntheticEvent, useContext, useState } from "react";
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
    const visualStatus : CellStatus = gameStore?.visualBoardStatus[row][col] as CellStatus;
    
    const [clicked, setClicked] = useState(false);

    if (visualStatus === CellStatus.Unknown && clicked) {
        setClicked(false);
    }

    const setVisualCellStatus = (s : CellStatus) => gameStore?.setVisualCellStatus(s, row, col);

    if ((toJS(gameStore?.selectedCells) as boolean[][])[row][col]) {
        setVisualCellStatus(CellStatus.Selected);
    }

    if (gameStore?.gameOver) {
        if (visualStatus === CellStatus.Filled) {
            setVisualCellStatus(CellStatus.Over);
        } else if (visualStatus === CellStatus.FilledWrong) {
            setVisualCellStatus(CellStatus.OverWrong);
        } else if (visualStatus === CellStatus.Unknown) {
            setVisualCellStatus(trueCellStatus);
        } 
    }

    var x = '';
    if (visualStatus === CellStatus.BlankWrong || visualStatus === CellStatus.FilledWrong || visualStatus === CellStatus.OverWrong) {
        x = 'X'
    }

    const onMouseEnter = (event : SyntheticEvent) => {
        event.preventDefault();
        if (clicked) {
            return;
        }
        setClicked(true);
        const nativeEvent : PointerEvent = event.nativeEvent as PointerEvent;
        const button = nativeEvent.buttons;
        if (button === 1 || button === 2) {
            gameStore?.setSelected(true, row, col);
            gameStore?.setClicks(button === 1, button === 2)
        }
    }

    return (
        <td 
            className={`cell ${visualStatus}`}
            onClick={onMouseEnter}
            onContextMenu={onMouseEnter}
            onMouseDown={onMouseEnter}
            onMouseEnter={onMouseEnter}
        >
            {x}
        </td>
    )
}

export default observer(BoardCell);