import { observer } from "mobx-react"
import { useContext } from "react";
import GameContext from "../store/GameContext";
import GameStore from "../store/GameStore";
import {Button} from 'reactstrap';
import './Board.css'

const GenerateBoardButton = () => {
    const gameStore : GameStore | null = useContext(GameContext);

    return (
        <Button
            onClick={gameStore?.resetBoard}
            id='newGame'
        >
            New Game 
        </Button>
    )
}

export default observer(GenerateBoardButton);