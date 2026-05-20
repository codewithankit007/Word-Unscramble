import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import CheckDictionary from "@/pages/CheckDictionary";
import WordDescrambler from "@/pages/WordDescrambler";
import WordScramble from "@/pages/WordScramble";
import WordfeudHelper from "@/pages/WordfeudHelper";
import AnagramSolver from "@/pages/AnagramSolver";
import RandomWordGenerator from "@/pages/RandomWordGenerator";
import WordleSolver from "@/pages/WordleSolver";
import QuordleSolver from "@/pages/QuordleSolver";
import Sitemap from "@/pages/Sitemap";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import WordsByLength from "@/pages/WordsByLength";
import WordsStartingWith from "@/pages/WordsStartingWith";
import WordsEndingIn from "@/pages/WordsEndingIn";
import ScrabbleWordFinder from "@/pages/ScrabbleWordFinder";
import WordleHelper from "@/pages/WordleHelper";
import DailyChallenge from "@/pages/DailyChallenge";
import FavoriteWords from "@/pages/FavoriteWords";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
    <ScrollToTop />
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/check-dictionary" component={CheckDictionary} />
      <Route path="/word-descrambler" component={WordDescrambler} />
      <Route path="/word-scramble" component={WordScramble} />
      <Route path="/wordfeud-helper" component={WordfeudHelper} />
      <Route path="/anagram-solver" component={AnagramSolver} />
      <Route path="/random-word" component={RandomWordGenerator} />
      <Route path="/wordle-solver" component={WordleSolver} />
      <Route path="/quordle-solver" component={QuordleSolver} />
      <Route path="/sitemap" component={Sitemap} />
      <Route path="/about" component={About} />

      {/* Word list pages */}
      <Route path="/2-letter-words">{() => <WordsByLength length={2} />}</Route>
      <Route path="/3-letter-words">{() => <WordsByLength length={3} />}</Route>
      <Route path="/4-letter-words">{() => <WordsByLength length={4} />}</Route>
      <Route path="/5-letter-words">{() => <WordsByLength length={5} />}</Route>
      <Route path="/6-letter-words">{() => <WordsByLength length={6} />}</Route>
      <Route path="/7-letter-words">{() => <WordsByLength length={7} />}</Route>
      <Route path="/8-letter-words">{() => <WordsByLength length={8} />}</Route>
      <Route path="/words-starting-with-a">{() => <WordsStartingWith prefix="a" />}</Route>
      <Route path="/words-starting-with-b">{() => <WordsStartingWith prefix="b" />}</Route>
      <Route path="/words-starting-with-c">{() => <WordsStartingWith prefix="c" />}</Route>
      <Route path="/words-starting-with-d">{() => <WordsStartingWith prefix="d" />}</Route>
      <Route path="/words-starting-with-e">{() => <WordsStartingWith prefix="e" />}</Route>
      <Route path="/words-starting-with-f">{() => <WordsStartingWith prefix="f" />}</Route>
      <Route path="/words-starting-with-g">{() => <WordsStartingWith prefix="g" />}</Route>
      <Route path="/words-starting-with-h">{() => <WordsStartingWith prefix="h" />}</Route>
      <Route path="/words-starting-with-i">{() => <WordsStartingWith prefix="i" />}</Route>
      <Route path="/words-starting-with-j">{() => <WordsStartingWith prefix="j" />}</Route>
      <Route path="/words-starting-with-k">{() => <WordsStartingWith prefix="k" />}</Route>
      <Route path="/words-starting-with-l">{() => <WordsStartingWith prefix="l" />}</Route>
      <Route path="/words-starting-with-m">{() => <WordsStartingWith prefix="m" />}</Route>
      <Route path="/words-starting-with-n">{() => <WordsStartingWith prefix="n" />}</Route>
      <Route path="/words-starting-with-o">{() => <WordsStartingWith prefix="o" />}</Route>
      <Route path="/words-starting-with-p">{() => <WordsStartingWith prefix="p" />}</Route>
      <Route path="/words-starting-with-q">{() => <WordsStartingWith prefix="q" />}</Route>
      <Route path="/words-starting-with-r">{() => <WordsStartingWith prefix="r" />}</Route>
      <Route path="/words-starting-with-s">{() => <WordsStartingWith prefix="s" />}</Route>
      <Route path="/words-starting-with-t">{() => <WordsStartingWith prefix="t" />}</Route>
      <Route path="/words-starting-with-u">{() => <WordsStartingWith prefix="u" />}</Route>
      <Route path="/words-starting-with-v">{() => <WordsStartingWith prefix="v" />}</Route>
      <Route path="/words-starting-with-w">{() => <WordsStartingWith prefix="w" />}</Route>
      <Route path="/words-starting-with-x">{() => <WordsStartingWith prefix="x" />}</Route>
      <Route path="/words-starting-with-y">{() => <WordsStartingWith prefix="y" />}</Route>
      <Route path="/words-starting-with-z">{() => <WordsStartingWith prefix="z" />}</Route>
      <Route path="/words-ending-in-ing">{() => <WordsEndingIn suffix="ing" />}</Route>
      <Route path="/words-ending-in-ed">{() => <WordsEndingIn suffix="ed" />}</Route>
      <Route path="/words-ending-in-er">{() => <WordsEndingIn suffix="er" />}</Route>
      <Route path="/words-ending-in-ly">{() => <WordsEndingIn suffix="ly" />}</Route>
      <Route path="/words-ending-in-tion">{() => <WordsEndingIn suffix="tion" />}</Route>
      <Route path="/words-ending-in-ness">{() => <WordsEndingIn suffix="ness" />}</Route>
      <Route path="/words-ending-in-ment">{() => <WordsEndingIn suffix="ment" />}</Route>
      <Route path="/words-ending-in-less">{() => <WordsEndingIn suffix="less" />}</Route>
      <Route path="/words-ending-in-ful">{() => <WordsEndingIn suffix="ful" />}</Route>
      <Route path="/words-ending-in-able">{() => <WordsEndingIn suffix="able" />}</Route>

      {/* Tool pages */}
      <Route path="/scrabble-word-finder" component={ScrabbleWordFinder} />
      <Route path="/wordle-helper" component={WordleHelper} />
      <Route path="/daily-challenge" component={DailyChallenge} />
      <Route path="/favorites" component={FavoriteWords} />

      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
