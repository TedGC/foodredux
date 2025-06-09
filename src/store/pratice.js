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

function* range(start, end, step = 1) {
    for (let i = start; i <= end; i += step) {
        yield i;
    }
}

// Usage
for (const num of range(1, 5)) console.log(num);

class LRUCache {
    constructor(limit = 5) {
        this.cache = new Map();
        this.limit = limit;
    }

    get(key) {
        if (!this.cache.has(key)) return null;
        const val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }

    set(key, val) {
        if (this.cache.has(key)) this.cache.delete(key);
        else if (this.cache.size === this.limit) this.cache.delete(this.cache.keys().next().value);
        this.cache.set(key, val);
    }
}


function groupBy(array, key) {
    return array.reduce((acc, item) => {
        const group = item[key];
        (acc[group] = acc[group] || []).push(item);
        return acc;
    }, {});
}

function debounceAsync(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        return new Promise(resolve => {
            timer = setTimeout(() => resolve(fn(...args)), delay);
        });
    };
}

const ContactForm = () => {
    const [form, setForm] = useState({ name: '', email: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form>
            <input name="name" value={form.name} onChange={handleChange} />
            <input name="email" value={form.email} onChange={handleChange} />
        </form>
    );
};

const Search = () => {
    const [input, setInput] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleChange = (e) => {
        const value = e.target.value;
        startTransition(() => {
            setInput(value);
        });
    };


    return (
        <>
            <input onChange={handleChange} />
            {isPending && <p>Loading...</p>}
        </>
    );
};


const ExpensiveList = ({ filter }) => {
    const deferredFilter = useDeferredValue(filter);
    const filtered = useMemo(() => hugeData.filter(item => item.includes(deferredFilter)), [deferredFilter]);
    return filtered.map(i => <div key={i}>{i}</div>);
};

function useLocalStorage(key, initial) {
    const [value, setValue] = useState(() => {
        return JSON.parse(localStorage.getItem(key)) || initial;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

const Signup = () => {
    const id = useId();
    return (
        <>
            <label htmlFor={id}>Email</label>
            <input id={id} type="email" />
        </>
    );
};

const LazyComp = React.lazy(() => import('./HeavyComponent'));

export default function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComp />
        </Suspense>
    );
}

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(false);
    return (
        <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
            {children}
        </ThemeContext.Provider>
    );
};

const Button = () => {
    const { dark, toggle } = useContext(ThemeContext);
    return <button onClick={toggle}>{dark ? 'Dark' : 'Light'}</button>;
};


function useToggle(initial = false) {
    const [value, setValue] = useState(initial);
    const toggle = () => setValue(v => !v);
    return [value, toggle];
}


const FancyInput = forwardRef((_, ref) => {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current.focus(),
    }));
    return <input ref={inputRef} />;
});



// app/posts/[id]/page.tsx
export async function generateMetadata({ params }) {
    const post = await fetchPost(params.id);
    return { title: post.title };
}

export default async function PostPage({ params }) {
    const post = await fetchPost(params.id);
    return <div>{post.content}</div>;
}
