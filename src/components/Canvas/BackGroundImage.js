import { fabric } from "fabric";

export const loadBackgroundImage = (canvasRef, canvas, url) => {
    fabric.Image.fromURL(
      url,
      (img) => {
        if (img) {
          const canvasWidth = canvasRef.current.width;
          const canvasHeight = canvasRef.current.height;

          img.scaleToWidth(canvasWidth);
          img.scaleToHeight(canvasHeight);

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: canvasWidth / img.width,
            scaleY: canvasHeight / img.height,
            originX: "left",
            originY: "top",
          });

          console.log("Background image set:", img);
        } else {
          console.error("Failed to load image");
        }
      },
      { crossOrigin: "anonymous" }
    );
  };