let toolsContainer = document.querySelector(".tools-container");
let optionsContainer = document.querySelector(".options-container");
let pencilContainer = document.querySelector(".pencil-container");
let eraserContainer = document.querySelector(".eraser-container");

let flag = true;

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
