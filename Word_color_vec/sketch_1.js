let data;
let vectors;
let position;

function preload(){
	data = loadJSON('xkcd.json');
}

function setup() {
	noCanvas();
	vectors = processData(data);
	// console.log(vectors);

	// position = createVector(random(255), random(255), random(255));
	position = createVector(0,0,255);
}

function draw(){
	let colorName = findNearest(position);
	let div = createDiv(colorName);
	let v = vectors[colorName];
	// div.style('background-color',`rgb(${v.x}, ${v.y}, ${v.z})`)
	div.style('color',`rgb(${v.x}, ${v.y}, ${v.z})`)
	let r = p5.Vector.random3D().mult(100);
	position.add(r);
	position.x = constrain(position.x, 0, 255);
	position.y = constrain(position.y, 0, 255);
	position.z = constrain(position.z, 0, 255);
	console.log('r', r);
	console.log("pos", position);
	frameRate(5);
}

function processData(data){
	let vectors = {};
	const colors = data.colors;
	for( let i = 0 ; i < colors.length; i++){
		let label = colors[i].color;
		let rgb = color(colors[i].hex); // p5 function
		vectors[label] = createVector(red(rgb), green(rgb), blue(rgb)); // p5 vector from the 3 rgb values
	}
	return vectors;  
}

function findNearest(v){
	let keys = Object.keys(vectors);
	keys.sort((a,b) => {
		let d1 = distance(v, vectors[a]);
		let d2 = distance(v, vectors[b]);
		return d1-d2;
	});
	// console.log(v);
	// console.log(vectors[keys[0]]);
	return keys[0];
}

function distance(v1, v2){
	// let x2 = (v1.x - v2.x)**2;
	// let y2 = (v1.y - v2.y)**2;
	// let z2 = (v1.z - v2.z)**2;
	// return Math.sqrt(x2 + y2 + z2);
	return p5.Vector.dist(v1,v2);
}