const eyes = () => {
  const height = 800;
  const width = 800;
  const canvas = document.getElementById("eyes");
  const ctx = canvas.getContext("2d");

  function clearScreen() {
    ctx.fillStyle = "#ffc06e";
    ctx.fillRect(0, 0, width, height);
  }

  function calculateVector(mouseX, mouseY, eye, pupilSize) {
    const vector_i = eye.x + eye.size / 2 - mouseX;
    const vector_j = eye.y + eye.size / 2 - mouseY;
    const vector = { i: vector_i, j: vector_j };
    // Unit vector gives vector thats length is always 1
    const unitVector = getUnitVector(vector);
    // If vector length is less than eye radius, scale is
    // same as vector length otherwise it is same as eye radius
    const scale =
      getVectorLength(vector) < eye.size / 2 ? -getVectorLength(vector) : -eye.size / 2;
    // Vector start point
    const a = { i: eye.x + eye.size / 2, j: eye.y + eye.size / 2 };
    // Vector end point
    const b = {
      i: eye.x + eye.size / 2 + unitVector.i * scale,
      j: eye.y + eye.size / 2 + unitVector.j * scale
    };
    const pupil = { x: b.i, y: b.j, size: pupilSize };
    const white = { x: eye.x, y: eye.y, size: eye.size };
    drawEye(pupil, white);
    return { a, b };
  }

  function drawVector({ a, b }) {
    ctx.beginPath();
    ctx.moveTo(a.i, a.j);
    ctx.lineTo(b.i, b.j);
    ctx.closePath();
    ctx.stroke();
  }

  function getUnitVector(vector) {
    const vectorLength = getVectorLength(vector);
    const i = vector.i / vectorLength;
    const j = vector.j / vectorLength;
    return { i, j };
  }

  function getVectorLength(vector) {
    return Math.sqrt(vector.i ** 2 + vector.j ** 2);
  }

  function drawEye(pupil, white) {
    const offset = pupil.size / 2;
    ctx.fillStyle = "white";
    ctx.fillRect(white.x, white.y, white.size, white.size);
    ctx.fillStyle = "black";
    ctx.fillRect(pupil.x - offset, pupil.y - offset, pupil.size, pupil.size);
  }

  const LEFT = { x: 100, y: 50, size: 150 }; // Left eye position
  const RIGHT = { x: 550, y: 50, size: 150 }; // Right eye position
  const PUPIL_SIZE = 30;

  window.addEventListener("mousemove", () => {
    const x = event.clientX;
    const y = event.clientY;
    let vector;
    clearScreen();
    vector = calculateVector(x, y, LEFT, PUPIL_SIZE);
    //drawVector(vector);
    vector = calculateVector(x, y, RIGHT, PUPIL_SIZE);
    //drawVector(vector);
  });
};
