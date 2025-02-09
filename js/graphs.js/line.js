import { formatDate, sleep, getday, formatBytes } from "./helpers.js";
import { Line, Circle } from "./svg.js";
let svg;
let cords;

export async function createLineGraphs(arr, xp, level) {
  setupSvg();
  let text = document.getElementById("textXP");
  text.setAttribute("fill", "white");
  document.getElementById("level").textContent = "Level " + level;
  document.getElementById("xp").textContent = formatBytes(xp);
  arr.sort((a, b) => a[2] - b[2]);

  let fisrtday = arr[0][2];
  let lastday = arr[arr.length - 1][2];

  let maxY = getday(lastday) - getday(fisrtday);
  let maxX = xp;

  let p1 = [10, 10];
  let p2 = [10, cords.height - 10];
  let p3 = [cords.width - 10, cords.height - 10];

  let lineNbr = 5;
  let space = (p2[1] - p1[1]) / lineNbr;
  let add = space;
  for (let i = 0; i < lineNbr - 1; i++) {
    Line(svg, p1[0], p1[1] + add, p3[0], p1[1] + add, "#FFFFFF", 0.5);
    add += space;
  }

  /////////////////////////////////////////////////////////////////////

  let x0 = p2[0];
  let y0 = p2[1];

  let width = p3[0] - p2[0] - 10;
  let height = p2[1] - p1[1] - 50;

  let Total = 0;
  let totalXpInday = 0;
  let lastPoint = [x0, y0];

  ///////////////////////////////////////////////////////////////////
  for (let i = 0; i < arr.length; i++) {
    let point = arr[i];
    totalXpInday += point[1];
    Total += point[1];
    if (i != arr.length - 1 && getday(point[2]) == getday(arr[i + 1][2])) {
      continue;
    }
    text.textContent = point[0] + " +" + formatBytes(point[1]);
    // await sleep(50);

    let day = getday(point[2]) - getday(fisrtday);

    let Y = Math.floor((Total * height) / maxX);
    let X = Math.floor((day * width) / maxY);

    let p = Circle(svg, 2.5, x0 + X, y0 - Y, "none", "0", "black");

    p.dataset.xp = formatBytes(point[1]);
    p.onmouseover = () => {
      p.setAttribute("fill", "white");
      text.textContent =
        point[0] + " +" + p.dataset.xp + "  " + formatDate(point[2]);
    };
    p.onmouseout = () => {
      p.setAttribute("fill", "black");
    };
    totalXpInday = 0;
    if (i != 0) {
      Line(svg, lastPoint[0], lastPoint[1], x0 + X, lastPoint[1], "#FFFFFF", 2);
      Line(svg, x0 + X, lastPoint[1], x0 + X, y0 - Y, "#FFFFFF", 2);
      lastPoint = [x0 + X, y0 - Y];
    }
  }
}

function setupSvg() {
  svg = document.getElementById("lineGraph");
  svg.innerHTML = `<text id="textXP" x="20" y="50">Wha's Up</text>`;
  svg.setAttribute("height", "500");
  svg.setAttribute("width", "600");

  cords = svg.getBoundingClientRect();
}
