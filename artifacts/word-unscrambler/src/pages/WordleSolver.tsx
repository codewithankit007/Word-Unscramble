import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import { useWordList } from '../hooks/useWordList';

type CellState = 'empty' | 'correct' | 'present' | 'absent';

interface Cell {
  letter: string;
  state: CellState;
}

export default function WordleSolver() {
  const { words, loading } = useWordList();
  const [wordLen, setWordLen] = useState(5);
  const [rows, setRows] = useState<Cell[][]>(() =>
    Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ({ letter: '', state: 'empty' as CellState })))
  );
  const [results, setResults] = useState<string[] | null>(null);
  const [absentLetters, setAbsentLetters] = useState('');

  const cycleState = (rowI: number, colI: number) => {
    setRows(prev => {
      const next = prev.map(r => [...r]);
      const cell = next[rowI][colI];
      if (!cell.letter) return next;
      const states: CellState[] = ['empty', 'correct', 'present', 'absent'];
      const idx = states.indexOf(cell.state);
      next[rowI][colI] = { ...cell, state: states[(idx + 1) % states.length] };
      return next;
    });
  };

  const setLetter = (rowI: number, colI: number, letter: string) => {
    setRows(prev => {
      const next = prev.map(r => [...r]);
      next[rowI][colI] = { letter: letter.toLowerCase().slice(0,1), state: letter ? 'empty' : 'empty' };
      return next;
    });
  };

  const solve = () => {
    const fiveLetterWords = words.filter(w => w.length === wordLen);
    const filtered = fiveLetterWords.filter(w => {
      for (const row of rows) {
        for (let col = 0; col < wordLen; col++) {
          const cell = row[col];
          if (!cell.letter) continue;
          if (cell.state === 'correct' && w[col] !== cell.letter) return false;
          if (cell.state === 'present' && (!w.includes(cell.letter) || w[col] === cell.letter)) return false;
          if (cell.state === 'absent' && w.includes(cell.letter)) return false;
        }
      }
      for (const c of absentLetters.toLowerCase()) {
        if (c.trim() && w.includes(c)) return false;
      }
      return true;
    });
    setResults(filtered.slice(0, 100));
  };

  const reset = () => {
    setRows(Array.from({ length: 6 }, () => Array.from({ length: wordLen }, () => ({ letter: '', state: 'empty' as CellState }))));
    setResults(null);
    setAbsentLetters('');
  };

  const stateColors: Record<CellState, string> = {
    empty: 'bg-white border-gray-300 text-slate-800',
    correct: 'bg-green-500 border-green-500 text-white',
    present: 'bg-yellow-400 border-yellow-400 text-white',
    absent: 'bg-gray-600 border-gray-600 text-white',
  };

  return (
    <Layout>
      <SEOHead
        title="Wordle Solver — Find Today's Wordle Answer | Word Unscrambler"
        description="Free Wordle solver tool. Enter your green, yellow, and gray letters to find the answer instantly. Never lose at Wordle again!"
        keywords="wordle solver, wordle helper, wordle answer today, wordle cheat, 5 letter word solver"
      />
      <div className="hero-gradient rounded-2xl p-6 md:p-8 mb-6 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Wordle Solver</h1>
        <p className="text-blue-100">Enter your Wordle clues to find the answer — click letters to set green/yellow/gray</p>
      </div>
      <AdBanner size="leaderboard" className="mb-6" />
      <div className="info-box mb-4">
        <p className="text-slate-700 text-sm"><strong className="text-blue-700">Word Unscrambler</strong> is a simple online tool for unscrambling and solving scrambled words, often useful in discovering top scoring words for Scrabble, Words with Friends, Wordle, Wordscapes, Wordfeud, TextTwist, Word Cookies, Anagrams etc.</p>
      </div>
      <div className="search-box p-6 md:p-8 mb-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-xl font-black text-slate-800">Wordle Solver</h2>
          <div className="flex gap-3 items-center">
            <select value={wordLen} onChange={e => { setWordLen(+e.target.value); reset(); }} className="px-3 py-1.5 border border-blue-200 rounded-lg text-sm bg-white">
              {[4,5,6,7].map(n => <option key={n} value={n}>{n} letters</option>)}
            </select>
            <button onClick={reset} className="btn-secondary text-sm py-2">Reset</button>
          </div>
        </div>
        <div className="flex gap-4 mb-4 text-xs font-semibold flex-wrap">
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-green-500 rounded inline-block"></span>Green = Correct position</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-yellow-400 rounded inline-block"></span>Yellow = Wrong position</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-gray-600 rounded inline-block"></span>Gray = Not in word</span>
        </div>
        {/* Grid */}
        <div className="overflow-x-auto">
          <div className="inline-block">
            {rows.map((row, rowI) => (
              <div key={rowI} className="flex gap-2 mb-2">
                {row.map((cell, colI) => (
                  <div key={colI} className="flex flex-col gap-1">
                    <input
                      type="text"
                      maxLength={1}
                      value={cell.letter.toUpperCase()}
                      onChange={e => setLetter(rowI, colI, e.target.value.replace(/[^a-zA-Z]/g, ''))}
                      className={`wordle-cell text-lg font-black uppercase ${stateColors[cell.state]}`}
                    />
                    {cell.letter && (
                      <button onClick={() => cycleState(rowI, colI)} className="text-xs text-slate-400 hover:text-blue-500 text-center">tap</button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 mb-4">
          <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Letters NOT in the word (gray letters)</label>
          <input
            type="text"
            value={absentLetters}
            onChange={e => setAbsentLetters(e.target.value.replace(/[^a-zA-Z]/g, ''))}
            placeholder="e.g. aeiou"
            className="px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 w-full max-w-xs uppercase tracking-wider font-semibold"
          />
        </div>
        <button className="btn-primary" onClick={solve} disabled={loading}>
          {loading ? 'Loading…' : '🔍 Find Possible Words'}
        </button>
        {results !== null && (
          <div className="mt-4 word-modal">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-bold text-slate-700">Possible words:</span>
              <span className="result-badge">{results.length} found</span>
            </div>
            {results.length === 0 ? (
              <p className="text-slate-500 text-sm">No words match. Try relaxing some constraints.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {results.map(w => <span key={w} className="word-tile">{w}</span>)}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-6">
        <h2 className="font-black text-slate-800 text-lg mb-3">How to Use Wordle Solver</h2>
        <ol className="text-slate-600 text-sm space-y-2">
          {['Enter your guessed letters in the grid above','Click the letter tiles to set them green (correct), yellow (present), or gray (absent)','Add any known absent letters in the field below','Click "Find Possible Words" to see all matching words','Choose the best next guess from the results'].map((step, i) => (
            <li key={i} className="flex gap-2"><span className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>{step}</li>
          ))}
        </ol>
      </div>
      <AdBanner size="leaderboard" />
    </Layout>
  );
}
