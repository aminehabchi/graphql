export function Circle(svg, r, cx, cy, stroke, strokeW, fill) {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", r);
  circle.setAttribute("stroke", stroke);
  circle.setAttribute("stroke-width", strokeW);
  circle.setAttribute("fill", fill);

  svg.appendChild(circle);
  return circle;
}

export function Line(svg, x1, y1, x2, y2, stroke, strokeW) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", stroke);
  line.setAttribute("stroke-width", strokeW);
  svg.appendChild(line);
  return line;
}
export function Text(svg, x, y, angle,value) {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

  text.setAttribute("y", y);

  text.textContent = value.slice(6);

  svg.appendChild(text);

  if (angle != 180 && angle != 360) {
    if (angle > 180) {
      text.setAttribute("x", x - text.getBBox().width - 20);
    } else {
      text.setAttribute("x", x + 20);
    }
  } else {
    text.setAttribute("x", x - text.getBBox().width / 2);
    if (angle == 180) {
      text.setAttribute("y", y + 20);
    } else {
      text.setAttribute("y", y - 10);
    }
  }
  return text;
}
