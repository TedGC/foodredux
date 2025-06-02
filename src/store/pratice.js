function countFrequency(arr) {
    return arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});
}


function isAnagram(a, b) {
    return a.split('').sort().join('') === b.split('').sort().join('');
}


function flatten(arr) {
    return arr.reduce((flat, toFlatten) =>
        flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);
}


function longestWord(str) {
    return str.split(' ').reduce((a, b) => a.length > b.length ? a : b);
}


function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}


function isPalindrome(str) {
    return str === str.split('').reverse().join('');
}

console.log(isPalindrome("racecar")); // true