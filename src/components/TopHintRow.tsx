import { observer } from "mobx-react"
import { ReactElement, useContext } from "react";
import GameContext from "../store/GameContext";
import GameStore from "../store/GameStore";

const TopHintRow = () => {
    const gameStore : GameStore | null = useContext(GameContext);

    const topHints : number[][] = gameStore?.getColumnHints() as number[][];
    const hints : ReactElement[] = [];

    topHints.forEach( (hint) => {
        const hintRows : ReactElement[] = [];
        hint.forEach( (h) => hintRows.push( <p> {h} </p>))
        hints.push( <td className="hintTop"> {hintRows} </td>)
        
    })

    return (
        <tr>
            <td />
            {hints}
        </tr>
    )
}

export default observer(TopHintRow);