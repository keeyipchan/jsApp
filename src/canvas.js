function renderTriangle(config) {
	var canvas = document.createElement('canvas');
	var w = canvas.width = 200;
	var h = canvas.height = 200;

	var render = canvas.getContext('2d');
	
	render.fillStyle = config.fillStyle || 'white';
	render.strokeStyle = config.strokeStyle || 'blue';
	render.beginPath();
		render.moveTo(w/2, 0);
		render.lineTo(w, h);
		render.lineTo(0, h);
	render.closePath();
	render.fill();
	render.stroke();

	return canvas;
}

function renderCross(canvas) {
	var w = canvas.width;
	var h = canvas.height;
	var r = 4;
	var l = 10;

	var render = canvas.getContext('2d');
	
	render.strokeStyle = 'hsl(160,10%,30%)';
	render.moveTo(w/2, h/2-l);
	render.lineTo(w/2, h/2+l);
	render.moveTo(w/2-l, h/2);
	render.lineTo(w/2+l, h/2);
	render.stroke();

	return canvas;
}


