// color's transition from value 0 to limit:
// 0x80,   0,0    - 0
// 0xFF,   0,0
// 0xFF,0x80,0
// 0xFF,0xFF,0
// 0x80,0xFF,0
// 0   ,0xFF,0
// 0   ,0xFF,0x80
// 0   ,0xFF,0xFF
// 0   ,0x80,0xFF
// 0   ,0   ,0xFF
// 0x80,0   ,0xFF
// 0xFF,0   ,0xFF
// 0x80,0   ,0x80 - limit
const COLOR_WEIGHT = 0x100;
const PALETTE_SHIFT = 0x80;
const palette = [{
    min: 0,
    max: COLOR_WEIGHT,
    R: '+',
    G: 0,
    B: 0
}, {
    min: COLOR_WEIGHT,
    max: COLOR_WEIGHT * 2,
    R: COLOR_WEIGHT - 1,
    G: '+',
    B: 0
}, {
    min: COLOR_WEIGHT * 2,
    max: COLOR_WEIGHT * 3,
    R: '-',
    G: COLOR_WEIGHT - 1,
    B: 0
}, {
    min: COLOR_WEIGHT * 3,
    max: COLOR_WEIGHT * 4,
    R: 0,
    G: COLOR_WEIGHT - 1,
    B: '+'
}, {
    min: COLOR_WEIGHT * 4,
    max: COLOR_WEIGHT * 5,
    R: 0,
    G: '-',
    B: COLOR_WEIGHT - 1
}, {
    min: COLOR_WEIGHT * 5,
    max: COLOR_WEIGHT * 6,
    R: '+',
    G: 0,
    B: COLOR_WEIGHT - 1
}, {
    min: COLOR_WEIGHT * 6,
    max: COLOR_WEIGHT * 7,
    R: '-',
    G: 0,
    B: '-'
}];
const paletteLength = COLOR_WEIGHT * (palette.length - 1);
let limitBak;
let colorStep;

/**
 * Gget RGB color by value that is between 0 and limit.
 *
 * @param {Number} value - value for calculate a color.
 * @param {Number} limit - maximum value.
 * @return {Array} [R, G, B]
 */
function getColor(value, limit) {
    const rgb = [0, 0, 0];
    let colorPoint;

    if (limit !== limitBak) {
        limitBak = limit;
        colorStep = limit / paletteLength;
    }
    colorPoint = Math.floor((limit - value) * colorStep) + PALETTE_SHIFT;

    for (let i = 0, pl = palette.length; i < pl; i++) {
        const paletteItem = palette[i];

        if (colorPoint >= paletteItem.min && colorPoint < paletteItem.max) {
            const RGB = 'RGB';
            const delta = colorPoint - paletteItem.min;

            for (let j = 0, rgbLen = RGB.length; j < rgbLen; j++) {
                const c = RGB[j];
                const color = paletteItem[c];

                if (typeof color === 'string') {
                    rgb[j] = color === '-' ? COLOR_WEIGHT - delta : delta;
                } else {
                    rgb[j] = color;
                }
            }
            break;
        }
    }

    return rgb;
}

/**
 * @type Params.
 * @property {Number | String} id - the worker ID - returns back.
 * @property {Number} x - X coordinate to calculate from.
 * @property {Number} y - Y coordinate of a row.
 * @property {Number} limit - maximim number of iterations.
 * @property {Number} step - step by X coordinate.
 * @property {Number} count - number of points to calculate.
 * @property {Function} fn - calculating function.
 * @property {Number} row - row number - returns back.
 */

/**
 * Calculate colors of one row of fractal by Y from X.
 *
 * @param {Event} e
 * @param {Params} e.data
 */
onmessage = function(e) {
    const params = e.data;
    const xStart = params.x;
    const y = params.y;
    const limit = params.limit;
    const step = params.step;
    const count = params.count;
    const fn = params.fn;
    const resultData = [];
    let x = xStart;

    console.log('worker:', y, Date.now());
    for (let i = 0, j = 0; j < count; j++) {
        const n = fn(x, y, limit);
        let rgb;

        if (n < limit) {
            rgb = getColor(n, limit);
        }

        resultData[i++] = rgb ? rgb[0] : 0;
        resultData[i++] = rgb ? rgb[1] : 0;
        resultData[i++] = rgb ? rgb[2] : 0;
        resultData[i++] = COLOR_WEIGHT;

        x += step;
    }

    postMessage([resultData, params.id, params.row]);
};
