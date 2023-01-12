import { useState } from "react";
import "./App.css";
import Editor from "./components/Editor";
import TimeLine from "./components/TimeLine";
import Frame from "./util/Frame";

function App() {
  const [numberOfColumnsAndRows, setNumberOfColumnsAndRows] = useState(20);
  const [frames, setFrames] = useState([
    new Frame(numberOfColumnsAndRows),
    new Frame(numberOfColumnsAndRows),
    new Frame(numberOfColumnsAndRows),
    new Frame(numberOfColumnsAndRows),
  ]);

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  return (
    <div className="App">
      <Editor
        numberOfColumnsAndRows={numberOfColumnsAndRows}
        cellWidth={25}
        frames={frames}
        setFrames={setFrames}
        currentFrameIndex={currentFrameIndex}
        onFrameUpdate={(x, y, color) => {}}
      />

      <h4>Timeline</h4>
      <TimeLine
        frames={frames}
        cellWidth={5}
        onFrameSelection={setCurrentFrameIndex}
      />
    </div>
  );
}

export default App;
