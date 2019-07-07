const eyes = () => {
    const height = 800;
    const width = 800;
    const canvas = document.getElementById("eyes");
    const ctx = canvas.getContext("2d");

    function clearScreen() {
        ctx.fillStyle = "#ffc06e";
        ctx.fillRect(0, 0, width, height);
    }

    function calculateVector(MOUSE_X, MOUSE_Y, EYE, PUPIL_SIZE) {
        const EYE_X = EYE.x;
        const EYE_Y = EYE.y;
        const EYE_SIZE = EYE.size;
        // mouse_x and y are mouse coordinates
        // eye_x and y are coordinates for the eye location
        const vector_i = EYE_X + EYE_SIZE / 2 - MOUSE_X;
        const vector_j = EYE_Y + EYE_SIZE / 2 - MOUSE_Y;
        const vector = { i: vector_i, j: vector_j };
        // Unit vector gives vector thats length is always 1
        const unitVector = getUnitVector(vector);
        // If vector length is less than eye radius, scale is
        // same as vector length otherwise it is same as eye radius
        const scale =
            getVectorLength(vector) < EYE_SIZE / 2
                ? -getVectorLength(vector)
                : -EYE_SIZE / 2;
        // Vector start point
        const A = { i: EYE_X + EYE_SIZE / 2, j: EYE_Y + EYE_SIZE / 2 };
        // Vector end point
        const B = {
            i: EYE_X + EYE_SIZE / 2 + unitVector.i * scale,
            j: EYE_Y + EYE_SIZE / 2 + unitVector.j * scale
        };
        const pupil = { x: B.i, y: B.j, size: PUPIL_SIZE };
        const white = { x: EYE_X, y: EYE_Y, size: EYE_SIZE };
        drawEye(pupil, white);
        return { A, B };
    }

    function drawVector({ A, B }) {
        ctx.beginPath();
        ctx.moveTo(A.i, A.j);
        ctx.lineTo(B.i, B.j);
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

    window.addEventListener("mousemove", () => {
        const left = { x: 100, y: 50, size: 150 }; // Left eye position
        const right = { x: 550, y: 50, size: 150 }; // Right eye position
        const PUPIL_SIZE = 30;
        const x = event.clientX;
        const y = event.clientY;
        let vector;
        clearScreen();
        vector = calculateVector(x, y, left, PUPIL_SIZE);
        //drawVector(vector);
        vector = calculateVector(x, y, right, PUPIL_SIZE);
        //drawVector(vector);
    });
};
