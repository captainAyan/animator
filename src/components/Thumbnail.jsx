import { useEffect, useRef, useState } from "react";

export default function Thumbnail({
  title,
  numberOfColumnsAndRows,
  cellWidth,
  frame,
  onClick,
}) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [frameState, setFrameState] = useState(frame);

  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  function setCanvasRef(ref) {
    if (!ref) return;
    canvasRef.current = ref;
    contextRef.current = ref.getContext("2d");
  }

  useEffect(() => {
    for (let i = 0; i < frameState.numberOfColumnsAndRows; i++) {
      for (let j = 0; j < frameState.numberOfColumnsAndRows; j++) {
        contextRef.current.fillStyle = frameState.grid[i][j];

        contextRef.current.fillRect(
          j * cellWidth,
          i * cellWidth,
          cellWidth,
          cellWidth
        );
      }
    }
  });

  const containerStyle = {
    display: "inline-block",
    padding: "20px 20px 10px 20px",
    background: isHover ? "#999" : "",
    cursor: "pointer",
  };
  const canvasStyle = { border: "1px solid black" };
  const textStyle = { textAlign: "center" };

  return (
    <div
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <canvas
        width={numberOfColumnsAndRows * cellWidth}
        height={numberOfColumnsAndRows * cellWidth}
        style={canvasStyle}
        ref={setCanvasRef}
      />
      <p style={textStyle}>{title}</p>
    </div>
  );
}
