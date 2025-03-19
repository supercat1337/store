// @ts-check

/**
 * Checks if a given value is a plain object.
 * @param {*} obj - The value to check.
 * @returns {boolean} true if the value is a plain object, false otherwise.
 */
export function isPlainObject(obj) {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

/**
 * Checks if two arrays are equal. If the arrays are not the same length, then this function returns false.
 * Otherwise, this function checks if each element of the two arrays is equal, using the compareAny function.
 * @param {any[]} a - The first array to compare.
 * @param {any[]} b - The second array to compare.
 * @returns {boolean} True if the two arrays are equal, false otherwise.
 */
export function compareArrays(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if (!compareAny(a[i], b[i])) {
            return false;
        }
    }

    return true;
}

/**
 * Checks if two plain objects are equal. If the objects do not have the same set of keys, then this function returns false.
 * Otherwise, this function checks if each value of the two objects is equal, using the compareAny function.
 * @param {Object} a - The first object to compare.
 * @param {Object} b - The second object to compare.
 * @returns {boolean} True if the two objects are equal, false otherwise.
 */
export function comparePlainObjects(a, b) {
    if (a === b) return true;
    if (!isPlainObject(a) || !isPlainObject(b)) return false;

    let keysA = Object.keys(a);
    let keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let i = 0; i < keysA.length; i++) {
        let key = keysA[i];
        let hasProperty = Object.prototype.hasOwnProperty.call(b, key);
        if (!hasProperty) {
            return false;
        }

        if (!compareAny(a[key], b[key])) {
            return false;
        }
    }

    return true;
}

/**
 * Checks if two objects are equal. If objects are arrays, then check if stringified versions of them are equal.
 * If objects are not arrays, then check if sorted stringified versions of them are equal.
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
export function compareAny(a, b) {
    if (a === b) return true;
    if (typeof a != typeof b) return false;

    if (a === null || b === null) return false;
    if (a === undefined || b === undefined) return false;

    if (Array.isArray(a) || Array.isArray(b)) {
        if (!(Array.isArray(a) && Array.isArray(b))) {
            return false;
        }

        return compareArrays(a, b);
    }

    return comparePlainObjects(a, b);
}

/**
 * Debounce function that, as long as it continues to be invoked, will not be triggered.
 * @template {(...args: any[]) => void} T
 * @param {T} func - Function to be debounced
 * @param {number} wait - Time in milliseconds to wait before the function gets called.
 * @returns {T}
 * @example
   window.addEventListener('resize', debounce((evt) => console.log(evt), 250));
 */
export function debounce(func, wait) {
    var timeout;
    var f = (...args) => {
        var context = this;
        var later = function () {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };

    return /** @type {T} */ (f);
}

/**
 * Converts array to set
 * @template T
 * @param {T[]} arr
 * @returns {Set<T>}
 */
export function arrayToSet(arr) {
    var result = new Set();
    for (let i = 0; i < arr.length; i++) {
        result.add(arr[i]);
    }
    return result;
}
