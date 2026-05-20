import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';

export default function About() {
  return (
    <Layout>
      <SEOHead
        title="About Word Unscrambler — How It Works | Word Unscrambler"
        description="Learn about Word Unscrambler tool. How we unscramble words, our dictionary sources, and how to use the tool effectively for Scrabble, Wordle, and more."
        keywords="about word unscrambler, how word unscrambler works, word unscrambler dictionary"
      />
      <div className="hero-gradient rounded-2xl p-6 md:p-8 mb-6 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-2">About Word Unscrambler</h1>
        <p className="text-blue-100">Learn about our tools, dictionary, and how we help you win word games</p>
      </div>
      <AdBanner size="leaderboard" className="mb-6" />
      <div className="info-box mb-6">
        <p className="text-slate-700 text-sm"><strong className="text-blue-700">Word Unscrambler</strong> is a simple online tool for unscrambling and solving scrambled words, often useful in discovering top scoring words for Scrabble, Words with Friends, Wordle, Wordscapes, Wordfeud, TextTwist, Word Cookies, Anagrams etc.</p>
      </div>
      <div className="space-y-6 mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-black text-slate-800 text-xl mb-4">What is Word Unscrambler?</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            When you're stuck with some random letters, want to make words out of those scrambled letters? Well, that's what this website is designed for. Whether you need any help or just want to learn new words or perhaps you want to cheat a little, with such word games, this website will save your time and frustration often.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            Words games are going to be more fun if you have a well designed site like this one available at disposal. It also becomes easier to find answers for Word Cookies, Wordscapes, or similar games.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            You can enter up to 12 letters (including two wild cards or blank tiles) and it shows you the valid words that can be made from the scrambled letters on board. Using this word helper tool, you will not only make yourself stronger against your opponent but also learn plenty of useful words and new combinations of letters, that would enrich your vocabulary as well.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📚', title: '500,000+ Words', desc: 'Our dictionary combines TWL, SOWPODS, and ENABLE word lists for maximum coverage.' },
            { icon: '⚡', title: 'Lightning Fast', desc: 'Our algorithm finds all valid words from your letters in milliseconds.' },
            { icon: '🎮', title: 'Multi-Game Support', desc: 'Works for Scrabble, Words with Friends, Wordle, Wordscapes, Wordfeud, TextTwist, and more.' },
          ].map(item => (
            <div key={item.title} className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-black text-blue-700 text-base mb-1">{item.title}</div>
              <p className="text-slate-600 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-black text-slate-800 text-xl mb-4">How Does It Work?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-blue-700 mb-2">The Algorithm</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our word unscrambler uses a highly optimized letter-matching algorithm. For each word in our dictionary, it checks whether the word can be formed using a subset of your input letters. Results are sorted by Scrabble point value so the highest-scoring words appear first.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-blue-700 mb-2">Blank Tiles / Wildcards</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Use the <strong>?</strong> character to represent blank tiles (wildcards). These can substitute any letter. You can use up to 2 wildcards per search. The wildcard is worth 0 points in Scrabble, so word scores are adjusted accordingly.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-black text-slate-800 text-xl mb-4">Supported Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {['Scrabble', 'Words with Friends', 'Wordle', 'Wordscapes', 'Wordfeud', 'TextTwist', 'Word Cookies', 'Jumble', 'Boggle', 'Quordle', 'Spelling Bee', 'Crossword'].map(game => (
              <div key={game} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center border border-blue-200">
                <div className="font-bold text-blue-700 text-xs">{game}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-black text-slate-800 text-xl mb-4">Our Dictionary Sources</h2>
          <div className="space-y-3">
            {[
              { name: 'TWL / OTCWL', full: 'Tournament Word List / Official Tournament and Club Word List', desc: 'The official Scrabble dictionary for North American (US, Canada, Thailand) tournament play. Maintained by NASPA (North American Scrabble Players Association).' },
              { name: 'SOWPODS / CSW', full: 'Collins Scrabble Words', desc: 'Used in UK, Australia, and international Scrabble tournaments. A superset of TWL with additional valid words from British English.' },
              { name: 'ENABLE', full: 'Enhanced North American Benchmark Lexicon', desc: 'A public domain word list with 172,000+ common English words, used as a baseline for many word game applications.' },
            ].map(dict => (
              <div key={dict.name} className="flex gap-4 p-3 bg-slate-50 rounded-lg">
                <div className="font-black text-blue-700 text-sm w-28 flex-shrink-0">{dict.name}</div>
                <div>
                  <div className="font-semibold text-slate-700 text-xs mb-1">{dict.full}</div>
                  <p className="text-slate-500 text-xs">{dict.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-black text-slate-800 text-xl mb-3">Contact & Feedback</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Feel free to send us any feedback or report any issues with our tool. We are constantly working to improve the word list, add new features, and make the tool faster and more accurate. Thank you for visiting our website!
          </p>
          <p className="text-slate-500 text-xs mt-3">
            Note: Feel free to send us any feedback or report on the new look of our site. Thank you for visiting our website.
          </p>
        </div>
      </div>
      <AdBanner size="leaderboard" />
    </Layout>
  );
}
