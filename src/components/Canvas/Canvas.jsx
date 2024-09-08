import { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import {
  createRectangle,
  createCircle,
  createTriangle,
  createPolygon,
} from "./Shapes.js";
import { addText, bringTextToFront } from "./TextUtils.js";
import { loadBackgroundImage } from "./BackGroundImage.js";
import { logObjectAttributes } from "./CanvasUtils.js"; // Import the logging function

const Canvas = ({ imageURL }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [text, setText] = useState("");
  const textRef = useRef(null);
  const [isObjectSelected, setIsObjectSelected] = useState(false);
  const [color, setColor] = useState("black");
  const [drawingMode, setDrawingMode] = useState(false);

  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      selection: true,
      isDrawingMode: false,
    });
    setCanvas(canvasInstance);

    const handleDblClick = (e) => {
      const target = e.target;
      if (target && (target.type === "textbox" || target.type === "text")) {
        target.enterEditing();
        target.setCoords();
        bringTextToFront(canvasInstance, textRef);
        canvasInstance.renderAll();
      }
    };

    const handleObjectAdded = (e) => {
      logObjectAttributes(e.target); // Log the attributes of the newly added object
      bringTextToFront(canvasInstance, textRef);
    };

    canvasInstance.on("object:added", handleObjectAdded);
    canvasInstance.on("mouse:dblclick", handleDblClick);

    const handleSelection = () => {
      setIsObjectSelected(!!canvasInstance.getActiveObject());
    };

    canvasInstance.on("selection:created", handleSelection);
    canvasInstance.on("selection:updated", handleSelection);
    canvasInstance.on("selection:cleared", () => setIsObjectSelected(false));

    return () => {
      canvasInstance.off("object:added", handleObjectAdded);
      canvasInstance.off("mouse:dblclick", handleDblClick);
      canvasInstance.off("selection:created", handleSelection);
      canvasInstance.off("selection:updated", handleSelection);
      canvasInstance.off("selection:cleared");
      canvasInstance.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvas || !imageURL) return;
    loadBackgroundImage(canvasRef, canvas, imageURL);
  }, [canvas, imageURL]);

  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.color = color;
    }
  }, [color, canvas]);

  const addDrawing = () => {
    if (!canvas) return;
    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = 10;
    canvas.isDrawingMode = !canvas.isDrawingMode;
    setDrawingMode(canvas.isDrawingMode);
  };

  const addShape = (shape) => {
    if (!canvas) return;
    canvas.add(shape);
  };

  const removeObject = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
    }
  };

  const downloadImage = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited-image.png";
    link.click();
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4">
        <canvas
          className="border-4 border-gray-700 shadow-lg rounded-lg"
          width="600"
          height="400"
          ref={canvasRef}
        ></canvas>
      </div>
      <div className="flex-1 p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <select
            value={color} 
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="" disabled>
              Select a color
            </option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="purple">Purple</option>
            <option value="pink">Pink</option>
            <option value="brown">Brown</option>
            <option value="gray">Gray</option>
            <option value="black">Black</option>
          </select>

          <button
            onClick={addDrawing}
            className={`px-4 py-2 bg-gradient-to-r ${
              drawingMode
                ? "from-red-500 to-pink-600"
                : "from-purple-500 to-indigo-600"
            } text-white rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105`}
          >
            {drawingMode ? "Stop Drawing" : "Draw"}
          </button>

          <button
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-xl hover:bg-indigo-700 transition-transform transform hover:scale-105"
            onClick={() => addShape(createRectangle(color))}
          >
            Add Rectangle
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-md hover:shadow-xl hover:bg-teal-700 transition-transform transform hover:scale-105"
            onClick={() => addShape(createCircle(color))}
          >
            Add Circle
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg shadow-md hover:shadow-xl hover:bg-orange-700 transition-transform transform hover:scale-105"
            onClick={() => addShape(createTriangle(color))}
          >
            Add Triangle
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-lg shadow-md hover:shadow-xl hover:bg-red-700 transition-transform transform hover:scale-105"
            onClick={() => addShape(createPolygon(color))}
          >
            Add Polygon
          </button>
        </div>
        <input
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
        <div className="grid grid-cols-2 gap-4">
          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-xl hover:bg-indigo-700 transition-transform transform hover:scale-105"
            onClick={() => addText(canvas, text, textRef, color)}
          >
            Add Text
          </button>
          <button
            className={`px-4 py-2 text-white rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              isObjectSelected
                ? "bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-xl hover:bg-pink-700"
                : "bg-gradient-to-r from-gray-500 to-gray-700 cursor-not-allowed"
            }`}
            onClick={removeObject}
            disabled={!isObjectSelected}
          >
            Remove Object
          </button>
        </div>
        <button
          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg shadow-md hover:shadow-xl hover:bg-green-700 transition-transform transform hover:scale-105"
          onClick={downloadImage}
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default Canvas;
