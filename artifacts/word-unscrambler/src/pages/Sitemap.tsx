import { Link } from 'wouter';
import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';

const sitemapData = [
  {
    category: 'Main Tools',
    icon: '🔧',
    pages: [
      { href: '/', label: 'Home — Word Unscrambler', desc: 'Main word unscrambling tool with 500,000+ word dictionary' },
      { href: '/word-descrambler', label: 'Word Descrambler', desc: 'Descramble letters to find all valid words' },
      { href: '/anagram-solver', label: 'Anagram Solver', desc: 'Find all true anagrams of any word or phrase' },
      { href: '/word-scramble', label: 'Word Scramble', desc: 'Scramble words and play word scramble games' },
      { href: '/random-word', label: 'Random Word Generator', desc: 'Generate random English words with custom filters' },
    ],
  },
  {
    category: 'Game Helpers',
    icon: '🎮',
    pages: [
      { href: '/wordle-solver', label: 'Wordle Solver', desc: 'Find the daily Wordle answer with color-coded clues' },
      { href: '/quordle-solver', label: 'Quordle Solver', desc: 'Solve all 4 Quordle boards simultaneously' },
      { href: '/wordfeud-helper', label: 'Wordfeud Helper', desc: 'Find best words for your Wordfeud tiles' },
      { href: '/check-dictionary', label: 'Check Dictionary', desc: 'Verify if a word is valid in official dictionaries' },
    ],
  },
  {
    category: 'Information',
    icon: 'ℹ️',
    pages: [
      { href: '/about', label: 'About', desc: 'Learn about Word Unscrambler and how it works' },
      { href: '/sitemap', label: 'Sitemap', desc: 'Complete list of all pages on this website' },
    ],
  },
];

export default function Sitemap() {
  return (
    <Layout>
      <SEOHead
        title="Sitemap — All Pages | Word Unscrambler"
        description="Complete sitemap of Word Unscrambler website. Find all word tools, game helpers, and information pages."
        keywords="sitemap, word unscrambler sitemap, all pages"
      />
      <div className="hero-gradient rounded-2xl p-6 md:p-8 mb-6 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Sitemap</h1>
        <p className="text-blue-100">Complete directory of all pages on WordUnscrambler.me</p>
      </div>
      <AdBanner size="leaderboard" className="mb-6" />
      <div className="info-box mb-4">
        <p className="text-slate-700 text-sm"><strong className="text-blue-700">Word Unscrambler</strong> is a simple online tool for unscrambling and solving scrambled words, often useful in discovering top scoring words for Scrabble, Words with Friends, Wordle, Wordscapes, Wordfeud, TextTwist, Word Cookies, Anagrams etc.</p>
      </div>
      <div className="space-y-6 mb-6">
        {sitemapData.map(section => (
          <div key={section.category} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-blue-50 border-b border-blue-100 px-5 py-3 flex items-center gap-2">
              <span className="text-xl">{section.icon}</span>
              <h2 className="font-black text-blue-700 text-base">{section.category}</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {section.pages.map(page => (
                <Link key={page.href} href={page.href} className="flex items-start gap-4 px-5 py-3 hover:bg-blue-50 transition-colors group">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0 group-hover:bg-blue-600"></div>
                  <div>
                    <div className="font-bold text-blue-600 text-sm group-hover:text-blue-700">{page.label}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{page.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <AdBanner size="leaderboard" />
    </Layout>
  );
}
