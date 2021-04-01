let bgColor = 0;

let dots = [];

function setup() {
	createCanvas(800, 800);
}

function draw() {
	background(bgColor);
	for(let i = 0; i < dots.length ; i++)
		dots[i].show()

	if(dots.length > 1) drawLine();
}

function mousePressed(){	
	let dot = new Dot(mouseX, mouseY);
	dots.push(dot);
}

function drawLine() {
	const lineParams= slope();
	const m = lineParams.m;
	const b = lineParams.b;

	const x1 = 10;
	const y1 = m * x1 + b;
	const x2 = windowWidth - 10;
	const y2 = m * x2 + b;
	
	line(x1, y1, x2, y2);
	strokeWeight(2); 	
	stroke(255);
}

function slope() {
	/* sum( (x-xavg)*(y-yavg) )
	   sum( x - xavg )^2
	*/
	const n = dots.length;
	let sumXs = 0;
	let sumYs = 0;
	let xavg = 0;
	let yavg = 0;

	for(let i = 0; i < dots.length ; i++){
		sumXs += dots[i].x;
		sumYs += dots[i].y;
	}
	xavg = sumXs/n;
	yavg = sumYs/n;

	let top = 0;
	let bottom = 0;
	for(let i = 0; i < n ; i++){
		let dot = dots[i];
		top += ((dot.x - xavg) * (dot.y - yavg));
		bottom += (dot.x - xavg)**2
	}
	const m = top/bottom;
	const b = yavg-xavg*m;
	return {'m': m, 'b': b};

}