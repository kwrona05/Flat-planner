import React, { useState, useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";
import "../App.css";
import Header from "./Header";

type Shape = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  type: "square";
};

const Main: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const stageRef = useRef<any>(null);

  const handleDragEnd = (e: any, id: string) => {
    const updateShapes = shapes.map((shape) =>
      shape.id === id ? { ...shape, x: e.target.x(), y: e.target.y() } : shape
    );
    setShapes(updateShapes);
  };

  const addRect = (type: "square") => {
    const newShape: Shape = {
      id: `shape-${shapes.length + 1}`,
      width: 100,
      height: 100,
      x: 50,
      y: 50,
      color: "gray",
      type: "square",
    };
    setShapes([...shapes, newShape]);
  };

  const removeSelectedShape = () => {
    if (selectedId) {
      const updateShapes = shapes.filter((shape) => shape.id !== selectedId);
      setShapes(updateShapes);
      setSelectedId(null);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const downloadButton = (uri: string, name: string) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      downloadButton(uri, "stage-export.png");
    } else {
      console.error("stageRef.current is null");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <Header />
      </div>
      <div className="stage-container">
        <div>
          <button onClick={() => addRect("square")}>+</button>
          <button onClick={removeSelectedShape} disabled={!selectedId}>
            Remove
          </button>
          <button onClick={handleExport}>Export</button>
        </div>
        <Stage width={1000} height={600} ref={stageRef}>
          {/* Dodano ref do Stage */}
          <Layer>
            {shapes.map((shape) => (
              <Rect
                key={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fill={shape.id === selectedId ? "red" : shape.color}
                draggable
                onClick={() => handleSelect(shape.id)}
                onDragEnd={(e) => handleDragEnd(e, shape.id)}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Main;
