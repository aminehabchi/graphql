import { Circle, Line, Text } from "./svg.js";
let svg;

let cords;
let limit = 10;
let start = 0;
let end = limit;

export function createPieChart(skills) {
  let arr = [...skills.entries()];

  createPie(arr, start, end);
}
export function createPie(arr) {
  setupSvg(arr);

  let min = cords.height;
  if (min > cords.width) {
    min = cords.width;
  }

  let r = min * 0.43;

  let cx = cords.width / 2;
  let cy = cords.height / 2;

  Circle(svg, r, cx, cy, "black", "2", "none");
  let end2 = end;
  if (end2 >= arr.length) {
    end2 = arr.length;
  }

  let angle = 360 / (end2 - start);
  let lastPointX = cx;
  let lastPointY = cy - r;
  let PathPoints = ``;
  let textPercentage = document.getElementById("textPercentage");

  for (let i = start; i < end2; i++) {
    let line = Line(svg, cx, cy, lastPointX, lastPointY, "black", 1);

    line.setAttribute("transform", `rotate(${angle} ${cx} ${cy})`);

    const matrix = line.getCTM();

    const newX2 = matrix.a * lastPointX + matrix.c * lastPointY + matrix.e;
    const newY2 = matrix.b * lastPointX + matrix.d * lastPointY + matrix.f;

    let scale = Number(arr[i][1]) / 100;

    if (i == start) {
      PathPoints += `M ${cx + (newX2 - cx) * scale} ${
        cy + (newY2 - cy) * scale
      }`;
    } else {
      PathPoints += `L ${cx + (newX2 - cx) * scale} ${
        cy + (newY2 - cy) * scale
      }`;
    }

    let point = Circle(
      svg,
      3,
      cx + (newX2 - cx) * scale,
      cy + (newY2 - cy) * scale,
      "none",
      0,
      "black"
    );

    point.addEventListener("mousemove", () => {
      textPercentage.textContent = arr[i][1] + "%";
    });
    point.addEventListener("mouseout", () => {
      setTimeout(() => {
        textPercentage.textContent = "What's Up";
      }, 400);
    });

    Text(svg, newX2, newY2, angle * (i - start + 1), arr[i][0]);

    lastPointX = newX2;
    lastPointY = newY2;
  }

  PathPoints += "Z";
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", PathPoints);
  path.setAttribute("fill", "#0052B4");
  path.style.opacity = "90%";
  svg.appendChild(path);
}
function setupSvg(arr) {
  svg = document.getElementById("pie");
  svg.innerHTML = `
  <text id="textPercentage" x="25" y="40">What's Up</text>
        <text class="Btn" id="Prev">Prev</text>
        <text class="Btn" id="Next">Next</text>
        `;
  let Next = document.getElementById("Next");
  let Prev = document.getElementById("Prev");
  Next.addEventListener("click", () => {
    if (end >= arr.length) {
      return;
    }
    start += limit;
    end += limit;
    createPie(arr, start, end);
  });
  Prev.addEventListener("click", () => {
    if (start <= 0) {
      return;
    }
    start -= limit;
    end -= limit;
    createPie(arr, start, end);
  });
  let h = 500;
  svg.setAttribute("height", h);
  cords = svg.getBoundingClientRect();
  let w = cords.width;

  Next.setAttribute("x", w - 50);
  Next.setAttribute("y", h - 10);

  Prev.setAttribute("x", "10");
  Prev.setAttribute("y", h - 10);
}
