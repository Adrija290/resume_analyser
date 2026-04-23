import { useState, useEffect, useRef } from 'react';
import { BarChart2, Play, RotateCcw, Pause } from 'lucide-react';

const ALGOS = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort'];

function generateArray(n = 30) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
}

async function* bubbleSort(arr) {
  const a = [...arr]; const n = a.length;
  for (let i = 0; i < n - 1; i++)
    for (let j = 0; j < n - i - 1; j++) {
      yield { arr: [...a], comparing: [j, j + 1], sorted: Array.from({ length: i }, (_, k) => n - 1 - k) };
      if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; }
    }
  yield { arr: [...a], comparing: [], sorted: Array.from({ length: n }, (_, i) => i) };
}

async function* selectionSort(arr) {
  const a = [...arr]; const n = a.length; const sorted = [];
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      yield { arr: [...a], comparing: [min, j], sorted: [...sorted] };
      if (a[j] < a[min]) min = j;
    }
    [a[i], a[min]] = [a[min], a[i]]; sorted.push(i);
  }
  sorted.push(n - 1);
  yield { arr: [...a], comparing: [], sorted };
}

async function* insertionSort(arr) {
  const a = [...arr]; const n = a.length;
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      yield { arr: [...a], comparing: [j - 1, j], sorted: Array.from({ length: i - j + 1 }, (_, k) => k) };
      [a[j - 1], a[j]] = [a[j], a[j - 1]]; j--;
    }
  }
  yield { arr: [...a], comparing: [], sorted: Array.from({ length: n }, (_, i) => i) };
}

async function* mergeSort(arr) {
  const a = [...arr];
  const steps = [];
  function ms(arr, l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    ms(arr, l, m); ms(arr, m + 1, r);
    const left = arr.slice(l, m + 1), right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      steps.push({ comparing: [l + i, m + 1 + j] });
      if (left[i] <= right[j]) arr[k++] = left[i++];
      else arr[k++] = right[j++];
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
    steps.push({ arr: [...arr], sorted: [] });
  }
  ms(a, 0, a.length - 1);
  for (const s of steps) yield { arr: [...a], comparing: s.comparing || [], sorted: s.sorted || [] };
  yield { arr: a, comparing: [], sorted: Array.from({ length: a.length }, (_, i) => i) };
}

const GENERATORS = { 'Bubble Sort': bubbleSort, 'Selection Sort': selectionSort, 'Insertion Sort': insertionSort, 'Merge Sort': mergeSort };
const SPEEDS = { Slow: 200, Medium: 80, Fast: 20 };

export default function DsaVisualizer() {
  const [algo, setAlgo] = useState('Bubble Sort');
  const [speed, setSpeed] = useState('Medium');
  const [arr, setArr] = useState(generateArray);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [running, setRunning] = useState(false);
  const genRef = useRef(null);
  const timerRef = useRef(null);

  const reset = () => {
    clearInterval(timerRef.current);
    setRunning(false); setComparing([]); setSorted([]);
    setArr(generateArray());
  };

  const runStep = async () => {
    if (!genRef.current) return;
    const { value, done } = await genRef.current.next();
    if (done || !value) { clearInterval(timerRef.current); setRunning(false); return; }
    if (value.arr) setArr(value.arr);
    setComparing(value.comparing || []);
    setSorted(value.sorted || []);
  };

  const start = () => {
    if (running) { clearInterval(timerRef.current); setRunning(false); return; }
    genRef.current = GENERATORS[algo](arr);
    setRunning(true);
    timerRef.current = setInterval(runStep, SPEEDS[speed]);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const maxVal = Math.max(...arr);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-lg"><BarChart2 size={22} className="text-green-400"/></div>
        <h1 className="text-2xl font-bold text-white">DSA Visualizer</h1>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <select value={algo} onChange={e => { setAlgo(e.target.value); reset(); }}
          className="bg-[#1a1a2e] border border-green-900/40 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-green-500">
          {ALGOS.map(a => <option key={a}>{a}</option>)}
        </select>
        <select value={speed} onChange={e => setSpeed(e.target.value)}
          className="bg-[#1a1a2e] border border-green-900/40 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-green-500">
          {Object.keys(SPEEDS).map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={start}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition ${running ? 'bg-yellow-700 hover:bg-yellow-600' : 'bg-green-700 hover:bg-green-600'} text-white`}>
          {running ? <><Pause size={14}/> Pause</> : <><Play size={14}/> Start</>}
        </button>
        <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition">
          <RotateCcw size={14}/> Reset
        </button>
      </div>

      <div className="bg-[#1a1a2e] border border-green-900/30 rounded-2xl p-4 h-64 flex items-end gap-0.5">
        {arr.map((v, i) => {
          const isComparing = comparing.includes(i);
          const isSorted = sorted.includes(i);
          return (
            <div key={i} className="flex-1 transition-all duration-75 rounded-t"
              style={{
                height: `${(v / maxVal) * 100}%`,
                background: isComparing ? '#f59e0b' : isSorted ? '#22c55e' : '#6366f1',
              }}/>
          );
        })}
      </div>

      <div className="flex gap-4 mt-3 text-xs">
        {[['Comparing', '#f59e0b'], ['Sorted', '#22c55e'], ['Unsorted', '#6366f1']].map(([l, c]) => (
          <div key={l} className="flex items-center gap-1.5 text-gray-400">
            <span style={{ background: c }} className="w-3 h-3 rounded-sm inline-block"/>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
