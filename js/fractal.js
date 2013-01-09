function fractal(canvas, cfg, callback){
    var ctx = canvas.getContext(('2d')),
        w = canvas.width,
        h = canvas.height,
		x = cfg.x, y = cfg.y, cY = 0,
		width = cfg.width, height = cfg.height,
        iLimit = cfg.n, iLimit12 = iLimit >> 1, iLimit1 = ~~(iLimit12 / 5),
        stepX = width / w, stepY = stepX;

    if(height){
        stepY = height / h;
    }

    var imgData = ctx.getImageData(0,0, w,1),
		iLen = imgData.data.length,
        kc1 = 0xFF / iLimit1,
		kc2 = 0xFF / iLimit12,
		kc3 = 128 / iLimit1;

    step();

    function step(){
        if(cY >= h){
            doF = false;
			if(typeof callback === 'function'){
				callback();
			}
            return;
        }

        if(!doF){
            setTimeout(arguments.callee, 1000);
            return;
        }

        var n = 0, i = 0,
			r, g, b;
        while(i < iLen){
			n = cfg.fn(x, y, iLimit);

            if(n < iLimit){
				var iLimit2 = iLimit1 << 1;

				if(n < iLimit1){
					r = 128 - kc3 * n;
					g = 128 - kc3 * n;
					b = 255;
				}else if(n < iLimit2){
					n -= iLimit1;
					r = 0;
					g = kc1 * n;
					b = 255;
				}else if(n < iLimit2+iLimit1){
					n -= iLimit2;
					r = 0;
					g = 255;
					b = 255 - kc1 * n;
				}else if(n < iLimit2+iLimit2){
					n -= iLimit2+iLimit1;
					r = kc1 * n;
					g = 255;
					b = 0;
				}else if(n < iLimit12){
					n -= iLimit2+iLimit2;
					r = 255;
					g = 255 - kc1 * n;
					b = 0;
				}else{
					n -= iLimit12;
					r = 255;
					g = 0;
					b = kc2 * n;
				}
			}else{
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