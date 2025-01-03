import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
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

  return (
    <div className="container">
      <div className="header">
        <Header />
      </div>
      <div className="stage-container">
        <button onClick={() => addRect("square")}>+</button>
        <Stage width={600} height={400}>
          <Layer>
            {shapes.map((shape) => (
              <Rect
                key={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fill={shape.color}
                draggable
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
