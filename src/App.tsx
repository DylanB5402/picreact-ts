import { observer } from "mobx-react-lite";
import { SyntheticEvent, useContext } from "react";
import Board from "./components/Board";
import GenerateBoardButton from "./components/GenerateBoardButton";
import ProgressDisplay from "./components/ProgressDisplay";
import GameContext from "./store/GameContext";
import GameStore from "./store/GameStore";



function App() {
  
  const gameStore : GameStore | null = useContext(GameContext);
  
  const onMouseUp = (event : SyntheticEvent) => {
    gameStore?.checkAllSelected();
    gameStore?.setClicks(false, false);
  }

  return (
    <div onMouseUp={onMouseUp}>
      <Board />
      <ProgressDisplay />
      <GenerateBoardButton/>
    </div>
  );
}

export default observer(App);
