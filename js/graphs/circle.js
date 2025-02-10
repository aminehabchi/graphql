import { Circle } from "./svg.js";

export function CreateCircle(percentage, name) {
  let container = document.getElementById("passfail");

  let div = document.createElement("div");
  div.classList.add("ratio");
  let svg = document.createElement("svg");

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const visibleStroke = (percentage / 100) * circumference;
  const hiddenStroke = circumference - visibleStroke;

  let circle = Circle(svg, radius, 75, 75, "#0052B4", "7", "#e6f1fd");

  circle.setAttribute("stroke-dasharray", `${visibleStroke} ${hiddenStroke}`);
  circle.setAttribute("transform", "rotate(-90 75 75)");
  svg.style.width = "150px";
  svg.appendChild(circle);
  ///////////////

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", "50");
  text.setAttribute("y", "80");
  text.setAttribute("font-size", "18");
  text.setAttribute("fill", "black");
  text.textContent = percentage.toFixed(2).toString() + "%";

  ///////
  svg.appendChild(text);
  div.appendChild(svg);
  div.innerHTML += `<span>${name}</span>`;
  container.appendChild(div);
}
