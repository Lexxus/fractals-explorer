function fractal(canvas, cfg, callback) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const width = cfg.width;
    const height = cfg.height;
    const iLimit = cfg.n;
    const iLimit12 = iLimit >> 1;
    const iLimit1 = ~~(iLimit12 / 5);
    const stepX = width / w;
    const stepY = stepX;
    const imgData = ctx.getImageData(0,0, w,1);
    const iLen = imgData.data.length;
    const kc1 = 0xFF / iLimit1;
    const kc2 = 0xFF / iLimit12;
    const kc3 = 128 / iLimit1;
    let x = cfg.x;
    let y = cfg.y;
    let cY = 0;

    if (height) {
        stepY = height / h;
    }

    step();

    function step() {
        let n = 0;
        let i = 0;
        let r, g, b;

        if (cY >= h) {
            doF = false;
            if (typeof callback === 'function') {
                callback();
            }
            return;
        }

        if (!doF) {
            setTimeout(arguments.callee, 1000);
            return;
        }

        while(i < iLen) {
            n = cfg.fn(x, y, iLimit);

            if (n < iLimit) {
                var iLimit2 = iLimit1 << 1;

                if (n < iLimit1) {
                    r = 128 - kc3 * n;
                    g = 128 - kc3 * n;
                    b = 255;
                } else if (n < iLimit2) {
                    n -= iLimit1;
                    r = 0;
                    g = kc1 * n;
                    b = 255;
                } else if (n < iLimit2 + iLimit1) {
                    n -= iLimit2;
                    r = 0;
                    g = 255;
                    b = 255 - kc1 * n;
                } else if (n < iLimit2 + iLimit2) {
                    n -= iLimit2 + iLimit1;
                    r = kc1 * n;
                    g = 255;
                    b = 0;
                } else if (n < iLimit12) {
                    n -= iLimit2 + iLimit2;
                    r = 255;
                    g = 255 - kc1 * n;
                    b = 0;
                } else {
                    n -= iLimit12;
                    r = 255;
                    g = 0;
                    b = kc2 * n;
                }
            } else {
                r = g = b = 0;
            }

            //r = (color & 0xFF0000) >> 16;
            //g = (color & 0xFF00) >> 8;
            //b = color & 0xFF;

            imgData.data[i++] = r;
            imgData.data[i++] = g;
            imgData.data[i++] = b;
            imgData.data[i++] = 255;

            x += stepX;
        }
        x = cfg.x;
        y -= stepY;

        ctx.putImageData(imgData, 0, cY++);
        setTimeout(arguments.callee, 0);
    }
}