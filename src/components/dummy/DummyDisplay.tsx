import { observer } from "mobx-react"
import { useContext } from "react";
import GameContext from "../../store/GameContext";
import GameStore from "../../store/GameStore";

const DummyDisplay = () => {
    const gameStore : GameStore | null = useContext(GameContext);
    return (
        <>
            <p>{gameStore?.boardHeight}</p>
        </>
    )
}

export default observer(DummyDisplay);