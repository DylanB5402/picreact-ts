import { observer } from "mobx-react-lite";
import { SyntheticEvent, useContext } from "react";
import { Col, Container, Row } from "reactstrap";
import Board from "./components/Board";
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
    </div>
  );
}

export default observer(App);
