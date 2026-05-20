import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import UnscrambleForm from '../components/UnscrambleForm';
import AdBanner from '../components/AdBanner';
import { LETTER_VALUES } from '../utils/wordUtils';

const highValueLetters = Object.entries(LETTER_VALUES).filter(([, v]) => v >= 4).sort((a, b) => b[1] - a[1]);

export default function ScrabbleWordFinder() {
  return (
    <Layout>
      <SEOHead
        title="Scrabble Word Finder — Find Highest Scoring Words | Word Unscrambler"
        description="Find the highest scoring Scrabble words from your rack letters. Enter up to 20 letters and get results sorted by Scrabble score. TWL and SOWPODS dictionaries supported."
        keywords="scrabble word finder, scrabble cheat, highest scoring scrabble words, scrabble helper, scrabble rack solver"
        canonical="https://wordunscrambler.me/scrabble-word-finder"
      />

      <div className="hero-gradient rounded-2xl p-8 md:p-12 mb-8 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-3">
          Scrabble <span className="text-yellow-300">Word Finder</span>
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Enter your rack letters and find all valid Scrabble words, sorted by score. Beat your opponents every time!
        </p>
      </div>

      <UnscrambleForm
        title="Enter Your Scrabble Rack"
        subtitle="Enter up to 7 rack letters (use ? for blank tiles). Results sorted by Scrabble score."
      />

      <AdBanner size="leaderboard" className="my-8" />

      {/* Scrabble letter values reference */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-black text-slate-800 text-xl mb-4">Scrabble Letter Point Values</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(LETTER_VALUES).map(([l, v]) => (
            <div key={l} className="scrabble-tile">
              {l.toUpperCase()}
              <span className="score">{v}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {highValueLetters.map(([l, v]) => (
            <div key={l} className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-3">
              <div className="scrabble-tile flex-shrink-0" style={{width:36,height:36,fontSize:'0.9rem'}}>
                {l.toUpperCase()}<span className="score">{v}</span>
              </div>
              <div>
                <div className="font-bold text-amber-800 text-sm">{v} points</div>
                <div className="text-amber-600 text-xs">High value!</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-black text-slate-800 text-lg mb-3">Scrabble Tips</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex gap-2"><span className="text-blue-500 font-bold mt-0.5">★</span> Use high-value tiles (Q, Z, X, J) on double/triple letter squares</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold mt-0.5">★</span> Learn 2-letter words — they're essential for hooking</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold mt-0.5">★</span> Using all 7 tiles scores a 50-point bonus (bingo)</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold mt-0.5">★</span> Words ending in -S are powerful for extending existing words</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold mt-0.5">★</span> Keep a balanced rack — avoid too many vowels or consonants</li>
          </ul>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-black text-slate-800 text-lg mb-3">How Scoring Works</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            Each letter has a point value. The total word score is the sum of all letter values, then multiplied by any board bonuses (double word, triple word, etc.).
          </p>
          <div className="bg-blue-50 rounded-lg p-3 text-sm">
            <p className="text-blue-700 font-semibold">Example: QUIZ</p>
            <p className="text-blue-600 text-xs mt-1">Q(10) + U(1) + I(1) + Z(10) = 22 base points</p>
            <p className="text-blue-600 text-xs">On a triple word square = 66 points!</p>
          </div>
        </div>
      </div>

      <AdBanner size="leaderboard" />
    </Layout>
  );
}
