import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import { useWordList } from '../hooks/useWordList';
import { getAnagrams } from '../utils/wordUtils';

export default function AnagramSolver() {
  const { words, loading } = useWordList();
  const [input, setInput] = useState('');
  const [results, setResults] = useState<string[] | null>(null);

  const solve = () => {
    if (!input.trim()) return;
    const anagrams = getAnagrams(words, input.trim());
    setResults(anagrams);
  };

  return (
    <Layout>
      <SEOHead
        title="Anagram Solver — Find All Anagrams of Any Word | Word Unscrambler"
        description="Free anagram solver. Find all anagrams of any word or letters instantly. Uses 500,000+ word dictionary to find every possible anagram."
        keywords="anagram solver, find anagrams, word anagram, anagram finder, letters to words"
      />
      <div className="hero-gradient rounded-2xl p-6 md:p-8 mb-6 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Anagram Solver</h1>
        <p className="text-blue-100">Find all words that use exactly your letters — true anagrams</p>
      </div>
      <AdBanner size="leaderboard" className="mb-6" />
      <div className="info-box mb-4">
        <p className="text-slate-700 text-sm"><strong className="text-blue-700">Word Unscrambler</strong> is a simple online tool for unscrambling and solving scrambled words, often useful in discovering top scoring words for Scrabble, Words with Friends, Wordle, Wordscapes, Wordfeud, TextTwist, Word Cookies, Anagrams etc.</p>
      </div>
      <div className="search-box p-6 md:p-8 mb-6">
        <h2 className="text-xl font-black text-slate-800 mb-4">Anagram Solver</h2>
        <p className="text-slate-500 text-sm mb-4">Enter letters to find words that use ALL of your letters (true anagrams).</p>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 15))}
            onKeyDown={e => e.key === 'Enter' && solve()}
            placeholder="e.g. listen, inlets, enlist..."
            className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg font-semibold uppercase tracking-wider"
            disabled={loading}
            maxLength={15}
          />
          <button className="btn-primary" onClick={solve} disabled={loading || !input.trim()}>
            {loading ? 'Loading…' : 'Solve'}
          </button>
        </div>
        {results !== null && (
          <div className="word-modal">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-bold text-slate-700">Anagrams of <strong className="text-blue-600 uppercase">{input.trim()}</strong>:</span>
              <span className="result-badge">{results.length} found</span>
            </div>
            {results.length === 0 ? (
              <div className="text-center py-6 text-slate-500">
                <div className="text-3xl mb-2">🔍</div>
                <p>No perfect anagrams found. Try the <a href="/word-descrambler" className="text-blue-600 font-semibold underline">Word Descrambler</a> to find words using some of the letters.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {results.map(w => (
                  <span key={w} className="word-tile">{w}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-black text-slate-800 text-lg mb-3">What is an Anagram?</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            An anagram is a word or phrase formed by rearranging all the letters of another word or phrase. For example, <strong className="text-blue-600">LISTEN</strong> is an anagram of <strong className="text-blue-600">SILENT</strong>, <strong className="text-blue-600">ENLIST</strong>, and <strong className="text-blue-600">TINSEL</strong>.
          </p>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-xs font-bold text-blue-600 uppercase mb-2">Famous Anagram Examples</div>
            {[['ASTRONOMER', '→ MOON STARER'], ['DORMITORY', '→ DIRTY ROOM'], ['THE EYES', '→ THEY SEE'], ['SCHOOLMASTER', '→ THE CLASSROOM']].map(([a, b]) => (
              <div key={a} className="flex gap-2 text-xs text-slate-600 mb-1">
                <span className="font-bold text-blue-700">{a}</span>
                <span className="text-slate-400">{b}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-black text-slate-800 text-lg mb-3">Anagram vs Unscramble</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            The key difference: an <strong>anagram</strong> uses ALL letters to form a word of the same length. An <strong>unscrambled result</strong> can use any subset of the letters to form shorter or equal-length words.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
              <div className="font-bold text-green-700 mb-1">Anagram</div>
              <div className="text-green-600">Uses ALL letters</div>
              <div className="text-green-600">Same length word</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
              <div className="font-bold text-blue-700 mb-1">Unscramble</div>
              <div className="text-blue-600">Uses any letters</div>
              <div className="text-blue-600">Any length word</div>
            </div>
          </div>
        </div>
      </div>
      <AdBanner size="leaderboard" />
    </Layout>
  );
}
