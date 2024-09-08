import { fabric } from 'fabric';


export const createRectangle = (color) => {
  return new fabric.Rect({
    left: 100,
    top: 100,
    fill: color,
    width: 120,
    height: 120,
    hasControls: true,
    hasBorders: true,
  });
};

// Function to add a circle
export const createCircle = (color) => {
  return new fabric.Circle({
    radius: 20,
    fill: color,
    left: 100,
    top: 100,
    hasControls: true,
    hasBorders: true,
  });
};

// Function to add a triangle
export const createTriangle = (color) => {
  return new fabric.Triangle({
    width: 20,
    height: 30,
    fill: color,
    left: 50,
    top: 50,
    hasControls: true,
    hasBorders: true,
  });
};

// Function to add a polygon
export const createPolygon = (color) => {
  return new fabric.Polygon(
    [
      { x: 100, y: 100 },
      { x: 150, y: 50 },
      { x: 200, y: 100 },
      { x: 150, y: 150 },
    ],
    {
      fill: color,
      left: 200,
      top: 200,
      hasControls: true,
      hasBorders: true,
    }
  );
};
