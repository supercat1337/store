// @ts-check

/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @returns {boolean}
 */
export function compareObjects(a, b) {
    if (a === b) return true;

    if (a === null || b === null) return false;
    if (a === undefined || b === undefined) return false;

    if (typeof a != typeof b) return false;

    if (Array.isArray(a) || Array.isArray(b)) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    let a_json = JSON.stringify(a, Object.keys(a).sort());
    let b_json = JSON.stringify(b, Object.keys(b).sort());
    return a_json === b_json;
}

/**
 * Debounce function that, as long as it continues to be invoked, will not be triggered.
 * @param {Function} func - Function to be debounced
 * @param {number} wait - Time in milliseconds to wait before the function gets called.
 * @returns {Function}
 * @example
   window.addEventListener('resize', debounce((evt) => console.log(evt), 250));
 */
export function debounce(func, wait) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 
 * @param {*} x 
 * @returns {boolean}
 */
export function isObject(x) {
    return typeof x === 'object' && !Array.isArray(x) && x !== null;
}