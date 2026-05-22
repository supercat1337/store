/// <reference path="./types.d.ts" />

// @ts-check

/**
 * Checks if adding a new computed node would create a cycle in the dependency graph.
 * @param {string} nodeName - Name of the new node.
 * @param {string[]} dependencies - Dependencies of the new node.
 * @param {Map<string, import('./types.js').TypeStructureOfComputed>} computedMap - Map of existing computed nodes.
 * @returns {boolean} - True if a cycle would be created.
 */
export function wouldCreateCycle(nodeName, dependencies, computedMap) {
    const visited = new Set();
    const stack = new Set();

    /**
     * @param {string} current
     * @returns {boolean}
     */
    function hasCycle(current) {
        if (stack.has(current)) return true;
        if (visited.has(current)) return false;

        visited.add(current);
        stack.add(current);

        const node = computedMap.get(current);
        if (node && node.dependencies) {
            for (const dep of node.dependencies) {
                if (computedMap.has(dep)) {
                    if (hasCycle(dep)) return true;
                }
            }
        }
        stack.delete(current);
        return false;
    }

    for (const dep of dependencies) {
        if (computedMap.has(dep)) {
            if (hasCycle(dep)) return true;
        }
    }
    return false;
}

/**
 * Marks computed nodes as stale based on updated items.
 * @param {IterableIterator<import('./types.js').TypeStructureOfComputed>} computedNodes - All computed nodes.
 * @param {Set<string>} updatedItemNames - Set of item names that have changed.
 * @param {Map<string, import('./types.js').TypeStructureOfComputed>} computedMap - Map for lookups.
 * @returns {Set<string>} - Set of stale computed names.
 */
export function markStaleComputeds(computedNodes, updatedItemNames, computedMap) {
    const staleSet = new Set();

    // First pass: find directly stale nodes
    for (const node of computedNodes) {
        if (node.stale) continue;
        // If any dependency is in updatedItemNames, mark stale
        if (node.dependencies.some(dep => updatedItemNames.has(dep))) {
            node.stale = true;
            staleSet.add(node.item_name);
        }
    }

    // Propagate staleness through influences (breadth‑first)
    const queue = Array.from(staleSet);
    const processed = new Set();

    while (queue.length) {
        const currentName = queue.shift();
        if (processed.has(currentName)) continue;
        processed.add(currentName);

        const currentNode = computedMap.get(currentName);
        if (!currentNode) continue;

        for (const influencedName of currentNode.influences) {
            const influencedNode = computedMap.get(influencedName);
            if (influencedNode && !influencedNode.stale) {
                influencedNode.stale = true;
                staleSet.add(influencedName);
                queue.push(influencedName);
            }
        }
    }

    return staleSet;
}
