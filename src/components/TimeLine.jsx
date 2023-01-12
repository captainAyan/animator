import Thumbnail from "./Thumbnail";

export default function TimeLine({ frames, cellWidth, onFrameSelection }) {
  const timeLineScrollStyle = {
    backgroundColor: "#bbb",
    overflow: "auto",
    whiteSpace: "nowrap",
  };

  return (
    <div style={timeLineScrollStyle}>
      {frames.map((frame, i) => (
        <Thumbnail
          key={i}
          title={`Frame ${i}`}
          numberOfColumnsAndRows={frame.numberOfColumnsAndRows}
          cellWidth={cellWidth}
          frame={frame}
          onClick={() => {
            onFrameSelection(i);
            console.log(frame);
          }}
        />
      ))}
    </div>
  );
}
