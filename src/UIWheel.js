function UIWheel(config) {
	var self = this;

	this.config = config;
	this.angle = config.initialAngle || 0;

	this.pivotElement = document.createElement('canvas');
	this.pivotElement.width = 90;
	this.pivotElement.height = 90;
	$(this.pivotElement).addClass('UIWheel_Pivot');
	$(this.config.container).append(this.pivotElement);

	$(this.config.container).append(this.pivotElement);

	this.labelElement = document.createElement('div');
	$(this.labelElement).addClass('UIWheel_Label');
	$(this.config.container).append(this.labelElement);
	
	this.handleElement = document.createElement('div');
	$(this.handleElement).addClass('ui-widget-content');
	$(this.handleElement).addClass('UIWheel_Handle');
	$(this.config.container).append(this.handleElement);

	$(this.pivotElement).bind('click', function(event) {
		self._setAngle(event);
	});
	$(this.handleElement).draggable({
		drag: function(event, ui) {
			self._setAngle(event, ui);
		}
	});

	this.renderBounds();
	this.draw();
}

UIWheel.prototype._setAngle = function(event, ui) {
	var mouse = Vector.create([event.pageX, event.pageY, 0]);
	this.calculateAngle(mouse, ui || null);
};

UIWheel.prototype.calculateAngle = function(mouse, ui) {
	var w = this.pivotElement.width;
	var h = this.pivotElement.height;

	var pivotOffset = $(this.pivotElement).offset();
	var pivot = Vector.create([pivotOffset.left + w/2, pivotOffset.top + h/2, 0]);

	var direction = mouse.subtract(pivot);

	this.angle = direction.angleFrom(Vector.create([1,0,0]));
	if (direction.e(2) > 0)
		this.angle *= -1;

	if (this.config._change)
		this.config._change(this.angle);

	this.draw(ui, direction);
};

UIWheel.prototype.draw = function(ui, direction) {
	var w = this.pivotElement.width;
	var h = this.pivotElement.height;

	direction = direction || Vector.create([
		Math.cos(this.angle),
		-Math.sin(this.angle),
		0
	]);
	
	direction = direction.toUnitVector().multiply(this.config.pivotRadius);

	var x = w/2 + direction.e(1) - this.config.handleRadius;
	var y = h/2 + direction.e(2) - this.config.handleRadius;

	if (ui) {
		ui.position.left = x;
		ui.position.top = y;
	} else {
		ui = $(this.handleElement);
		ui.css('left', x);
		ui.css('top', y);
	}

	$(this.labelElement).html(Math.floor(this.angle*180/Math.PI) + '&deg;');
};

UIWheel.prototype.renderBounds = function() {
	var render = this.pivotElement.getContext('2d');

	var w = this.pivotElement.width;
	var h = this.pivotElement.height;

	render.strokeStyle = 'hsl(160,10%,50%)';
	render.fillStyle = this.config.pivotFillStyle || 'white';
	render.lineCap = 'round';
	render.lineJoin = 'round';
	render.lineWidth = this.config.handleRadius;

	render.beginPath();
	render.arc(w/2,h/2, this.config.pivotRadius, 0,Math.PI*2, true);
	render.closePath();
	render.fill();
	render.stroke();
};
