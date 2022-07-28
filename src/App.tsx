import Board from "./components/Board";
import GenerateBoardButton from "./components/GenerateBoardButton";
import ProgressDisplay from "./components/ProgressDisplay";



function App() {
  return (
    <>
      <Board />
      <ProgressDisplay />
      <GenerateBoardButton/>
    </>
  );
}

export default App;
