function fractal(canvas, cfg, callback){
    var ctx = canvas.getContext(('2d')),
        w = canvas.width,
        h = canvas.height,
		x = cfg.x, y = cfg.y,
		width = cfg.width, height = cfg.height,
        iLimit = cfg.n, iLimit12 = iLimit >> 1, iLimit1 = ~~(iLimit12 / 5),
        stepX = width / w, stepY = stepX;

    if(height){
        stepY = height / h;
    }

    var imgData = ctx.getImageData(0,0, w,h),
        kc1 = 0xFF / iLimit1,
		kc2 = 0xFF / iLimit12,
		kc3 = 128 / iLimit1;

    var i = 0, l = imgData.data.length;
    step();

    function step(){
        if(i >= l){
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

        var xx = 0, n = 0,
			//zX = .0, zY = .0, z = .0,
			r, g, b;
        while(xx < w){
            /*zX = x, zY = y, n = 0;

            while((zX*zX + zY*zY) < 4 && n < iLimit){
                z = zX * zX - zY * zY + x;
                zY = 2 * zX * zY + y;
                zX = z;
                ++n;
            }*/
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
            ++xx;
        }
        x = cfg.x;
        y -= stepY;

        ctx.putImageData(imgData, 0,0);
        setTimeout(arguments.callee, 0);
    }
}