import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import AdBanner from '../components/AdBanner';
import { scoreWord, LETTER_VALUES } from '../utils/wordUtils';

const STORAGE_KEY = 'wu-favorites';

export interface FavoriteWord {
  word: string;
  score: number;
  addedAt: number;
  note?: string;
}

export function getFavorites(): FavoriteWord[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

export function addFavorite(word: string, note?: string) {
  const favs = getFavorites();
  if (favs.find(f => f.word === word.toLowerCase())) return;
  favs.push({ word: word.toLowerCase(), score: scoreWord(word), addedAt: Date.now(), note });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function removeFavorite(word: string) {
  const favs = getFavorites().filter(f => f.word !== word.toLowerCase());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export default function FavoriteWords() {
  const [favorites, setFavorites] = useState<FavoriteWord[]>([]);
  const [input, setInput] = useState('');
  const [note, setNote] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'alpha' | 'score'>('recent');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => { setFavorites(getFavorites()); }, []);

  const refresh = () => setFavorites(getFavorites());

  const handleAdd = () => {
    const w = input.trim().toLowerCase().replace(/[^a-z]/g, '');
    if (!w) return;
    if (favorites.find(f => f.word === w)) { setMessage('Word already saved!'); setTimeout(() => setMessage(''), 2000); return; }
    addFavorite(w, note.trim() || undefined);
    setInput(''); setNote('');
    refresh();
    setMessage(`"${w}" added to favorites!`);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleRemove = (word: string) => {
    removeFavorite(word);
    refresh();
  };

  const sorted = [...favorites]
    .filter(f => !search || f.word.includes(search.toLowerCase()))
    .sort((a, b) =>
      sortBy === 'recent' ? b.addedAt - a.addedAt :
      sortBy === 'alpha' ? a.word.localeCompare(b.word) :
      b.score - a.score
    );

  const totalScore = favorites.reduce((s, f) => s + f.score, 0);

  return (
    <Layout>
      <SEOHead
        title="Saved Favorite Words — Your Personal Word Collection | Word Unscrambler"
        description="Save and manage your favorite words. Build your personal word collection with Scrabble scores, add notes, and export your list. Words saved locally in your browser."
        keywords="save words, favorite words list, word collection, word bank, scrabble word list"
        canonical="https://wordunscrambler.me/favorites"
      />

      <div className="hero-gradient rounded-2xl p-8 md:p-12 mb-8 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-3">
          My <span className="text-yellow-300">Favorite Words</span>
        </h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          Build your personal word collection. Save words with notes and track Scrabble scores.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Saved Words', value: favorites.length },
          { label: 'Total Score', value: totalScore },
          { label: 'Avg Score', value: favorites.length ? Math.round(totalScore / favorites.length) : 0 },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-black text-blue-600">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Add word */}
      <div className="search-box p-6 mb-6">
        <h2 className="text-lg font-black text-slate-800 mb-4">Add a Word</h2>
        {message && <div className="mb-3 p-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-semibold">{message}</div>}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value.replace(/[^a-zA-Z]/g, ''))}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Enter a word…"
            className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold uppercase tracking-wider"
            maxLength={20}
          />
          <input
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Add a note (optional)"
            className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 text-sm"
            maxLength={60}
          />
          <button className="btn-primary whitespace-nowrap" onClick={handleAdd} disabled={!input.trim()}>
            ★ Save Word
          </button>
        </div>
        {input && (
          <div className="mt-3 flex items-center gap-3">
            <span className="text-sm text-slate-500">Preview:</span>
            <div className="scrabble-tile">{input[0]?.toUpperCase() || ''}<span className="score">{LETTER_VALUES[input[0]?.toLowerCase()] || 0}</span></div>
            <span className="text-sm font-bold text-blue-600">Score: {scoreWord(input)} pts</span>
          </div>
        )}
      </div>

      <AdBanner size="leaderboard" className="mb-6" />

      {/* List */}
      <div className="search-box p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-black text-slate-800">{sorted.length} Saved Words</h2>
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
            {(['recent','alpha','score'] as const).map(s => (
              <button key={s} onClick={() => setSortBy(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${sortBy === s ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}>
                {s === 'recent' ? 'Recent' : s === 'alpha' ? 'A–Z' : 'Score'}
              </button>
            ))}
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">⭐</div>
            <p className="font-bold text-slate-600">No favorites yet</p>
            <p className="text-slate-400 text-sm mt-1">Add words above, or click ★ on any word in search results</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map(fav => (
              <div key={fav.word} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                <div className="scrabble-tile flex-shrink-0" style={{width:36,height:36,fontSize:'0.85rem'}}>
                  {fav.word[0].toUpperCase()}<span className="score">{LETTER_VALUES[fav.word[0]] || 0}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-black text-slate-800 uppercase tracking-wider">{fav.word}</span>
                  {fav.note && <span className="ml-2 text-slate-400 text-xs">— {fav.note}</span>}
                </div>
                <span className="text-blue-600 font-bold text-sm flex-shrink-0">{fav.score} pts</span>
                <span className="text-slate-300 text-xs flex-shrink-0">{fav.word.length} letters</span>
                <button onClick={() => handleRemove(fav.word)} className="text-slate-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {favorites.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
            <p className="text-xs text-slate-400">Words are saved in your browser (localStorage)</p>
            <button
              onClick={() => { if (confirm('Clear all saved words?')) { localStorage.removeItem(STORAGE_KEY); refresh(); } }}
              className="text-xs text-red-400 hover:text-red-600 font-semibold"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <AdBanner size="leaderboard" className="mt-6" />
    </Layout>
  );
}
