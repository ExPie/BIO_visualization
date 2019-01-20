var WIDTH, HEIGHT, ctx;
var inProgress = false;

var dmA, dmB, dmC, dA, dB, dC;

var alpha = 5,
	alpha0 = 0.001 * alpha,
	Kd = 10,
	delta_m = 0.1,
	delta_p = 0.1,
	n = 2,
	beta = 1;


var t_end = 10000,
	dt = 0.1,
	t = 0;

var A = 12,
	B = 0,
	C = 56,
	mA = 0,
	mB = 0,
	mC = 0;

function main(argument) {
	var c = document.getElementById("canvas");
	WIDTH = c.width;
	HEIGHT = c.height;
	ctx = c.getContext("2d");

	console.log(WIDTH);

	drawCircle(50, 50, [255, 0, 0], 1);

	console.log(A);
	console.log(B);
	console.log(C);

	console.log(mA);
	console.log(mB);
	console.log(mC);
}

function start_animate() {
	if(!inProgress) {
		readArguments();
	}
	inProgress = true;

	ctx.clearRect(0, 0, WIDTH, HEIGHT);

	drawCircle(200, 200, [255, 0, 0], A/3);
	drawCircle(400, 200, [0, 255, 0], B/3);
	drawCircle(600, 200, [0, 0, 255], C/3);


	drawCircle(200, 400, [199, 26, 26], mA);
	drawCircle(400, 400, [26, 199, 26], mB);
	drawCircle(600, 400, [26, 26, 199], mC);

	calculateIncrement();
	t += dt;

	if(t < 10000 && inProgress) {
		requestAnimationFrame(start_animate);
	}
}

function readArguments() {
	A = parseFloat(document.getElementById("var_A").value);
	B = parseFloat(document.getElementById("var_B").value);
	C = parseFloat(document.getElementById("var_C").value);
	mA = parseFloat(document.getElementById("var_mA").value);
	mB = parseFloat(document.getElementById("var_mB").value);
	mC = parseFloat(document.getElementById("var_mC").value);

	alpha = parseFloat(document.getElementById("param_alpha").value);
	alpha0 = parseFloat(document.getElementById("param_alpha_0").value);
	Kd = parseFloat(document.getElementById("param_Kd").value);
	delta_m = parseFloat(document.getElementById("param_delta_m").value);
	delta_p = parseFloat(document.getElementById("param_delta_p").value);
	n = parseFloat(document.getElementById("param_n").value);
	beta = parseFloat(document.getElementById("param_beta").value);
}

function calculateIncrement() {
	dmA = alpha/(1 + Math.pow(C/Kd, n)) + alpha0 - delta_m * mA;
    dmB = alpha/(1 + Math.pow(A/Kd, n)) + alpha0 - delta_m * mB;
    dmC = alpha/(1 + Math.pow(B/Kd, n)) + alpha0 - delta_m * mC;
    
    dA = beta * mA - delta_p * A;
    dB = beta * mB - delta_p * B;
    dC = beta * mC - delta_p * C;

    mA = mA + dt * dmA;
    mB = mB + dt * dmB;
    mC = mC + dt * dmC;
    A = A + dt * dA;
    B = B + dt * dB;
    C = C + dt * dC;
}

function drawCircle(px, py, color, power) {
	ctx.beginPath();
	ctx.arc(px, py, Math.round(power), 0, 2 * Math.PI, false);
	ctx.fillStyle = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 1)";
	ctx.fill();
	ctx.stroke();
}
