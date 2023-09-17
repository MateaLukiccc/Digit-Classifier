//Initial references
let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let predictBtn = document.getElementById("predict-btn");
let predictable = 0;

//Events object
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

//Initially draw and erase would be false
let draw = false;
let erase = false;

//Detect touch device
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent(it would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

//make predictions
predictBtn.addEventListener("click", ()=>{
  html2canvas(document.getElementById("capture")).then(function (canvas) {

    var link = document.createElement("a");
    document.body.appendChild(link);
    link.download = "html_image.jpg";
    link.href = canvas.toDataURL("saved");
    link.target = '_blank';
    link.click();
});
});

//Create Grid
gridButton.addEventListener("click", () => {
  //Initially clear the grid (old grids cleared)
  container.innerHTML = "";
  predictable+=1
  //count variable for generating unique ids
  let count = 0;
  //loop for creating rows
  for (let i = 0; i < 28; i++) {
    //incrementing count by 2
    count += 2;
    //Create row div
    let div = document.createElement("div");
    div.classList.add("gridRow");
    //Create Columns
    for (let j = 0; j < 28; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      /* We need unique ids for all columns (for touch screen specifically) */
      col.setAttribute("id", `gridCol${count}`);

      /*
      For eg if deviceType = "mouse"
      the statement for the event would be events[mouse].down which equals to mousedown
      if deviceType="touch"
      the statement for event would be events[touch].down which equals to touchstart
       */

      col.addEventListener(events[deviceType].down, () => {
        //user starts drawing
        draw = true;
        //if erase = true then background = transparent else color
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = colorButton.value;
        }
      });

      col.addEventListener(events[deviceType].move, (e) => {
        /* elementFromPoint returns the element at x,y position of mouse */
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        ).id;
        //checker
        checker(elementId);
      });
      //Stop drawing
      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });
      //append columns
      div.appendChild(col);
    }
    //append grid to container
    container.appendChild(div);
  }
});
function checker(elementId) {
  let gridColumns = document.querySelectorAll(".gridCol");
  //loop through all boxes
  gridColumns.forEach((element) => {
    //if id matches then color
    if (elementId == element.id) {
      if (draw && !erase) {
        element.style.backgroundColor = colorButton.value;
      } else if (draw && erase) {
        element.style.backgroundColor = "transparent";
      }
    }
  });
}

//Erase Button
eraseBtn.addEventListener("click", () => {
  erase = true;
});

//Paint button
paintBtn.addEventListener("click", () => {
  erase = false;
});

window.onload = () => {
  //Initially clear the grid (old grids cleared)
  container.innerHTML = "";
  predictable+=1
  //count variable for generating unique ids
  let count = 0;
  //loop for creating rows
  for (let i = 0; i < 28; i++) {
    //incrementing count by 2
    count += 2;
    //Create row div
    let div = document.createElement("div");
    div.classList.add("gridRow");
    //Create Columns
    for (let j = 0; j < 28; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      /* We need unique ids for all columns (for touch screen specifically) */
      col.setAttribute("id", `gridCol${count}`);

      /*
      For eg if deviceType = "mouse"
      the statement for the event would be events[mouse].down which equals to mousedown
      if deviceType="touch"
      the statement for event would be events[touch].down which equals to touchstart
       */

      col.addEventListener(events[deviceType].down, () => {
        //user starts drawing
        draw = true;
        //if erase = true then background = transparent else color
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = colorButton.value;
        }
      });

      col.addEventListener(events[deviceType].move, (e) => {
        /* elementFromPoint returns the element at x,y position of mouse */
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        ).id;
        //checker
        checker(elementId);
      });
      //Stop drawing
      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });
      //append columns
      div.appendChild(col);
    }
    //append grid to container
    container.appendChild(div);
};}