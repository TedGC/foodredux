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


const fs = require('fs');

const imageToBuffer = (imagePath) => {
    const buffer = fs.readFileSync(imagePath);
    console.log(buffer); // <Buffer ... >
    return buffer;
};

const imgBuffer = imageToBuffer('./images/pic.jpg');


async function imageUrlToBuffer(url) {
    const res = await fetch(url);
    const blob = await res.blob();
    const arrayBuffer = await blob.arrayBuffer();
    console.log(arrayBuffer); // Uint8Array view can be created if needed
    return arrayBuffer;
}

imageUrlToBuffer('https://example.com/image.jpg');


document.querySelector('input[type="file"]').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const arrayBuffer = event.target.result;
        console.log(arrayBuffer); // You can wrap this in a Uint8Array
    };

    reader.readAsArrayBuffer(file);


//