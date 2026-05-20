import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';
import UnscrambleForm from '../components/UnscrambleForm';
import { Link } from 'wouter';

const commonExamples = ['aeirtu', 'listen', 'python', 'silent', 'scrable', 'wordle'];

export default function Home() {
  return (
    <Layout>
      <SEOHead
        title="Word Unscrambler – #1 Free Scrabble & Wordle Helper | Unscramble Letters Fast"
        description="Instantly unscramble words for Scrabble, Wordle & Words with Friends. Free online word finder with 500K+ dictionary. Find highest scoring words in seconds!"
        keywords="word unscrambler, unscramble words, scrabble word finder, wordle helper, words with friends cheat, anagram solver, word descrambler, jumble solver"
        canonical="https://unscrambleswords.com/"
      />

      {/* Hero — compact */}
      <div className="hero-gradient rounded-xl px-5 py-4 mb-5 text-white text-center">
        <h1 className="text-2xl md:text-3xl font-black mb-1 tracking-tight">
          Word <span className="text-yellow-300">Unscrambler</span>
        </h1>
        <p className="text-blue-100 text-sm max-w-xl mx-auto leading-snug">
          Enter scrambled letters → get all valid words instantly. Best tool for Scrabble, Wordle & Words with Friends.
        </p>
      </div>

      {/* Main unscrambler */}
      <UnscrambleForm
        title="Unscramble Your Letters"
        subtitle="Enter up to 20 letters (use ? for blank tiles). Results shown as 8, 7, 6, 5, 4, 3, 2 letter words."
      />

      {/* Quick links to popular tools */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
        {[
          { href: '/scrabble-word-finder', label: '🎯 Scrabble Word Finder', color: 'bg-amber-50 border-amber-200 text-amber-800' },
          { href: '/wordle-helper', label: '🟩 Wordle Helper', color: 'bg-green-50 border-green-200 text-green-800' },
          { href: '/daily-challenge', label: '🎮 Daily Challenge', color: 'bg-purple-50 border-purple-200 text-purple-800' },
          { href: '/anagram-solver', label: '🔤 Anagram Solver', color: 'bg-blue-50 border-blue-200 text-blue-800' },
        ].map(({ href, label, color }) => (
          <Link key={href} href={href} className={`border rounded-xl p-3 text-center text-sm font-semibold hover:shadow-md transition-all ${color}`}>
            {label}
          </Link>
        ))}
      </div>

      {/* Example searches */}
      <div className="search-box p-4 mb-6">
        <h3 className="font-bold text-slate-600 text-xs uppercase tracking-wide mb-3">Try these examples:</h3>
        <div className="flex flex-wrap gap-2">
          {commonExamples.map(ex => (
            <a key={ex} href={`?q=${ex}`} className="bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-100 transition-colors">
              {ex}
            </a>
          ))}
        </div>
      </div>

      {/* Word list quick links */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-6">
        <h2 className="font-black text-slate-800 text-base mb-3">Browse Words by Length</h2>
        <div className="flex flex-wrap gap-2">
          {[2,3,4,5,6,7,8].map(n => (
            <a key={n} href={`/${n}-letter-words`} className="px-3 py-1.5 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 rounded-lg text-sm font-semibold transition-colors">
              {n} Letters
            </a>
          ))}
        </div>
      </div>

      {/* Info content */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-black text-slate-800 text-lg mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs">?</span>
              What is Word Unscrambler?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              When you're stuck with random letters and need to make valid words fast — this is the tool for you. Enter up to 20 letters (including wild card ? tiles) and instantly see all valid words sorted by length and Scrabble score.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-black text-slate-800 text-lg mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">⚙</span>
              Advanced Filters
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Use the <strong>Options</strong> button to filter by dictionary (TWL for US/Canada, SOWPODS for UK), or narrow results by words that start with, end with, or must include specific letters.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-black text-slate-800 text-lg mb-4">Scrabble Letter Values</h2>
          <div className="flex flex-wrap gap-1.5">
            {(Object.entries({A:1,B:3,C:3,D:2,E:1,F:4,G:2,H:4,I:1,J:8,K:5,L:1,M:3,N:1,O:1,P:3,Q:10,R:1,S:1,T:1,U:1,V:4,W:4,X:8,Y:4,Z:10}) as [string, number][]).map(([l, v]) => (
              <div key={l} className="scrabble-tile" style={{width:32,height:32,fontSize:'0.75rem'}}>
                {l}<span className="score" style={{fontSize:'0.5rem'}}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ for SEO */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-black text-slate-800 text-lg mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What is the best word unscrambler?', a: 'UnscrambleWords.com is one of the best free word unscramblers, with a 500,000+ word dictionary covering TWL (US/Canada), SOWPODS (UK), and ENABLE word lists.' },
              { q: 'Can I use it for Scrabble?', a: 'Yes! Results are sorted by Scrabble score. Use the Scrabble Word Finder for rack-specific searches with tile values shown.' },
              { q: 'Does it work for Wordle?', a: 'Yes — use the Wordle Helper page to enter green, yellow, and grey letter clues to find all possible answers.' },
              { q: 'What is a blank tile (?)?', a: 'A blank tile can represent any letter. Enter ? in your letters to use it as a wildcard in Scrabble or Words with Friends.' },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <p className="font-bold text-slate-700 text-sm mb-1">{q}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
