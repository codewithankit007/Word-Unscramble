import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import { useWordList } from '../hooks/useWordList';
import { scrambleWord } from '../utils/wordUtils';

export default function WordScramble() {
  const { words, loading } = useWordList();
  const [input, setInput] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [randomWord, setRandomWord] = useState('');
  const [randomScrambled, setRandomScrambled] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const doScramble = () => {
    if (!input.trim()) return;
    let s = input.trim();
    let attempts = 0;
    do { s = scrambleWord(input.trim()); attempts++; } while (s === input.trim() && attempts < 20);
    setScrambled(s);
    setRevealed(false);
  };

  const getRandomChallenge = () => {
    if (!words.length) return;
    const pool = words.filter(w => w.length >= 4 && w.length <= 8);
    const w = pool[Math.floor(Math.random() * pool.length)];
    setRandomWord(w);
    let s = w; let attempts = 0;
    do { s = scrambleWord(w); attempts++; } while (s === w && attempts < 20);
    setRandomScrambled(s);
    setUserGuess('');
    setFeedback(null);
  };

  const checkGuess = () => {
    if (!userGuess.trim()) return;
    if (userGuess.trim().toLowerCase() === randomWord.toLowerCase()) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Word Scramble — Scramble Any Word & Play Word Scramble Game | Word Unscrambler"
        description="Scramble any word or play our word scramble game. Enter a word to get it scrambled, or challenge yourself with random word scramble puzzles."
        keywords="word scramble, scramble a word, word scramble game, jumble words, scramble letters"
      />
      <div className="hero-gradient rounded-2xl p-6 md:p-8 mb-6 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Word Scramble</h1>
        <p className="text-blue-100">Scramble any word or challenge yourself with random scramble puzzles</p>
      </div>
      <AdBanner size="leaderboard" className="mb-6" />
      <div className="info-box mb-4">
        <p className="text-slate-700 text-sm"><strong className="text-blue-700">Word Unscrambler</strong> is a simple online tool for unscrambling and solving scrambled words, often useful in discovering top scoring words for Scrabble, Words with Friends, Wordle, Wordscapes, Wordfeud, TextTwist, Word Cookies, Anagrams etc.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Scramble a word */}
        <div className="search-box p-6">
          <h2 className="text-lg font-black text-slate-800 mb-4">Scramble a Word</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value.replace(/[^a-zA-Z]/g, ''))}
              onKeyDown={e => e.key === 'Enter' && doScramble()}
              placeholder="Enter any word..."
              className="flex-1 px-4 py-2.5 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold uppercase tracking-wider"
              maxLength={15}
            />
            <button className="btn-primary" onClick={doScramble}>Scramble</button>
          </div>
          {scrambled && (
            <div className="word-modal">
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center mb-3">
                <div className="text-xs text-yellow-600 font-bold uppercase tracking-wide mb-1">Scrambled Result</div>
                <div className="text-3xl font-black tracking-widest uppercase text-yellow-800">{scrambled}</div>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary text-sm py-2" onClick={doScramble}>Rescramble</button>
                <button className="btn-secondary text-sm py-2" onClick={() => setRevealed(!revealed)}>
                  {revealed ? 'Hide Answer' : 'Reveal'}
                </button>
              </div>
              {revealed && (
                <div className="mt-2 text-center text-green-700 font-bold">Answer: {input}</div>
              )}
            </div>
          )}
        </div>

        {/* Random challenge */}
        <div className="search-box p-6">
          <h2 className="text-lg font-black text-slate-800 mb-4">Random Word Challenge</h2>
          <button className="btn-primary w-full mb-4" onClick={getRandomChallenge} disabled={loading}>
            {loading ? 'Loading…' : '🎲 Get Random Word'}
          </button>
          {randomScrambled && (
            <div className="word-modal">
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 text-center mb-3">
                <div className="text-xs text-purple-600 font-bold uppercase tracking-wide mb-1">Unscramble This Word</div>
                <div className="text-3xl font-black tracking-widest uppercase text-purple-800">{randomScrambled}</div>
              </div>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={userGuess}
                  onChange={e => setUserGuess(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                  onKeyDown={e => e.key === 'Enter' && checkGuess()}
                  placeholder="Your answer..."
                  className="flex-1 px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 font-semibold uppercase tracking-wider text-sm"
                  maxLength={15}
                />
                <button className="btn-primary text-sm py-2 px-4" onClick={checkGuess}>Check</button>
              </div>
              {feedback === 'correct' && (
                <div className="bg-green-50 border border-green-300 rounded-lg p-2 text-center text-green-700 font-bold">🎉 Correct! The word is "{randomWord}"</div>
              )}
              {feedback === 'wrong' && (
                <div className="bg-red-50 border border-red-300 rounded-lg p-2 text-center text-red-700 font-bold">❌ Try again! Hint: {randomWord.length} letters</div>
              )}
              {feedback === 'wrong' && (
                <button className="text-xs text-blue-500 mt-2 font-semibold" onClick={() => setFeedback('reveal')}>Give up — show answer</button>
              )}
              {feedback === 'reveal' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center text-blue-700 font-bold mt-2">Answer: {randomWord}</div>
              )}
            </div>
          )}
        </div>
      </div>
      <AdBanner size="leaderboard" />
    </Layout>
  );
}
