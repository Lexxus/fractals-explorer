(function(doc) {
    const fractals = window.fractals;
    
    if (typeof fractals !== 'object') {
        throw new Error('fractals is not defined');
    }

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
    while (el = el.offsetParent) {
        offsetX += el.offsetLeft;
        offsetY += el.offsetTop;
    }

    doF = false;

    doc.el('start').addEventListener('click', function() {
        draw(canvasFractal);
    }, false);

    doc.el('reset').addEventListener('click', function() {
        setFractal(currentFractal);
    }, false);

    canvas.addEventListener('mousedown', function(e) {
        if (e.button == 0 && (isSelecting = !doF)) {
            sX = e.pageX - offsetX;
            sY = e.pageY - offsetY;
            console.log('select start: '+sY +','+ sY);

            clear();
        }
        e.preventDefault();
    }, false);

    canvas.addEventListener('mousemove', function(e) {
        if (isSelecting) {
            sW = e.pageX - offsetX - sX;

            clear();
            ctx.strokeStyle = '#777777';
            ctx.strokeRect(sX, sY, sW, e.pageY - offsetY - sY);
        }
    });

    canvas.addEventListener('mouseup', function() {
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

    canvas.addEventListener('mousewheel', function(e) {
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

    canvas.addEventListener('selectstart', function() {
        console.log('select start');
        return false;
    }, false);

    doc.el('mandelbrot2').addEventListener('click', function() {
        setFractal('Mandelbrot2');
    });

    doc.el('mandelbrot3').addEventListener('click', function() {
        setFractal('Mandelbrot3');
    });

    doc.el('mandelbrot4').addEventListener('click', function() {
        setFractal('Mandelbrot4');
    });

    doc.el('mandelbrot5').addEventListener('click', function() {
        setFractal('Mandelbrot5');
    });

    doc.el('julia2').addEventListener('click', function() {
        setFractal('Julia2');
    });

    doc.el('julia3').addEventListener('click', function() {
        setFractal('Julia3');
    });

    doc.el('julia4').addEventListener('click', function() {
        setFractal('Julia4');
    });

    doc.el('julia5').addEventListener('click', function() {
        setFractal('Julia5');
    });

    setFractal(currentFractal, true);

    function clear() {
        ctx.clearRect(0,0, width, height);
    }

    function draw(canvas) {
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
            x: iX,
            y: iY,
            width: iW,
            n: iN,
            fn: getFn('code')
        }, function(){
            //console.timeEnd('fractal');
            benchEl.innerHTML = (Date.now() - time) / 1000;
            imgData = canvas.getContext('2d').getImageData(0,0, width, height);
        });
    }

    function setConfig(cfg) {
        doc.el('startX').value = cfg.x;
        doc.el('startY').value = cfg.y;
        doc.el('width').value = cfg.w;
    }

    function getFn(id) {
        return new Function('x', 'y', 'limit', doc.el(id).value);
    }

    function setFractal(name, notDraw) {
        if (fractals[name]) {
            currentFractal = name;
            doc.el('code').value = fractals[name].code;
            doc.el('formula').innerHTML = fractals[name].formula;
            setConfig(fractals[name].cfg);
            clear();
            var els = doc.el('fractals').childNodes;
            for (var i = 0, el; el = els[i]; ++i) {
                el.disabled = false;
            }
            doc.el(name.toLowerCase()).disabled = true;
            if (!notDraw) {
                draw(canvasFractal);
            }
        }
    }
}(document));