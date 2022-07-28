import { observer } from "mobx-react-lite";
import { BaseSyntheticEvent, MouseEventHandler, SyntheticEvent, useContext } from "react";
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

    const setVisualCellStatus = (s : CellStatus) => gameStore?.setVisualCellStatus(s, row, col);

    var x = '';
    if (visualStatus === CellStatus.BlankWrong || visualStatus == CellStatus.FilledWrong) {
        x = 'X'
    }

    const onClick = (event: BaseSyntheticEvent) => {
        event.preventDefault();
        const nativeEvent : PointerEvent = event.nativeEvent as PointerEvent;
        if (nativeEvent.button === 2 || nativeEvent.shiftKey) {
            onRightClick();
        } else if (nativeEvent.button === 0 ) {
            onLeftClick();
        }
    }

    const onLeftClick = () => {
        if (trueCellStatus === CellStatus.Filled) {
            setVisualCellStatus(CellStatus.Filled);
        } else if (trueCellStatus === CellStatus.Blank) {
            setVisualCellStatus(CellStatus.BlankWrong);
        }
    }

    const onRightClick = () => {
        if (trueCellStatus === CellStatus.Blank) {
            setVisualCellStatus(CellStatus.Blank);
        } else if (trueCellStatus === CellStatus.Filled) {
            setVisualCellStatus(CellStatus.FilledWrong);
        }
    }

    return (
        <td 
            className={`cell ${visualStatus}`}
            // className={`cell ${trueCellStatus}`}
            onClick={onClick}
            onContextMenu={onClick}
        >
            {x}
        </td>
    )
}

export default observer(BoardCell);