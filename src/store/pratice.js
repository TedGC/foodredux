function countFrequency(arr) {
    return arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});
}


function isAnagram(a, b) {
    return a.split('').sort().join('') === b.split('').sort().join('');
}