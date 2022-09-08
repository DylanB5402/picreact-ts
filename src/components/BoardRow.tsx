import { observer } from "mobx-react-lite";
import { ReactElement, useContext } from "react";
import GameContext from "../store/GameContext";
import GameStore from "../store/GameStore";
import BoardCell from "./BoardCell";

interface BoardRowProps {
    rowNumber : number;
}

const BoardRow = ( {rowNumber} : BoardRowProps ) => {
    const gameStore : GameStore | null = useContext(GameContext);

    const row = () => {
        const numCells : number = gameStore?.boardWidth as number;
        const tableData : ReactElement[] = [];
        for (var i : number = 0; i < numCells; i++) {
            tableData.push( 
                <BoardCell 
                    row={rowNumber} 
                    col={i}
                    key={`cell-${rowNumber}-${i}`}
                />
            )
        }
        return tableData;
    }
    return (
        <tr>
            <td className="hintLeft">
                {gameStore?.getRowHint(rowNumber).toString().replaceAll(',', ' ')}
            </td>
            {row()}
        </tr>
        
    )
}

export default observer(BoardRow);