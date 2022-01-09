let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColorContainer = document.querySelectorAll(".pencil-color");
let pencilWidthElement = document.querySelector(".pencil-width");
let eraserWidthElement = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let pencilColor = "purple";
let eraserColor = "white";
let pencilWidth = pencilWidthElement.value;
let eraserWidth = eraserWidthElement.value;

// Track Data
let undoRedoTracker = [];
let track = 0;

let mouseDown = false;

let tool = canvas.getContext("2d");

tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth;

canvas.addEventListener("mousedown", (e) => {
  mouseDown = true;
  tool.beginPath();
  tool.moveTo(e.clientX, e.clientY);
});
pencilWidthElement.addEventListener("chanage", (e) => {
  pencilWidth = pencilWidthElement.value;
  tool.strokeStyle = pencilWidth;
});

canvas.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    tool.lineTo(e.clientX, e.clientY);
    tool.stroke();
  }
});

canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;
  let url = canvas.toDataURL();
  undoRedoTracker.push(url);
  track = undoRedoTracker.length - 1;
});

// Undo And Redo
undo.addEventListener("click", (e) => {
  if (track > 0) track--;
  let data = {
    trackValue: track,
    undoRedoTracker,
  };
  undoRedoCanvas(data);
});
redo.addEventListener("click", (e) => {
  if (track < undoRedoTracker.length - 1) track++;
  let data = {
    trackValue: track,
    undoRedoTracker,
  };
  undoRedoCanvas(data);
});

function undoRedoCanvas(trackObj) {
  track = trackObj.trackValue;
  undoRedoTracker = trackObj.undoRedoTracker;

  let url = undoRedoTracker[track];
  let img = new Image(); // new image reference element
  img.src = url;
  img.onload = (e) => {
    tool.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

// Select different color
pencilColorContainer.forEach((colorElem) => {
  colorElem.addEventListener("click", (e) => {
    let color = colorElem.classList[0];
    pencilColor = color;
    tool.strokeStyle = pencilColor;
  });
});

// Select pencil width
pencilWidthElement.addEventListener("change", (e) => {
  pencilWidth = pencilWidthElement.value;
  tool.lineWidth = pencilWidth;
});

// select eraser width
eraserWidthElement.addEventListener("change", (e) => {
  eraserWidth = eraserWidthElement.value;
  tool.lineWidth = eraserWidth;
});

eraser.addEventListener("click", (e) => {
  if (eraserFlag) {
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserWidth;
  } else {
    tool.strokeStyle = pencilColor;
    tool.lineWidth = pencilWidth;
  }
});

// Download
download.addEventListener("click", (e) => {
  let url = canvas.toDataURL();

  let a = document.createElement("a");
  a.href = url;
  a.download = "task.jpg";
  a.click();
});
