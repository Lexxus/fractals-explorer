(function(doc) {
    const THREADS = 4;
    const SELECTING_RECT_COLOR = '#777777';
    const RATIO = 1.15;
    const fractals = window.fractals;

    if (typeof fractals !== 'object') {
        throw new Error('fractals is not defined');
    }

    const getEl = doc.getElementById.bind(doc);
    const canvas = getEl('layer-1');
    const canvasFractal = getEl('layer-0');
    const ctx = canvas.getContext('2d');
    const ctxFractal = canvasFractal.getContext('2d');
    const workers = [];

    const startXEl = getEl('startX');
    const startYEl = getEl('startY');
    const widthEl = getEl('width');
    const iterationsEl = getEl('iterations');
    const startBtn = getEl('start');
    const resetBtn = getEl('reset');
    const buttonsContainerEl = getEl('fractals');

    let width = canvas.width;
    let height = canvas.height;
    let isSelecting = false;
    let isInProgress = false;
    let iX = parseFloat(startXEl.value),
        iY = parseFloat(startYEl.value),
        iW = parseFloat(widthEl.value),
        iN = parseInt(iterationsEl.value, 10);
    let nextY = iY;
    let xStep = iW / width;

    let sX = 0, sY = 0, sW = 0;
    let offsetX = canvas.offsetLeft,
        offsetY = canvas.offsetTop,
        zoom = 0,
        currentFractal = fractals[0];
    let currentRow = 0;
    let fractalFn;

    let el = canvas;
    while (el = el.offsetParent) {
        offsetX += el.offsetLeft;
        offsetY += el.offsetTop;
    }

    // setup canvas size
    height = window.innerHeight - offsetY;
    width = Math.round(height * RATIO);
    canvasFractal.width = canvas.width = width;
    canvasFractal.height = canvas.height = height;

    const imageData = ctxFractal.getImageData(0, 0, width, 1);

    // setup workers
    for (let i = 0; i < THREADS; i ++) {
        const worker = new Worker('js/fractal-worker.js');

        worker.onmessage = onWorkerDone;

        workers[i] = {
            id: i,
            isRunning: false,
            worker
        };
    }

    startBtn.addEventListener('click', function() {
    }, false);

    resetBtn.addEventListener('click', function() {
        setFractal(currentFractal);
    }, false);

    // selecting range
    canvas.addEventListener('mousedown', function(e) {
        if (e.button == 0 && (isSelecting = !isInProgress)) {
            sX = e.pageX - offsetX;
            sY = e.pageY - offsetY;

            clear();
        }
        e.preventDefault();
    }, false);

    canvas.addEventListener('mousemove', function(e) {
        if (isSelecting) {
            sW = e.pageX - offsetX - sX;

            clear();
            ctx.strokeStyle = SELECTING_RECT_COLOR;
            ctx.strokeRect(sX, sY, sW, e.pageY - offsetY - sY);
        }
    });

    canvas.addEventListener('mouseup', function() {
        if (isSelecting) {
            const k = iW / width;

			isSelecting = false;
			setConfig({
				x: iX + sX * k,
				y: iY - sY * k,
				w: sW * k
			});

			clear();
			start(canvasFractal);
		}
    }, false);

    // canvas.addEventListener('mousewheel', function(e) {
    //     if(!imgData || zoom >= 1000) return;
    //     zoom += e.wheelDelta;
    //     var x = e.pageX - offsetX,
    //         y = e.pageY - offsetY,
    //         k = width / 2000,
    //         nX = zoom * k / 2,
    //         nY = nX,
    //         ctx = getEl('layer-0').getContext('2d');

    //     ctx.putImageData(
    //         imgData,
    //         nX, nY,
    //         0, 0,
    //         width, height
    //     );
    // }, false);

    canvas.addEventListener('selectstart', function() {
        console.log('select start');
        return false;
    }, false);

    // create buttons
    fractals.forEach((fractal) => {
        const btnEl = document.createElement('button');

        btnEl.type = 'button';
        btnEl.textContent = fractal.name;
        buttonsContainerEl.appendChild(btnEl);

        btnEl.addEventListener('click', () => {
            var btns = buttonsContainerEl.children;

            // enable other buttons
            for (let i = btns.length - 1; i >= 0; i++) {
                btns[i].disabled = false;
            }
            btnEl.disabled = true;
            setFractal(fractal);
        });
    });

    setFractal(currentFractal, true);

    function triggerControls(enable) {
        const disabled = !enable;
        const buttons = buttonsContainerEl.children;

        startXEl.disabled = disabled;
        startYEl.disabled = disabled;
        widthEl.disabled = disabled;
        iterationsEl.disabled = disabled;
        startBtn.disabled = disabled;
        resetBtn.disabled = disabled;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = disabled;
        }
    }

    function startWorker(workerId) {
        const worker = workers[workerId];

        if (!worker.isRunning) {
            worker.isRunning = true;
            worker.worker.postMessage({
                x: iX,
                y: nextY,
                limit: iN,
                step: xStep,
                count: width,
                fn: fractalFn,
                row: currentRow
            });
            nextY += xStep;
            currentRow++;
        }
    }

    function renderData(data, row) {
        for (let i = 0, len = data.length; i < len; i++) {
            imageData.data[i] = data[i];
        }
        ctxFractal.putImageData(imageData, 0, row);
    }

    function onWorkerDone(e) {
        const imgData = e.data[0];
        const workerId = e.data[1];
        const row = e.data[2];

        workers[workerId].isRunning = false;
        renderData(imgData, row);

        if (currentRow < height) {
            startWorker(workerId);
        } else {
            isInProgress = workers.some((item) => item.isRunning);

            if (!isInProgress) {
                triggerControls(true);
            }
        }
    }

    /**
     * Clear selecting canvas.
     */
    function clear() {
        ctx.clearRect(0, 0, width, height);
    }

    /**
     * Start drawing current fractal.
     */
    function start() {
        const benchEl = getEl('benchmark');
        let time = 0;

        if (!isInProgress) {
            triggerControls(false);
            isInProgress = true;
            fractalFn = getFn('code');
            iX = parseFloat(startXEl.value);
            iY = parseFloat(startYEl.value);
            iW = parseFloat(widthEl.value);
            iN = parseInt(iterationsEl.value, 10);
            xStep = iW / width;
            currentRow = 0;
            nextY = iY;

            //console.time('fractal');
            benchEl.innerHTML = '...';
            time = Date.now();

            for (let i = 0; i < workers.length; i++) {
                startWorker(i);
            }
        }
        // fractal(canvas, {
        //     x: iX,
        //     y: iY,
        //     width: iW,
        //     n: iN,
        //     fn: getFn('code')
        // }, function(){
        //     //console.timeEnd('fractal');
        //     benchEl.innerHTML = (Date.now() - time) / 1000;
        // });
    }

    function setConfig(cfg) {
        getEl('startX').value = cfg.x;
        getEl('startY').value = cfg.y;
        getEl('width').value = cfg.w;
    }

    function getFn(id) {
        return new Function('x', 'y', 'limit', getEl(id).value);
    }

    function setFractal(fractal, notDraw) {
        getEl('code').value = fractal.code;
        getEl('formula').innerHTML = fractal.formula;
        setConfig(fractal.cfg);
        clear();

        if (!notDraw) {
            start();
        }
    }
}(document));
