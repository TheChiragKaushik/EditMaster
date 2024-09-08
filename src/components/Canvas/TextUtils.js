import { fabric } from 'fabric';

export const addText = (canvas, text, textRef, color) => {
  if (!canvas || text.trim() === "") return;

  const newText = new fabric.Textbox(text, {
    left: 100,
    top: 100,
    fontSize: 20,
    fill: color,
    editable: true,
    hasControls: true,
    hasBorders: true,
  });

  canvas.add(newText);
  newText.bringToFront(); // Ensure the text is at the front
  canvas.renderAll(); // Re-render the canvas
  textRef.current = newText; // Update text reference
};


export const bringTextToFront = (canvasInstance, textRef) => {
  if (textRef.current) {
    canvasInstance.bringToFront(textRef.current); // Bring the text to the front
    canvasInstance.renderAll(); // Re-render the canvas
  }
};

