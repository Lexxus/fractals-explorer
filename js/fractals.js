window.fractals = [{
    name: 'Mandelbrot 2',
    code: "var zX = x, zY = y, z = .0, n = 0,\n\
    zX2 = x*x, zY2 = y*y;\n\n\
while ((zX2 + zY2) < 16 && n < limit) {\n\
    z = zX2 - zY2 + x;\n\
    zY = ((zX * zY) * 2) + y;\n\
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
{
    name: 'Mandelbrot 3',
    code: "var zX = x, zY = y, z = .0, n = 0,\n\
    zX2 = x*x, zY2 = y*y;\n\n\
while ((zX2 + zY2) < 16 && n < limit) {\n\
    z = (zX2 - 3*zY2) * zX + x;\n\
    zY = (3*zX2 - zY2) * zY + y;\n\
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
{
    name: 'Mandelbrot 4',
    code: "var zX = x, zY = y, z = .0, n = 0,\n\
    zX2 = x*x, zY2 = y*y;\n\n\
while ((zX2 + zY2) < 16 && n < limit) {\n\
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
{
    name: 'Mandelbrot 5',
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
{
    name: 'Julia 2',
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
{
    name: 'Julia 3',
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
{
    name: 'Julia 4',
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
{
    name: 'Julia 5',
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
}];