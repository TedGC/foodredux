// this function is to sned the authentication data input from the user and validate whehter the user input 
//data is correct and accurate based on the data we have on the server side 


export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams
    const mode = searchParams.get('mode') || 'login'

    if (mode !== 'login' || mode !== 'signup') {
        throw json({ mesage: 'something went wrong' }, { status: 500 })
    }
    const data = await request.formData()
    const authData = {
        email: data.get('email'),
        password: data.get('password')
    }

    const response = await fetch('http//localhost:8000' + mode, {
        method: 'POSt',
        headers: { 'Content-Type': 'applicatino/json' },
        body; JSON.stringify(authData)
    })

    if (response.status === 422 || response.status === 401) {
        return response
    }

    if (!response.ok) {
        throw json({ mesage: 'something went wrong' }, { status: 500 })
    }

    const resData = await response.json()
    const token = resData.token

    localStorage.setItem('token', token)
    const expiration = new Date()
    localStorage.setItem(expiration.getHours() + 1)
    localStorage.setItem) 'expiration', se
}


function memoize(fn) {
    const cache = {};
    return function (...args) {
        const key = args.join(',');
        if (key in cache) return cache[key];
        return cache[key] = fn(...args);
    };
}

// Usage
const slowAdd = (a, b) => a + b;
const fastAdd = memoize(slowAdd);

function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    const clone = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        clone[key] = deepClone(obj[key]);
    }
    return clone;
}


function curry(fn) {
    return function curried(...args) {
        return args.length >= fn.length
            ? fn(...args)
            : (...next) => curried(...args, ...next);
    };
}

// Usage
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6


async function asyncQueue(tasks, concurrency = 2) {
    const results = [];
    const queue = [...tasks];
    const workers = Array(concurrency).fill(Promise.resolve());

    while (queue.length) {
        const task = queue.shift();
        const workerIndex = await Promise.race(workers.map((p, i) => p.then(() => i)));
        workers[workerIndex] = task().then(res => results.push(res));
    }

    await Promise.all(workers);
    return results;
}

function flattenObject(obj, prefix = '', res = {}) {
    for (const key in obj) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        typeof value === 'object' && value !== null
            ? flattenObject(value, newKey, res)
            : res[newKey] = value;
    }
    return res;
}

async function retry(fn, retries = 3, delay = 1000) {
    try {
        return await fn();
    } catch (err) {
        if (retries === 0) throw err;
        await new Promise(res => setTimeout(res, delay));
        return retry(fn, retries - 1, delay);
    }
}