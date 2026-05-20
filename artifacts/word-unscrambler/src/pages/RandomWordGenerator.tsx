import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import { useWordList } from '../hooks/useWordList';
import { scoreWord } from '../utils/wordUtils';

export default function RandomWordGenerator() {
  const { words, loading } = useWordList();
  const [minLen, setMinLen] = useState(4);
  const [maxLen, setMaxLen] = useState(8);
  const [count, setCount] = useState(10);
  const [startsWith, setStartsWith] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!words.length) return;
    let pool = words.filter(w => w.length >= minLen && w.length <= maxLen);
    if (startsWith) pool = pool.filter(w => w.startsWith(startsWith.toLowerCase()));
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setResults(shuffled.slice(0, count));
  };

  const copyAll = () => {
    navigator.clipboard.writeText(results.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <SEOHead
        title="Random Word Generator — Generate Random English Words | Word Unscrambler"
        description="Generate random English words with custom filters. Choose word length, starting letter, and quantity. Great for word games, writing prompts, and vocabulary building."
        keywords="random word generator, generate random words, random english words, word generator tool"
      />
      <div className="hero-gradient rounded-2xl p-6 md:p-8 mb-6 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Random Word Generator</h1>
        <p className="text-blue-100">Generate random words for games, creative writing, or vocabulary practice</p>
      </div>
      <AdBanner size="leaderboard" className="mb-6" />
      <div className="info-box mb-4">
        <p className="text-slate-700 text-sm"><strong className="text-blue-700">Word Unscrambler</strong> is a simple online tool for unscrambling and solving scrambled words, often useful in discovering top scoring words for Scrabble, Words with Friends, Wordle, Wordscapes, Wordfeud, TextTwist, Word Cookies, Anagrams etc.</p>
      </div>
      <div className="search-box p-6 md:p-8 mb-6">
        <h2 className="text-xl font-black text-slate-800 mb-4">Generate Random Words</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Min Length</label>
            <select value={minLen} onChange={e => setMinLen(+e.target.value)} className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white">
              {[2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Max Length</label>
            <select value={maxLen} onChange={e => setMaxLen(+e.target.value)} className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white">
              {[3,4,5,6,7,8,9,10,12,15].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">How Many</label>
            <select value={count} onChange={e => setCount(+e.target.value)} className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white">
              {[5,10,15,20,30,50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Starts With</label>
            <input type="text" value={startsWith} onChange={e => setStartsWith(e.target.value.replace(/[^a-zA-Z]/g,''))} placeholder="Any" maxLength={3} className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary flex-1" onClick={generate} disabled={loading}>
            {loading ? 'Loading…' : '🎲 Generate Random Words'}
          </button>
          {results.length > 0 && (
            <button className="btn-secondary" onClick={copyAll}>
              {copied ? '✓ Copied!' : 'Copy All'}
            </button>
          )}
        </div>
      </div>
      {results.length > 0 && (
        <div className="search-box p-5 mb-6 word-modal">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="font-bold text-slate-700">Generated Words</h3>
            <span className="result-badge">{results.length} words</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {results.map((w, i) => (
              <div key={i} className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center hover:bg-blue-100 cursor-pointer transition-colors"
                onClick={() => navigator.clipboard.writeText(w)}>
                <div className="font-black text-blue-700 uppercase tracking-wide">{w}</div>
                <div className="text-xs text-slate-500 mt-1">{w.length} letters · {scoreWord(w)} pts</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-6">
        <h2 className="font-black text-slate-800 text-lg mb-3">Uses for Random Word Generator</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[['🎮 Word Games', 'Practice for Scrabble, WWF, Wordle'],['✍️ Creative Writing', 'Writing prompts and brainstorming'],['📚 Vocabulary', 'Learn new words daily'],['🎓 Education', 'Teaching vocabulary to students'],['🔑 Passwords', 'Memorable word-based passwords'],['🎨 Creativity', 'Random inspiration for projects']].map(([title, desc]) => (
            <div key={title} className="bg-blue-50 rounded-lg p-3">
              <div className="font-bold text-slate-700 text-sm mb-1">{title}</div>
              <div className="text-slate-500 text-xs">{desc}</div>
            </div>
          ))}
        </div>
      </div>
      <AdBanner size="leaderboard" />
    </Layout>
  );
}
