// @ts-check

/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @returns {boolean}
 */
export function compareObjects(a, b) {
    if (a === b) return true;

    if (typeof a != typeof b) return false;

    if (Array.isArray(a) || Array.isArray(b)) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    if (a === null || b === null) return false;
    if (a === undefined || b === undefined) return false;

    let a_json = JSON.stringify(a, Object.keys(a).sort());
    let b_json = JSON.stringify(b, Object.keys(b).sort());
    return a_json === b_json;
}
