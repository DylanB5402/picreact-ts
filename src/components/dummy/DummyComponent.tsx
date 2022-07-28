import { observer } from "mobx-react"
import { useContext } from "react";
import GameContext from "../../store/GameContext";
import GameStore from "../../store/GameStore";

const DummyComponent = () => {
    const gameStore : GameStore | null = useContext(GameContext);

    const onButtonClick = () => {
        gameStore?.setBoardHeight(gameStore?.boardHeight + 1);
    }
    return (
        <>
            <p> Board Height </p>
            
            <button onClick={onButtonClick}>
                Increment Height
            </button>
        </>
    )
}

export default observer(DummyComponent);