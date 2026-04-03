import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Trophy, 
  Sparkles,
  Shuffle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

// --- Data ---
const SENTENCES = [
  { 
    spanish: "Hoy es lunes", 
    armenian: "Այսօր երկուշաբթի է", 
    words: ["Hoy", "es", "lunes"],
    hint: "Այսօր (Hoy) + է (es) + երկուշաբթի (lunes)"
  },
  { 
    spanish: "Mañana es martes", 
    armenian: "Վաղը երեքշաբթի է", 
    words: ["Mañana", "es", "martes"],
    hint: "Վաղը (Mañana) + է (es) + երեքշաբթի (martes)"
  },
  { 
    spanish: "Me gusta el café", 
    armenian: "Ինձ սուրճը դուր է գալիս", 
    words: ["Me", "gusta", "el", "café"],
    hint: "Ինձ դուր է գալիս (Me gusta) + սուրճը (el café)"
  },
  { 
    spanish: "Quiero un té armenio", 
    armenian: "Ես հայկական թեյ եմ ուզում", 
    words: ["Quiero", "un", "té", "armenio"],
    hint: "Ուզում եմ (Quiero) + մի (un) + թեյ (té) + հայկական (armenio)"
  },
  { 
    spanish: "El camarero es amable", 
    armenian: "Մատուցողը բարեհամբույր է", 
    words: ["El", "camarero", "es", "amable"],
    hint: "Մատուցողը (El camarero) + է (es) + բարեհամբույր (amable)"
  },
];

export default function SentenceExerciseGame() {
  const [view, setView] = useState<'intro' | 'play' | 'finish'>('intro');
  const [step, setStep] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (view === 'play') {
      const words = [...SENTENCES[step].words];
      // Simple shuffle
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }
      setShuffledWords(words);
      setSelectedWords([]);
      setFeedback(null);
      setShowHint(false);
    }
  }, [view, step]);

  const handleWordClick = (word: string, index: number) => {
    if (feedback === 'correct') return;
    
    const newSelected = [...selectedWords, word];
    setSelectedWords(newSelected);
    
    const newShuffled = [...shuffledWords];
    newShuffled.splice(index, 1);
    setShuffledWords(newShuffled);

    if (newSelected.length === SENTENCES[step].words.length) {
      if (newSelected.join(' ') === SENTENCES[step].spanish) {
        setFeedback('correct');
        setScore(score + 1);
        setTimeout(() => {
          if (step < SENTENCES.length - 1) {
            setStep(step + 1);
          } else {
            setView('finish');
          }
        }, 2000);
      } else {
        setFeedback('wrong');
        setTimeout(() => {
          // Reset current step
          setShuffledWords([...SENTENCES[step].words].sort(() => Math.random() - 0.5));
          setSelectedWords([]);
          setFeedback(null);
        }, 1500);
      }
    }
  };

  const undoWord = (word: string, index: number) => {
    if (feedback === 'correct') return;
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setShuffledWords([...shuffledWords, word]);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-emerald-50 text-emerald-950 font-sans flex flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center bg-white p-12 rounded-[3rem] shadow-2xl border-8 border-emerald-500 max-w-2xl relative overflow-hidden"
          >
            <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-emerald-300 shadow-lg">
              <MessageSquare className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 text-emerald-900 leading-tight">
              Կազմիր <br /> <span className="text-emerald-600">Նախադասություններ</span>
            </h1>
            <p className="text-xl text-emerald-600 mb-12 font-medium">
              Դասավորիր բառերը ճիշտ հերթականությամբ: <br />
              Construye oraciones
            </p>
            <button 
              onClick={() => setView('play')}
              className="px-16 py-6 bg-emerald-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl active:scale-95"
            >
              Սկսել Վարժությունը
            </button>
          </motion.div>
        )}

        {view === 'play' && (
          <motion.div 
            key="play"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl bg-white rounded-[4rem] p-12 md:p-16 shadow-2xl border border-emerald-100 text-center flex flex-col min-h-[600px]"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shuffle className="w-6 h-6 text-white" />
                </div>
                <span className="font-black text-emerald-400 uppercase tracking-[0.3em] text-sm">Նախադասություն {step + 1} / {SENTENCES.length}</span>
              </div>
              <button 
                onClick={() => setShowHint(!showHint)}
                className="p-4 bg-yellow-100 text-yellow-700 rounded-2xl hover:bg-yellow-200 transition-colors shadow-md"
              >
                <Lightbulb className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-12">
              <h2 className="text-4xl font-black italic mb-4 text-emerald-900 leading-tight">
                {SENTENCES[step].armenian}
              </h2>
              <AnimatePresence>
                {showHint && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-emerald-500 font-medium italic mb-4"
                  >
                    Հուշում՝ {SENTENCES[step].hint}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Selected Words Area */}
            <div className="min-h-[120px] p-8 bg-emerald-50 rounded-[2.5rem] border-4 border-dashed border-emerald-200 flex flex-wrap items-center justify-center gap-4 mb-12 relative">
              {selectedWords.length === 0 && (
                <span className="text-emerald-200 font-black uppercase tracking-widest text-xl italic">Ընտրիր բառերը...</span>
              )}
              {selectedWords.map((word, i) => (
                <motion.button
                  layoutId={`word-${word}`}
                  key={`selected-${i}`}
                  onClick={() => undoWord(word, i)}
                  className={`px-8 py-4 rounded-2xl font-black text-xl shadow-lg transition-all ${feedback === 'correct' ? 'bg-emerald-500 text-white' : feedback === 'wrong' ? 'bg-red-500 text-white' : 'bg-white text-emerald-900 border-b-4 border-emerald-100 hover:bg-emerald-50'}`}
                >
                  {word}
                </motion.button>
              ))}
              
              <AnimatePresence>
                {feedback === 'correct' && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-6 -right-6 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shuffled Words Area */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {shuffledWords.map((word, i) => (
                <motion.button
                  layoutId={`word-${word}`}
                  key={`shuffled-${i}`}
                  onClick={() => handleWordClick(word, i)}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xl shadow-xl border-b-4 border-emerald-800 hover:bg-emerald-700 active:border-b-0 active:translate-y-1 transition-all"
                >
                  {word}
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {feedback === 'wrong' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-red-600 font-black uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <XCircle className="w-6 h-6" /> Փորձիր նորից:
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {view === 'finish' && (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-20 rounded-[5rem] shadow-2xl border border-emerald-100 max-w-2xl relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-7xl font-black italic uppercase mb-4 text-emerald-900">Հրաշալի է:</h2>
            <p className="text-2xl text-emerald-600 mb-12 font-medium">
              Դու հաջողությամբ կազմեցիր բոլոր նախադասությունները: <br />
              <span className="text-emerald-400 font-black">¡Muy bien hecho!</span>
            </p>

            <button 
              onClick={() => {
                setView('intro');
                setStep(0);
                setScore(0);
              }}
              className="px-16 py-6 bg-emerald-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto w-full"
            >
              <RefreshCw className="w-6 h-6" />
              Նորից սկսել
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #f0fdf4; }
      `}} />
    </div>
  );
}
