import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import "../App.css";
import Header from "./Header";

type Shape = {
  id: string;
  x: number;
  y: number;
  name: string;
  width: number;
  height: number;
  color: string;
  type: "square";
};

const Main: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    if (transformerRef.current && selectedId) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  const handleDragEnd = (e: any, id: string) => {
    const updatedShapes = shapes.map((shape) =>
      shape.id === id ? { ...shape, x: e.target.x(), y: e.target.y() } : shape
    );
    setShapes(updatedShapes);
  };

  const handleTransformEnd = (e: any, id: string) => {
    const node = e.target;
    const updatedShapes = shapes.map((shape) =>
      shape.id === id
        ? {
            ...shape,
            x: node.x(),
            y: node.y(),
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY(),
          }
        : shape
    );
    setShapes(updatedShapes);
    node.scaleX(1); // Reset scale to avoid compounding
    node.scaleY(1);
  };

  const openMenuButton = (): void => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const addRect = (type: "square", name: string, color: string) => {
    const newShape: Shape = {
      id: `shape-${shapes.length + 1}`,
      width: 100,
      height: 100,
      x: 50,
      y: 50,
      name: "corridor",
      color: `${color}`,
      type: "square",
    };
    setShapes([...shapes, newShape]);
  };

  const removeSelectedShape = () => {
    if (selectedId) {
      const updatedShapes = shapes.filter((shape) => shape.id !== selectedId);
      setShapes(updatedShapes);
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
          <button onClick={openMenuButton}>+</button>
          {isMenuOpen && (
            <menu>
              <button onClick={() => addRect("square", "LivingRoom", "red")}>
                Living Room
              </button>
              <button onClick={() => addRect("square", "Corridor", "gray")}>
                Corridor
              </button>
              <button onClick={() => addRect("square", "Bedroom", "yellow")}>
                Bedroom
              </button>
              <button onClick={() => addRect("square", "Kitchen", "orange")}>
                Kitchen
              </button>
              <button onClick={() => addRect("square", "Bathroom", "blue")}>
                Bathroom
              </button>
              <button onClick={() => addRect("square", "Office", "green")}>
                Office
              </button>
            </menu>
          )}
          <button onClick={removeSelectedShape} disabled={!selectedId}>
            Remove
          </button>
          <button onClick={handleExport}>Export</button>
        </div>
        <Stage width={1000} height={600} ref={stageRef}>
          <Layer>
            {shapes.map((shape) => (
              <Rect
                key={shape.id}
                id={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fill={shape.color}
                draggable
                onClick={() => handleSelect(shape.id)}
                onDragEnd={(e) => handleDragEnd(e, shape.id)}
                onTransformEnd={(e) => handleTransformEnd(e, shape.id)}
              />
            ))}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Main;
