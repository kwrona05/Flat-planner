import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import "../App.css";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isopenLegend, setIsOpenLegend] = useState<boolean>(false);
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

  const openForm = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  const openLegend = (): void => {
    setIsOpenLegend((prevState) => !prevState);
  };

  return (
    <div className="container">
      <div className="header">
        <button onClick={openForm}>Instruction</button>
        {isOpen && (
          <form>
            <p>You can add new room by clicking '+' button</p>
            <p>
              You can remove room by clicking on it and then clicking remove
            </p>
            <p>You can drag room on the canvas by holding the mouse on it</p>
            <p>You can see the legend by clicking 'Legend' button</p>
            <p>You can download your flat by clicking 'Download' button</p>
          </form>
        )}
        <button onClick={openLegend}>Legend</button>
        {isopenLegend && (
          <form>
            <p>Corridor - Gray</p>
            <p>Living room - Red</p>
            <p>Kitchen - Orange</p>
            <p>Bathroom - Blue</p>
            <p>Office - Green</p>
            <p>Bedroom - Yellow</p>
          </form>
        )}
        {/*remove button*/}
        {/*download button*/}
        {/*add button*/}
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
