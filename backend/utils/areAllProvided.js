export function areAllProvided(...params) {
    for (let i = 0; i < params.length; i++) {
        if (params[i] === null || params[i] === undefined) {
            return false;
        }
    }
    return true;
}
