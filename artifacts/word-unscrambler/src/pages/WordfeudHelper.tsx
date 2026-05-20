import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';
import UnscrambleForm from '../components/UnscrambleForm';
import AdBanner from '../components/AdBanner';

export default function WordfeudHelper() {
  return (
    <Layout>
      <SEOHead
        title="Wordfeud Helper — Best Words for Wordfeud | Word Unscrambler"
        description="Wordfeud helper and cheat tool. Find the highest scoring words from your Wordfeud tiles. Supports SOWPODS and TWL dictionaries."
        keywords="wordfeud helper, wordfeud cheat, wordfeud word finder, best wordfeud words, wordfeud dictionary"
      />
      <div className="hero-gradient rounded-2xl p-6 md:p-8 mb-6 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Wordfeud Helper</h1>
        <p className="text-blue-100">Find the best words for your Wordfeud tiles — maximize your score every turn</p>
      </div>
      <AdBanner size="leaderboard" className="mb-6" />
      <div className="info-box mb-4">
        <p className="text-slate-700 text-sm"><strong className="text-blue-700">Word Unscrambler</strong> is a simple online tool for unscrambling and solving scrambled words, often useful in discovering top scoring words for Scrabble, Words with Friends, Wordle, Wordscapes, Wordfeud, TextTwist, Word Cookies, Anagrams etc.</p>
      </div>
      <UnscrambleForm
        title="Wordfeud Tile Helper"
        subtitle="Enter your Wordfeud tiles (up to 7 letters + board letters). Use ? for blank tiles."
      />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-black text-slate-800 text-lg mb-3">About Wordfeud</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Wordfeud is a popular multiplayer word game available on iOS and Android. Similar to Scrabble, players place letter tiles on a board to form words. Each tile has a point value, and special board squares multiply letter or word scores. Our helper finds all valid words you can form from your current tiles.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-black text-slate-800 text-lg mb-3">Wordfeud Strategy Tips</h2>
          <ul className="text-slate-600 text-sm space-y-2">
            {['Always look for triple word score placements', 'Save S, blank tiles for big scoring plays', 'Learn two-letter words — they are game changers', 'Extend existing words to score more', 'Block opponent double/triple word squares'].map(t => (
              <li key={t} className="flex gap-2"><span className="text-blue-500 font-bold">★</span>{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <AdBanner size="leaderboard" className="mt-6" />
    </Layout>
  );
}
