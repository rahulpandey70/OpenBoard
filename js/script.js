let toolsContainer = document.querySelector(".tools-container");
let optionsContainer = document.querySelector(".options-container");
let pencilContainer = document.querySelector(".pencil-container");
let eraserContainer = document.querySelector(".eraser-container");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".note");

let flag = true;
let pencilFlag = false;
let eraserFlag = false;

optionsContainer.addEventListener("click", (e) => {
  flag = !flag;

  if (flag) {
    openTools();
  } else {
    closeTools();
  }
});

function openTools() {
  let iconElem = optionsContainer.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsContainer.style.display = "flex";
}

function closeTools() {
  let iconElem = optionsContainer.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-times");
  toolsContainer.style.display = "none";
  pencilContainer.style.display = "none";
  eraserContainer.style.display = "none";
}

pencil.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag;
  if (pencilFlag) {
    pencilContainer.style.display = "block";
  } else {
    pencilContainer.style.display = "none";
  }
});

eraser.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag;
  if (eraserFlag) {
    eraserContainer.style.display = "flex";
  } else {
    eraserContainer.style.display = "none";
  }
});

sticky.addEventListener("click", (e) => {
  let stickyContainer = document.createElement("div");
  stickyContainer.setAttribute("class", "sticky-note-container");
  stickyContainer.innerHTML = `
    <div class="header-container">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-container">
        <textarea></textarea>
    </div>
    `;

  document.body.appendChild(stickyContainer);

  let minimize = stickyContainer.querySelector(".minimize");
  let remove = stickyContainer.querySelector(".remove");
  noteAction(minimize, remove, stickyContainer);

  stickyContainer.onmousedown = function (event) {
    dragAndDrop(stickyContainer, event);
  };

  stickyContainer.ondragstart = function () {
    return false;
  };
});

// minimize and remove
function noteAction(minimize, remove, stickyContainer) {
  minimize.addEventListener("click", (e) => {
    let noteContainer = stickyContainer.querySelector(".note-container");
    let display = getComputedStyle(noteContainer).getPropertyValue("display");
    if (display === "none") {
      noteContainer.style.display = "block";
    } else {
      noteContainer.style.display = "none";
    }
  });
  remove.addEventListener("click", (e) => {
    stickyContainer.remove();
  });
}

// Drag and Drop functionality
function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;
  document.body.append(element);

  moveAt(event.pageX, event.pageY);

  // moves the element at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the element on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the element, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}
