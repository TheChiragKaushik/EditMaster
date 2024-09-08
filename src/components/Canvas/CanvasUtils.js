
export const logObjectAttributes = (obj) => {
  let attributes = {};

  if (obj.type === 'image') {
    attributes = {
      type: obj.type,
      src: obj.getSrc(),
      left: obj.left,
      top: obj.top,
      width: obj.width,
      height: obj.height,
    };
  } else if (obj.type === 'text' || obj.type === 'textbox') {
    attributes = {
      type: obj.type,
      text: obj.text,
      left: obj.left,
      top: obj.top,
      fontSize: obj.fontSize,
      fill: obj.fill,
    };
  } else if (obj.type === 'rect' || obj.type === 'circle' || obj.type === 'triangle' || obj.type === 'polygon') {
    attributes = {
      type: obj.type,
      left: obj.left,
      top: obj.top,
      width: obj.width,
      height: obj.height,
      fill: obj.fill,
      stroke: obj.stroke,
    };
  }

  console.log("Added Object Attributes:", attributes);
};
