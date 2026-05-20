import { useState } from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import AdBanner from '../components/AdBanner';
import { useWordList } from '../hooks/useWordList';
import { getWordleMatches } from '../utils/wordUtils';

export default function WordleHelper() {
  const { words, loading } = useWordList();
  const [pattern, setPattern] = useState('?????');
  const [present, setPresent] = useState('');
  const [absent, setAbsent] = useState('');
  const [results, setResults] = useState<string[] | null>(null);

  const fiveLetterWords = words.filter(w => w.length === 5);

  const handleSearch = () => {
    const matches = getWordleMatches(fiveLetterWords, pattern.toLowerCase(), present, absent);
    setResults(matches.slice(0, 300));
  };

  const patternCells = pattern.padEnd(5, '?').slice(0, 5).split('');

  return (
    <Layout>
      <SEOHead
        title="Wordle Helper — Find Today's Wordle Answer | Word Unscrambler"
        description="Stuck on Wordle? Enter your green letters, yellow letters, and grey letters to find all possible answers. Free Wordle solver with 5-letter word database."
        keywords="wordle helper, wordle solver, wordle cheat, wordle answer today, 5 letter words wordle"
        canonical="https://wordunscrambler.me/wordle-helper"
      />

      <div className="hero-gradient rounded-2xl p-8 md:p-12 mb-8 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-3">
          Wordle <span className="text-yellow-300">Helper</span>
        </h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          Stuck on today's Wordle? Enter what you know and find all possible answers instantly.
        </p>
      </div>

      <div className="search-box p-6 md:p-8 mb-6">
        <h2 className="text-xl font-black text-slate-800 mb-5">Enter Your Clues</h2>

        {/* Pattern input */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
            🟩 Green Letters (correct position) — use ? for unknown
          </label>
          <div className="flex gap-2 mb-2">
            {patternCells.map((c, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={c === '?' ? '' : c.toUpperCase()}
                onChange={e => {
                  const val = e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase() || '?';
                  const arr = pattern.padEnd(5, '?').slice(0, 5).split('');
                  arr[i] = val;
                  setPattern(arr.join(''));
                }}
                placeholder="?"
                className="w-12 h-12 text-center text-lg font-black border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-500 bg-green-50 text-green-800 uppercase"
              />
            ))}
          </div>
          <p className="text-xs text-slate-400">Leave blank = unknown position</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
              🟨 Yellow Letters (wrong position, but in word)
            </label>
            <input
              type="text"
              value={present}
              onChange={e => setPresent(e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase())}
              placeholder="e.g. aet"
              className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:border-yellow-500 bg-yellow-50 text-yellow-800 font-semibold uppercase tracking-widest"
              maxLength={10}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
              ⬛ Grey Letters (not in word)
            </label>
            <input
              type="text"
              value={absent}
              onChange={e => setAbsent(e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase())}
              placeholder="e.g. srnob"
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-slate-500 font-semibold uppercase tracking-widest"
              maxLength={26}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button className="btn-primary" onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading…' : 'Find Possible Words'}
          </button>
          <button className="btn-secondary" onClick={() => { setPattern('?????'); setPresent(''); setAbsent(''); setResults(null); }}>
            Reset
          </button>
        </div>

        {results !== null && (
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold text-slate-700">{results.length} possible words</span>
              {results.length === 300 && <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Showing top 300 — add more clues to narrow down</span>}
            </div>
            {results.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <div className="text-3xl mb-2">🔍</div>
                <p>No matching words found. Try relaxing your constraints.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {results.map(word => (
                  <span key={word} className="word-tile text-sm uppercase font-black tracking-wider">
                    {word.split('').map((c, i) => (
                      <span key={i} className={
                        pattern[i] && pattern[i] !== '?' && pattern[i] === c ? 'text-green-300' :
                        present.includes(c) ? 'text-yellow-300' : ''
                      }>{c}</span>
                    ))}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <AdBanner size="leaderboard" className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { icon: '🟩', title: 'Green Letters', desc: 'Letter is in the word AND in the correct position. Enter it in the exact box.' },
          { icon: '🟨', title: 'Yellow Letters', desc: 'Letter IS in the word but in a WRONG position. Add it to the yellow field.' },
          { icon: '⬛', title: 'Grey Letters', desc: 'Letter is NOT in the word at all. Add it to the grey field to exclude it.' },
        ].map(tip => (
          <div key={tip.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="text-3xl mb-2">{tip.icon}</div>
            <h3 className="font-black text-slate-800 text-sm mb-2">{tip.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>

      <AdBanner size="leaderboard" />
    </Layout>
  );
}
