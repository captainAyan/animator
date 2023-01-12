import { useEffect, useRef } from "react";

export default function Editor({
  numberOfColumnsAndRows,
  cellWidth,
  frames,
  setFrames,
  currentFrameIndex,
}) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  let currentFrame = frames[currentFrameIndex];

  function setCanvasRef(ref) {
    if (!ref) return;
    canvasRef.current = ref;
    contextRef.current = ref.getContext("2d");
    initEventListener();
  }

  function initEventListener() {
    const mouseClickListener = (e) => {
      if (e.which === 1 || e.which === 3) {
        const point = computePointInCanvas(e.clientX, e.clientY);

        if (e.which === 3) contextRef.current.fillStyle = "#ffffff";
        else contextRef.current.fillStyle = "#ff5599";

        // gets rid of useless renders
        if (
          currentFrame.grid[parseInt(point.y / cellWidth)][
            parseInt(point.x / cellWidth)
          ] !== contextRef.current.fillStyle
        ) {
          currentFrame.grid[parseInt(point.y / cellWidth)][
            parseInt(point.x / cellWidth)
          ] = contextRef.current.fillStyle;

          const newFrames = frames.map((frame, i) => {
            console.log(i, i === currentFrameIndex);
            return i === currentFrameIndex ? currentFrame : frame;
          });
          setFrames(newFrames);
        }
      }
    };
    canvasRef.current.addEventListener("click", mouseClickListener);
    canvasRef.current.addEventListener("mousemove", mouseClickListener);
    canvasRef.current.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      mouseClickListener(e);
    });
  }

  function computePointInCanvas(clientX, clientY) {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect();
      return {
        x: parseInt(clientX - boundingRect.left),
        y: parseInt(clientY - boundingRect.top),
      };
    } else return null;
  }

  // this will just draw the image according to whats in the frame object
  useEffect(() => {
    for (let i = 0; i < currentFrame.numberOfColumnsAndRows; i++) {
      for (let j = 0; j < currentFrame.numberOfColumnsAndRows; j++) {
        contextRef.current.fillStyle = currentFrame.grid[i][j];

        contextRef.current.fillRect(
          j * cellWidth,
          i * cellWidth,
          cellWidth,
          cellWidth
        );
      }
    }
  }, [frames, currentFrameIndex]);

  const containerStyle = {
    border: "20px solid #75c3ff",
    width: numberOfColumnsAndRows * cellWidth,
    height: numberOfColumnsAndRows * cellWidth,
    borderRadius: "20px",
    background: "#75c3ff",
  };

  const canvasStyle = {
    borderRadius: "10px",
  };

  return (
    <div style={containerStyle}>
      <canvas
        width={numberOfColumnsAndRows * cellWidth}
        height={numberOfColumnsAndRows * cellWidth}
        ref={setCanvasRef}
        style={canvasStyle}
      />
    </div>
  );
}
