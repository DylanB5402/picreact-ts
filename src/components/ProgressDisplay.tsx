import { observer } from "mobx-react"
import { useContext } from "react";
import GameContext from "../store/GameContext";
import GameStore from "../store/GameStore";

const ProgressDisplay = () => {
    const gameStore : GameStore | null = useContext(GameContext);

    return (
        
        <div id="progress">
            <p>Filled {gameStore?.numClickedFilledCells} cells </p>
            <p> Out of {gameStore?.numFilledCells} cells </p>
        </div>
    )
}

export default observer(ProgressDisplay);