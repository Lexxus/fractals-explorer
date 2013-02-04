(function(doc){
	var fractals = {
		Mandelbrot2: {
			code: "var zX = x, zY = y, z = .0, n = 0,\n\
    zX2 = x*x, zY2 = y*y;\n\
while((zX2 + zY2) < 16 && n < limit){\n\
  z = zX2 - zY2 + x;\n\
  zY = ((zX * zY)*2) + y;\n\
  zX = z;\n\
  zX2 = zX*zX;\n\
  zY2 = zY*zY;\n\
  ++n;\n\
}\n\
return n;",
			cfg: {
				x: -2,
				y: 1.1,
				w: 2.5
			},
			formula: 'Z<sub>n+1</sub> = Z<sub>n</sub><sup>2</sup> + C; <small>Z<sub>0</sub> = 0, C = x + iy</small>'
		},
		Mandelbrot3: {
			code: "var zX = x, zY = y, z = .0, n = 0,\n\
    zX2 = x*x, zY2 = y*y;\n\
while((zX2 + zY2) < 16 && n < limit){\n\
  z = (zX2 - 3*zY2)*zX + x;\n\
  zY = (3*zX2 - zY2)*zY + y;\n\
  zX = z;\n\
  zX2 = zX*zX;\n\
  zY2 = zY*zY;\n\
  ++n;\n\
}\n\
return n;",
			cfg: {
				x: -1.5,
				y: 1.32,
				w: 3
			},
			formula: 'Z<sub>n+1</sub> = Z<sub>n</sub><sup>3</sup> + C; <small>Z<sub>0</sub> = 0, C = x + iy</small>'
		},
		Mandelbrot4: {
			code: "var zX = x, zY = y, z = .0, n = 0,\n\
    zX2 = x*x, zY2 = y*y;\n\
while((zX2 + zY2) < 16 && n < limit){\n\
  z = zX2*(zX2 - 6*zY2) + zY2*zY2 + x;\n\
  zY = 4*zX*zY*(zX2 - zY2) + y;\n\
  zX = z;\n\
  zX2 = zX*zX;\n\
  zY2 = zY*zY;\n\
  ++n;\n\
}\n\
return n;",
			cfg: {
				x: -1.5,
				y: 1.13,
				w: 2.6
			},
			formula: 'Z<sub>n+1</sub> = Z<sub>n</sub><sup>4</sup> + C; <small>Z<sub>0</sub> = 0, C = x + iy</small>'
		},
		Mandelbrot5: {
			code: "var zX = x, zY = y, z=.0, n=0,\n\
    zX2 = x*x, zY2 = y*y, zX4=.0, zY4=.0, zXY10=.0;\n\
while((zX2 + zY2) < 16 && n < limit){\n\
  zX4 = zX2*zX2;\n\
  zY4 = zY2*zY2;\n\
  zXY10 = 10*zX2 *zY2;\n\
  z = zX*(zX4 + 5 *zY4 - zXY10) + x;\n\
  zY = zY*(zY4 + 5 *zX4 - zXY10) + y;\n\
  zX = z;\n\
  zX2 = zX*zX;\n\
  zY2 = zY*zY;\n\
  ++n;\n\
}\n\
return n;",
			cfg: {
				x: -1.5,
				y: 1.13,
				w: 2.6
			},
			formula: 'Z<sub>n+1</sub> = Z<sub>n</sub><sup>5</sup> + C; <small>Z<sub>0</sub> = 0, C = x + iy</small>'
		},
		Julia2: {
			code: "var zX = x, zY = y, z = .0, n = 0,\n\
    zX2 = x*x, zY2 = y*y;\n\
while((zX2 + zY2) < 16 && n < limit){\n\
  z = zX2 - zY2 + .24;\n\
  zY = ((zX * zY)*2) - .56;\n\
  zX = z;\n\
  zX2 = zX*zX;\n\
  zY2 = zY*zY;\n\
  ++n;\n\
}\n\
return n;",
			cfg: {
				x: -1.3,
				y: 1.15,
				w: 2.64
			},
			formula: 'Z<sub>n+1</sub> = Z<sub>n</sub><sup>2</sup> + C; <small>Z<sub>0</sub> = x + iy, C = 0.24 - i0.56</small>'
		},
		Julia3: {
			code: "var zX = x, zY = y, z = .0, n = 0,\n\
    zX2 = x*x, zY2 = y*y;\n\
while((zX2 + zY2) < 16 && n < limit){\n\
  z = (zX2 - 3*zY2)*zX + .51111111;\n\
  zY = (3*zX2 - zY2)*zY - .10000000;\n\
  zX = z;\n\
  zX2 = zX*zX;\n\
  zY2 = zY*zY;\n\
  ++n;\n\
}\n\
return n;",
			cfg: {
				x: -1.3,
				y: 1.05,
				w: 2.45
			},
			formula: 'Z<sub>n+1</sub> = Z<sub>n</sub><sup>3</sup> + C; <small>Z<sub>0</sub> = x + iy, C = 0.51 - i0.1</small>'
		},
		Julia4: {
			code: "var zX = x, zY = y, z = .0, n = 0,\n\
    zX2 = x*x, zY2 = y*y;\n\
while((zX2 + zY2) < 16 && n < limit){\n\
  z = zX2*(zX2 - 6*zY2) + zY2*zY2 + .65;\n\
  zY = 4*zX*zY*(zX2 - zY2) - .2;\n\
  zX = z;\n\
  zX2 = zX*zX;\n\
  zY2 = zY*zY;\n\
  ++n;\n\
}\n\
return n;",
			cfg: {
				x: -1.3,
				y: 1.05,
				w: 2.45
			},
			formula: 'Z<sub>n+1</sub> = Z<sub>n</sub><sup>4</sup> + C; <small>Z<sub>0</sub> = x + iy, C = 0.65 - i0.2</small>'
		},
		Julia5: {
			code: "var zX = x, zY = y, z=.0, n=0,\n\
    zX2 = x*x, zY2 = y*y, zX4=.0, zY4=.0, zXY10=.0;\n\
while((zX2 + zY2) < 16 && n < limit){\n\
  zX4 = zX2*zX2;\n\
  zY4 = zY2*zY2;\n\
  zXY10 = 10*zX2 *zY2;\n\
  z = zX*(zX4 + 5 *zY4 - zXY10) + .7;\n\
  zY = zY*(zY4 + 5 *zX4 - zXY10) - .15;\n\
  zX = z;\n\
  zX2 = zX*zX;\n\
  zY2 = zY*zY;\n\
  ++n;\n\
}\n\
return n;",
			cfg: {
				x: -1.3,
				y: 1.1,
				w: 2.5
			},
			formula: 'Z<sub>n+1</sub> = Z<sub>n</sub><sup>5</sup> + C; <small>Z<sub>0</sub> = x + iy, C = 0.7 - i0.15</small>'
		}
	};

	doc.el = doc.getElementById;
	var canvas = doc.el('layer-1'),
		canvasFractal = doc.el('layer-0'),
		ctx = canvas.getContext('2d'),
		width = canvas.width, height = canvas.height,
		isSelecting = false,
		iX = parseFloat(doc.el('startX').value),
		iY = parseFloat(doc.el('startY').value),
		iW = parseFloat(doc.el('width').value),
		sX = 0, sY = 0, sW = 0,
		offsetX = canvas.offsetLeft, offsetY = canvas.offsetTop,
		imgData = null, zoom = 0,
		currentFractal = 'Mandelbrot2';

	var el = canvas;
	while(el = el.offsetParent) {
		offsetX += el.offsetLeft;
		offsetY += el.offsetTop;
	}

	doF = false;

	doc.el('start').addEventListener('click', function(){
		draw(canvasFractal);
	}, false);

	doc.el('reset').addEventListener('click', function(){
		setFractal(currentFractal);
	}, false);

	canvas.addEventListener('mousedown', function(e){
		if(e.button == 0 && (isSelecting = !doF)){
			sX = e.pageX - offsetX;
			sY = e.pageY - offsetY;
			console.log('select start: '+sY +','+ sY);

			clear();
		}
		e.preventDefault();
	}, false);

	canvas.addEventListener('mousemove', function(e){
		if(isSelecting){
			sW = e.pageX - offsetX - sX;

			clear();
			ctx.strokeStyle = '#777777';
			ctx.strokeRect(sX, sY, sW, e.pageY - offsetY - sY);
		}
	});

	canvas.addEventListener('mouseup', function(){
		if(!isSelecting) return;
		isSelecting = false;
		var k = iW / width;
		setConfig({
			x: iX + sX * k,
			y: iY - sY * k,
			w: sW * k
		})

		clear();
		draw(canvasFractal);
	}, false);

	canvas.addEventListener('mousewheel', function(e){
		console.log('mousewheel');
		console.log(e);
		if(!imgData || zoom >= 1000) return;
		zoom += e.wheelDelta;
		var x = e.pageX - offsetX,
			y = e.pageY - offsetY,
			k = width / 2000,
			nX = zoom * k / 2,
			nY = nX,
			ctx = doc.el('layer-0').getContext('2d');

		ctx.putImageData(
			imgData,
			nX, nY,
			0, 0,
			width, height
		);
	}, false);

	canvas.addEventListener('selectstart', function(){
		console.log('select start');
		return false;
	}, false);

	doc.el('mandelbrot2').addEventListener('click', function(){
		setFractal('Mandelbrot2');
	});

	doc.el('mandelbrot3').addEventListener('click', function(){
		setFractal('Mandelbrot3');
	});

	doc.el('mandelbrot4').addEventListener('click', function(){
		setFractal('Mandelbrot4');
	});

	doc.el('mandelbrot5').addEventListener('click', function(){
		setFractal('Mandelbrot5');
	});

	doc.el('julia2').addEventListener('click', function(){
		setFractal('Julia2');
	});

	doc.el('julia3').addEventListener('click', function(){
		setFractal('Julia3');
	});

	doc.el('julia4').addEventListener('click', function(){
		setFractal('Julia4');
	});

	doc.el('julia5').addEventListener('click', function(){
		setFractal('Julia5');
	});

	setFractal(currentFractal, true);

	function clear(){
		ctx.clearRect(0,0, width, height);
	}

	function draw(canvas){
		doF = true;
		iX = parseFloat(doc.el('startX').value);
		iY = parseFloat(doc.el('startY').value);
		iW = parseFloat(doc.el('width').value);
		iN = parseInt(doc.el('iterations').value);

		//console.time('fractal');
		var benchEl = doc.el('benchmark'),
			time = 0;
		benchEl.innerHTML = '...';
		time = Date.now();
		fractal(canvas, {
			x:iX,
			y:iY,
			width:iW,
			n: iN,
			fn: getFn('code')
		}, function(){
			//console.timeEnd('fractal');
			benchEl.innerHTML = (Date.now() - time) / 1000;
			imgData = canvas.getContext('2d').getImageData(0,0, width, height);
		});
	}

	function setConfig(cfg){
		doc.el('startX').value = cfg.x;
		doc.el('startY').value = cfg.y;
		doc.el('width').value = cfg.w;
	}

	function getFn(id){
		var code = 'var fn = function(x,y,limit){'
			+doc.el(id).value
			+'}';

		eval(code);
		return fn;
	}

	function setFractal(name, notDraw){
		if(!fractals[name]) return;
		currentFractal = name;
		doc.el('code').value = fractals[name].code;
		doc.el('formula').innerHTML = fractals[name].formula;
		setConfig(fractals[name].cfg);
		clear();
		var els = doc.el('fractals').childNodes;
		for(var i = 0, el; el = els[i]; ++i){
			el.disabled = false;
		}
		doc.el(name.toLowerCase()).disabled = true;
		if(!notDraw) draw(canvasFractal);
	}
}(document));