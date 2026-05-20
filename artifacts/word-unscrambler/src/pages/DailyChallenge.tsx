import { useState, useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import AdBanner from '../components/AdBanner';
import { useWordList } from '../hooks/useWordList';

const WORD_LENGTH = 6;
const MAX_GUESSES = 6;
const STORAGE_KEY = 'wu-daily';

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function getDailyWord(words: string[]): string {
  const pool = words.filter(w => w.length === WORD_LENGTH && /^[a-z]+$/.test(w));
  if (!pool.length) return 'flower';
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return pool[seed % pool.length];
}

type LetterState = 'correct' | 'present' | 'absent' | 'empty';

function evaluateGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = Array(WORD_LENGTH).fill('absent');
  const ansArr = answer.split('');
  const guessArr = guess.split('');
  const used = Array(WORD_LENGTH).fill(false);
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] === ansArr[i]) { result[i] = 'correct'; used[i] = true; }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === 'correct') continue;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!used[j] && guessArr[i] === ansArr[j]) { result[i] = 'present'; used[j] = true; break; }
    }
  }
  return result;
}

const cellColor: Record<LetterState, string> = {
  correct: 'bg-green-500 text-white border-green-500',
  present: 'bg-yellow-400 text-white border-yellow-400',
  absent:  'bg-slate-400 text-white border-slate-400',
  empty:   'bg-white border-slate-200 text-slate-800',
};

export default function DailyChallenge() {
  const { words, loading } = useWordList();
  const wordSet = useMemo(() => new Set(words), [words]);
  const answer = useMemo(() => getDailyWord(words), [words]);

  const [guesses, setGuesses] = useState<string[]>([]);
  const [states, setStates] = useState<LetterState[][]>([]);
  const [current, setCurrent] = useState('');
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.date === getTodayKey()) {
          setGuesses(data.guesses || []);
          setStates(data.states || []);
          setGameOver(data.gameOver || false);
          setWon(data.won || false);
        }
      } catch {}
    }
  }, []);

  const save = (g: string[], s: LetterState[][], over: boolean, w: boolean) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getTodayKey(), guesses: g, states: s, gameOver: over, won: w }));
  };

  const usedKeys = useMemo(() => {
    const map: Record<string, LetterState> = {};
    states.forEach((row, ri) => {
      row.forEach((state, ci) => {
        const l = guesses[ri][ci];
        if (!map[l] || state === 'correct' || (state === 'present' && map[l] === 'absent')) {
          map[l] = state;
        }
      });
    });
    return map;
  }, [states, guesses]);

  const handleKey = (key: string) => {
    if (gameOver) return;
    if (key === 'BACKSPACE') { setCurrent(c => c.slice(0, -1)); return; }
    if (key === 'ENTER') {
      if (current.length !== WORD_LENGTH) { setMessage(`Word must be ${WORD_LENGTH} letters`); setTimeout(() => setMessage(''), 2000); return; }
      if (!wordSet.has(current)) { setMessage('Not in dictionary'); setTimeout(() => setMessage(''), 2000); return; }
      const s = evaluateGuess(current, answer);
      const newGuesses = [...guesses, current];
      const newStates = [...states, s];
      const isWon = current === answer;
      const isOver = isWon || newGuesses.length >= MAX_GUESSES;
      setGuesses(newGuesses);
      setStates(newStates);
      setCurrent('');
      setGameOver(isOver);
      setWon(isWon);
      save(newGuesses, newStates, isOver, isWon);
      if (isWon) setMessage(`🎉 Brilliant! You got it in ${newGuesses.length}!`);
      else if (isOver) setMessage(`Answer was: ${answer.toUpperCase()}`);
      return;
    }
    if (/^[a-z]$/.test(key) && current.length < WORD_LENGTH) {
      setCurrent(c => c + key);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      handleKey(e.key === 'Backspace' ? 'BACKSPACE' : e.key === 'Enter' ? 'ENTER' : e.key.toLowerCase());
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, guesses, gameOver, answer, wordSet]);

  const rows = Array.from({ length: MAX_GUESSES }, (_, i) => {
    if (i < guesses.length) return { letters: guesses[i].split(''), states: states[i] };
    if (i === guesses.length && !gameOver) return { letters: current.padEnd(WORD_LENGTH).split(''), states: Array(WORD_LENGTH).fill('empty') as LetterState[] };
    return { letters: Array(WORD_LENGTH).fill(''), states: Array(WORD_LENGTH).fill('empty') as LetterState[] };
  });

  const keyboard = ['qwertyuiop', 'asdfghjkl', '↵zxcvbnm⌫'];

  return (
    <Layout>
      <SEOHead
        title="Daily Word Challenge — Guess the Word of the Day | Word Unscrambler"
        description="Play the daily word challenge! Guess the 6-letter word of the day in 6 tries. A new word every day. Track your streak and share your results."
        keywords="daily word challenge, word of the day game, wordle alternative, word guessing game"
        canonical="https://wordunscrambler.me/daily-challenge"
      />

      <div className="hero-gradient rounded-2xl p-8 md:p-10 mb-8 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-2">Daily Word <span className="text-yellow-300">Challenge</span></h1>
        <p className="text-blue-100 text-lg">Guess the 6-letter word in 6 tries. New word every day!</p>
        <p className="text-blue-200 text-sm mt-2">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-400 text-lg">Loading today's word…</div>
      ) : (
        <div className="max-w-md mx-auto">
          {message && (
            <div className={`mb-4 p-3 rounded-xl text-center font-bold text-sm ${won ? 'bg-green-100 text-green-700' : gameOver && !won ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
              {message}
            </div>
          )}

          {/* Grid */}
          <div className="grid gap-1.5 mb-6" style={{ gridTemplateRows: `repeat(${MAX_GUESSES}, 1fr)` }}>
            {rows.map((row, ri) => (
              <div key={ri} className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${WORD_LENGTH}, 1fr)` }}>
                {row.letters.map((letter, ci) => (
                  <div key={ci} className={`h-12 flex items-center justify-center text-xl font-black border-2 rounded-lg uppercase transition-all ${cellColor[row.states[ci]]}`}>
                    {letter.trim()}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Keyboard */}
          <div className="space-y-1.5 mb-6">
            {keyboard.map((row, ri) => (
              <div key={ri} className="flex justify-center gap-1">
                {row.split('').map(k => {
                  const key = k === '↵' ? 'ENTER' : k === '⌫' ? 'BACKSPACE' : k;
                  const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
                  const state = usedKeys[k];
                  return (
                    <button
                      key={k}
                      onClick={() => handleKey(key)}
                      className={`${isSpecial ? 'px-2 text-xs' : 'w-9'} h-12 rounded-lg font-bold text-sm uppercase transition-all flex-shrink-0 ${
                        state === 'correct' ? 'bg-green-500 text-white' :
                        state === 'present' ? 'bg-yellow-400 text-white' :
                        state === 'absent' ? 'bg-slate-400 text-white' :
                        'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      }`}
                    >
                      {k === '↵' ? 'Enter' : k === '⌫' ? '←' : k.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {gameOver && (
            <div className={`rounded-xl p-5 text-center mb-6 ${won ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
              {won ? (
                <>
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="font-black text-green-700 text-lg">You got it!</p>
                  <p className="text-green-600 text-sm">Solved in {guesses.length}/{MAX_GUESSES} guesses</p>
                </>
              ) : (
                <>
                  <div className="text-3xl mb-2">😔</div>
                  <p className="font-bold text-slate-700">Better luck tomorrow!</p>
                  <p className="text-slate-500 text-sm">The word was: <strong className="text-blue-600 uppercase">{answer}</strong></p>
                </>
              )}
              <p className="text-xs text-slate-400 mt-3">Come back tomorrow for a new word!</p>
            </div>
          )}
        </div>
      )}

      <AdBanner size="leaderboard" className="my-6" />

      <div className="info-box">
        <p className="text-slate-700 text-sm"><strong className="text-blue-700">How to play:</strong> Guess the 6-letter word in 6 tries. Green = right letter, right spot. Yellow = right letter, wrong spot. Grey = letter not in word. A new word appears every day!</p>
      </div>
    </Layout>
  );
}
