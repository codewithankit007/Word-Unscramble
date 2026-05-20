import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import { useWordList } from '../hooks/useWordList';

type CellState = 'empty' | 'correct' | 'present' | 'absent';
interface Cell { letter: string; state: CellState; }

function WordGrid({ grid, onLetterChange, onCycleState }: {
  grid: Cell[][];
  onLetterChange: (r: number, c: number, v: string) => void;
  onCycleState: (r: number, c: number) => void;
}) {
  const stateColors: Record<CellState, string> = {
    empty: 'bg-white border-gray-300 text-slate-800',
    correct: 'bg-green-500 border-green-500 text-white',
    present: 'bg-yellow-400 border-yellow-400 text-white',
    absent: 'bg-gray-600 border-gray-600 text-white',
  };
  return (
    <div>
      {grid.map((row, ri) => (
        <div key={ri} className="flex gap-1 mb-1">
          {row.map((cell, ci) => (
            <input
              key={ci}
              type="text"
              maxLength={1}
              value={cell.letter.toUpperCase()}
              onChange={e => onLetterChange(ri, ci, e.target.value.replace(/[^a-zA-Z]/g, ''))}
              onClick={() => cell.letter && onCycleState(ri, ci)}
              className={`w-10 h-10 text-center border-2 rounded font-black text-sm uppercase cursor-pointer ${stateColors[cell.state]}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function makeGrid(rows = 9, cols = 5): Cell[][] {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({ letter: '', state: 'empty' as CellState })));
}

export default function QuordleSolver() {
  const { words, loading } = useWordList();
  const [grids, setGrids] = useState<Cell[][][]>(() => Array.from({ length: 4 }, () => makeGrid()));
  const [absentAll, setAbsentAll] = useState('');
  const [results, setResults] = useState<string[][]| null>(null);

  const updateCell = (gridIdx: number, ri: number, ci: number, letter: string) => {
    setGrids(prev => {
      const next = prev.map(g => g.map(r => [...r]));
      next[gridIdx][ri][ci] = { letter: letter.toLowerCase(), state: 'empty' };
      return next;
    });
  };

  const cycleState = (gridIdx: number, ri: number, ci: number) => {
    setGrids(prev => {
      const next = prev.map(g => g.map(r => [...r]));
      const states: CellState[] = ['empty', 'correct', 'present', 'absent'];
      const cell = next[gridIdx][ri][ci];
      if (!cell.letter) return next;
      next[gridIdx][ri][ci] = { ...cell, state: states[(states.indexOf(cell.state) + 1) % states.length] };
      return next;
    });
  };

  const solve = () => {
    const fiveLetterWords = words.filter(w => w.length === 5);
    const wordResults = grids.map(grid => {
      return fiveLetterWords.filter(w => {
        for (const row of grid) {
          for (let col = 0; col < 5; col++) {
            const cell = row[col];
            if (!cell.letter) continue;
            if (cell.state === 'correct' && w[col] !== cell.letter) return false;
            if (cell.state === 'present' && (!w.includes(cell.letter) || w[col] === cell.letter)) return false;
            if (cell.state === 'absent' && w.includes(cell.letter)) return false;
          }
        }
        for (const c of absentAll.toLowerCase()) {
          if (c.trim() && w.includes(c)) return false;
        }
        return true;
      }).slice(0, 50);
    });
    setResults(wordResults);
  };

  return (
    <Layout>
      <SEOHead
        title="Quordle Solver — Solve All 4 Quordle Boards | Word Unscrambler"
        description="Free Quordle solver tool. Enter your green, yellow, and gray letters for all 4 boards to find all possible answers simultaneously."
        keywords="quordle solver, quordle helper, quordle answer, quordle cheat, quordle word finder"
      />
      <div className="hero-gradient rounded-2xl p-6 md:p-8 mb-6 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Quordle Solver</h1>
        <p className="text-blue-100">Solve all 4 Quordle boards at once — enter your clues for each board</p>
      </div>
      <AdBanner size="leaderboard" className="mb-6" />
      <div className="info-box mb-4">
        <p className="text-slate-700 text-sm"><strong className="text-blue-700">Word Unscrambler</strong> is a simple online tool for unscrambling and solving scrambled words, often useful in discovering top scoring words for Scrabble, Words with Friends, Wordle, Wordscapes, Wordfeud, TextTwist, Word Cookies, Anagrams etc.</p>
      </div>
      <div className="search-box p-6 mb-6">
        <h2 className="text-xl font-black text-slate-800 mb-2">Quordle Solver</h2>
        <p className="text-slate-500 text-sm mb-4">Click a letter cell after entering it to cycle: white → green → yellow → gray</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {grids.map((grid, gi) => (
            <div key={gi} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="font-bold text-slate-600 text-xs uppercase tracking-wide mb-2 text-center">Board {gi + 1}</div>
              <WordGrid
                grid={grid}
                onLetterChange={(r, c, v) => updateCell(gi, r, c, v)}
                onCycleState={(r, c) => cycleState(gi, r, c)}
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Letters absent from ALL boards</label>
          <input type="text" value={absentAll} onChange={e => setAbsentAll(e.target.value.replace(/[^a-zA-Z]/g,''))}
            placeholder="e.g. aeiou" className="px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 w-full max-w-xs uppercase tracking-wider font-semibold" />
        </div>
        <button className="btn-primary" onClick={solve} disabled={loading}>
          {loading ? 'Loading…' : '🔍 Solve All Boards'}
        </button>
        {results && (
          <div className="mt-4 word-modal">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.map((res, gi) => (
                <div key={gi}>
                  <div className="font-bold text-slate-700 text-sm mb-2">Board {gi+1} <span className="result-badge">{res.length}</span></div>
                  {res.length === 0 ? <p className="text-slate-400 text-xs">No matches</p> : (
                    <div className="flex flex-wrap gap-1">
                      {res.map(w => <span key={w} className="word-tile text-xs">{w}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-6">
        <h2 className="font-black text-slate-800 text-lg mb-3">What is Quordle?</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Quordle is a challenging word game where you must solve 4 five-letter words simultaneously in 9 guesses. Each guess applies to all 4 boards at once. Our solver helps you find possible answers for each board based on the color feedback you've received.
        </p>
      </div>
      <AdBanner size="leaderboard" />
    </Layout>
  );
}
