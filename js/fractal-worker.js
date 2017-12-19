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
const COLOR_DEPTH = 0x100;
const RATIO = 1;
const PALETTE_SHIFT = Math.round(0x80 * RATIO);
const STEP_LIMIT = Math.round(COLOR_DEPTH * RATIO);
const palette = [{
    min: 0,
    max: STEP_LIMIT,
    R: '+',
    G: 0,
    B: 0
}, {
    min: STEP_LIMIT,
    max: STEP_LIMIT * 2,
    R: COLOR_DEPTH - 1,
    G: '+',
    B: 0
}, {
    min: STEP_LIMIT * 2,
    max: STEP_LIMIT * 3,
    R: '-',
    G: COLOR_DEPTH - 1,
    B: 0
}, {
    min: STEP_LIMIT * 3,
    max: STEP_LIMIT * 4,
    R: 0,
    G: COLOR_DEPTH - 1,
    B: '+'
}, {
    min: STEP_LIMIT * 4,
    max: STEP_LIMIT * 5,
    R: 0,
    G: '-',
    B: COLOR_DEPTH - 1
}, {
    min: STEP_LIMIT * 5,
    max: STEP_LIMIT * 6,
    R: '+',
    G: 0,
    B: COLOR_DEPTH - 1
}, {
    min: STEP_LIMIT * 6,
    max: STEP_LIMIT * 7,
    R: '-',
    G: '+',
    B: '-'
}];

/**
 * Gget RGB color by value that is between 0 and limit.
 *
 * @param {Number} value - value for calculate a color.
 * @param {Number} limit - maximum value.
 * @return {Array} [R, G, B]
 */
function getColor(value, limit) {
    const rgb = [0, 0, 0];
    let baseShift = 0;
    let colorPoint;

    if (value < limit) {
        colorPoint = value + PALETTE_SHIFT;

        for (let i = 0, pl = palette.length; i < pl; i++) {
            const paletteItem = palette[i];

            if (colorPoint >= paletteItem.min + baseShift && colorPoint < paletteItem.max + baseShift) {
                const RGB = 'RGB';
                const delta = Math.floor((colorPoint - paletteItem.min) / RATIO);

                for (let j = 0, rgbLen = RGB.length; j < rgbLen; j++) {
                    const c = RGB[j];
                    const color = paletteItem[c];

                    if (typeof color === 'string') {
                        rgb[j] = color === '-' ? COLOR_DEPTH - delta : delta;
                    } else {
                        rgb[j] = color;
                    }
                }
                break;
            } else if (pl - i === 1) {
                baseShift += paletteItem.max;
                i = -1;
            }
        }
    }

    return rgb;
}

function getFn(str) {
    return new Function('x', 'y', 'limit', str);
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
    const strFn = params.strFn;
    const fn = getFn(strFn);
    const resultData = [];
    let x = xStart;

    console.log('worker:', y, params.row);
    for (let i = 0, j = 0; j < count; j++) {
        const n = fn(x, y, limit);
        let rgb;

        if (n < limit) {
            rgb = getColor(n, limit);
        }

        resultData[i++] = rgb ? rgb[0] : 0;
        resultData[i++] = rgb ? rgb[1] : 0;
        resultData[i++] = rgb ? rgb[2] : 0;
        resultData[i++] = COLOR_DEPTH;

        x += step;
    }

    postMessage([resultData, params.id, params.row]);
};
