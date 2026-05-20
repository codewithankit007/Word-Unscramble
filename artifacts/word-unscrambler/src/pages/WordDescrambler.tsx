import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';
import UnscrambleForm from '../components/UnscrambleForm';

export default function WordDescrambler() {
  return (
    <Layout>
      <SEOHead
        title="Word Descrambler — Descramble Any Letters Instantly | Best Free Tool"
        description="Descramble any set of letters and find all valid words instantly. The fastest free word descrambler with 500,000+ dictionary. Perfect for Scrabble, WWF, and Wordle."
        keywords="word descrambler, descramble words, unscramble letters, find words from letters, scrabble helper, word jumble solver"
        canonical="https://unscrambleswords.com/word-descrambler"
      />
      <div className="hero-gradient rounded-2xl p-6 md:p-8 mb-6 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Word Descrambler</h1>
        <p className="text-blue-100">Descramble letters and find all valid words from your tiles — instantly</p>
      </div>
      <UnscrambleForm
        title="Descramble Your Letters"
        subtitle="Enter your scrambled letters below. Use ? for blank/wildcard tiles."
        buttonLabel="Descramble"
      />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-black text-slate-800 text-lg mb-3">What is a Word Descrambler?</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            A word descrambler takes scrambled or jumbled letters and rearranges them to find all valid English words. It's perfect for Scrabble, Words with Friends, Jumble puzzles, Wordscapes, and Word Cookies — helping you maximize your score every time.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-black text-slate-800 text-lg mb-3">When to Use It</h2>
          <ul className="text-slate-600 text-sm space-y-2">
            {['Stuck on your Scrabble rack', 'Need the highest scoring word', 'Words with Friends tough spots', 'Jumble puzzle solving', 'Wordscapes or Word Cookies levels', 'Learning new vocabulary'].map(item => (
              <li key={item} className="flex gap-2 items-start">
                <span className="text-blue-500 font-bold mt-0.5">→</span>{item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
