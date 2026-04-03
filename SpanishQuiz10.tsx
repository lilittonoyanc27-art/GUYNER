import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Trophy, 
  Sparkles,
  ChevronRight,
  BookOpen,
  Star,
  Zap,
  Target
} from 'lucide-react';

// --- Data ---
const QUIZ_DATA = [
  { 
    question: "Hoy es lunes. Mañana es ___.", 
    options: ["Martes", "Miércoles", "Jueves"], 
    correct: "Martes", 
    armenian: "Այսօր երկուշաբթի է: Վաղը ___ է:",
    translation: "Hoy es lunes. Mañana es martes."
  },
  { 
    question: "¿Qué desean ___?", 
    options: ["comer", "tomar", "hablar"], 
    correct: "tomar", 
    armenian: "Ի՞նչ կցանկանաք ___:",
    translation: "¿Qué desean tomar?"
  },
  { 
    question: "Queremos dos ___ armenios.", 
    options: ["cafés", "tés", "jugos"], 
    correct: "tés", 
    armenian: "Մենք երկու հայկական ___ ենք ուզում:",
    translation: "Queremos dos tés armenios."
  },
  { 
    question: "Ayer fue domingo. Hoy es ___.", 
    options: ["Lunes", "Sábado", "Martes"], 
    correct: "Lunes", 
    armenian: "Երեկ կիրակի էր: Այսօր ___ է:",
    translation: "Ayer fue domingo. Hoy es lunes."
  },
  { 
    question: "Pasado mañana es viernes. Hoy es ___.", 
    options: ["Jueves", "Miércoles", "Sábado"], 
    correct: "Miércoles", 
    armenian: "Վաղը չէ մյուս օրը ուրբաթ է: Այսօր ___ է:",
    translation: "Pasado mañana es viernes. Hoy es miércoles."
  },
  { 
    question: "¿Tienen ___?", 
    options: ["leche", "azúcar", "limón"], 
    correct: "azúcar", 
    armenian: "___ ունե՞ք:",
    translation: "¿Tienen azúcar?"
  },
  { 
    question: "El camarero es ___.", 
    options: ["amable", "triste", "enfadado"], 
    correct: "amable", 
    armenian: "Մատուցողը ___ է:",
    translation: "El camarero es amable."
  },
  { 
    question: "Anteayer fue viernes. Ayer fue ___.", 
    options: ["Domingo", "Sábado", "Jueves"], 
    correct: "Sábado", 
    armenian: "Նախանցյալ օրը ուրբաթ էր: Երեկ ___ էր:",
    translation: "Anteayer fue viernes. Ayer fue sábado."
  },
  { 
    question: "Me ___ el café.", 
    options: ["gusta", "quiero", "tengo"], 
    correct: "gusta", 
    armenian: "Ինձ սուրճը ___ է գալիս:",
    translation: "Me gusta el café."
  },
  { 
    question: "___ es jueves.", 
    options: ["Ayer", "Hoy", "Mañana"], 
    correct: "Hoy", 
    armenian: "___ հինգշաբթի է:",
    translation: "Hoy es jueves."
  },
];

export default function SpanishQuiz10() {
  const [view, setView] = useState<'intro' | 'quiz' | 'finish'>('intro');
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleAnswer = (option: string) => {
    if (feedback) return;
    if (option === QUIZ_DATA[step].correct) {
      setFeedback('correct');
      setScore(score + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (step < QUIZ_DATA.length - 1) {
        setStep(step + 1);
      } else {
        setView('finish');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-indigo-50 text-indigo-950 font-sans flex flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center bg-white p-12 rounded-[3rem] shadow-2xl border-8 border-indigo-500 max-w-2xl relative overflow-hidden"
          >
            <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-indigo-300 shadow-lg">
              <BookOpen className="w-12 h-12 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 text-indigo-900 leading-tight">
              Իսպաներենի <br /> <span className="text-indigo-600">Մեծ Թեստ</span>
            </h1>
            <p className="text-xl text-indigo-600 mb-12 font-medium">
              10 հարց շաբաթվա օրերի, ժամանակի և ռեստորանի մասին: <br />
              Examen de español
            </p>
            <button 
              onClick={() => setView('quiz')}
              className="px-16 py-6 bg-indigo-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl active:scale-95 flex items-center gap-4 mx-auto"
            >
              <Zap className="w-8 h-8 fill-white" />
              Սկսել Թեստը
            </button>
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl bg-white rounded-[4rem] p-12 md:p-16 shadow-2xl border border-indigo-100 text-center flex flex-col min-h-[550px]"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="font-black text-indigo-400 uppercase tracking-[0.3em] text-sm">Հարց {step + 1} / {QUIZ_DATA.length}</span>
              </div>
              <div className="bg-indigo-50 px-6 py-2 rounded-full font-black text-indigo-600 border border-indigo-100">
                Միավորներ՝ {score}
              </div>
            </div>

            <div className="mb-12 flex-1 flex flex-col justify-center">
              <h2 className="text-4xl font-black italic mb-6 text-indigo-900 leading-tight">
                {QUIZ_DATA[step].question.split('___').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-8 mx-2">
                        {feedback === 'correct' ? QUIZ_DATA[step].correct : '___'}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </h2>
              <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 inline-block mx-auto">
                <p className="text-2xl font-bold text-indigo-800">
                  {QUIZ_DATA[step].armenian.replace('___', feedback === 'correct' ? QUIZ_DATA[step].correct : '___')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto w-full">
              {QUIZ_DATA[step].options.map((option) => (
                <button 
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={!!feedback}
                  className={`py-6 rounded-[2rem] font-black text-2xl transition-all border-b-8 active:border-b-0 active:translate-y-2 ${feedback === 'correct' && option === QUIZ_DATA[step].correct ? 'bg-emerald-500 border-emerald-700 text-white' : feedback === 'wrong' && option !== QUIZ_DATA[step].correct ? 'bg-indigo-50 border-indigo-100 text-indigo-200 opacity-50' : feedback === 'wrong' && option === QUIZ_DATA[step].correct ? 'bg-red-500 border-red-700 text-white' : 'bg-indigo-600 border-indigo-800 text-white hover:bg-indigo-700'}`}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-8 flex items-center justify-center gap-3 font-black uppercase tracking-widest text-2xl ${feedback === 'correct' ? 'text-emerald-600' : 'text-red-600'}`}
                >
                  {feedback === 'correct' ? <><CheckCircle2 className="w-8 h-8" /> Ճիշտ է:</> : <><XCircle className="w-8 h-8" /> Սխալ է:</>}
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
            className="text-center bg-white p-20 rounded-[5rem] shadow-2xl border border-indigo-100 max-w-2xl relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-7xl font-black italic uppercase mb-4 text-indigo-900">
              {score >= 8 ? 'ՀՐԱՇԱԼԻ Է:' : 'ԼԱՎ Է:'}
            </h2>
            <p className="text-2xl text-indigo-600 mb-12 font-medium">
              Դու ավարտեցիր 10 հարցից բաղկացած թեստը: <br />
              Քո արդյունքը՝ <span className="text-indigo-600 font-black text-4xl">{score} / {QUIZ_DATA.length}</span>
            </p>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  setView('intro');
                  setStep(0);
                  setScore(0);
                }}
                className="px-16 py-6 bg-indigo-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto w-full"
              >
                <RefreshCw className="w-6 h-6" />
                Նորից սկսել
              </button>
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-indigo-300 font-black text-xs uppercase tracking-widest">
                  <Star className="w-4 h-4" />
                  <span>Examen de español</span>
                </div>
                <div className="w-1 h-1 bg-indigo-100 rounded-full" />
                <div className="flex items-center gap-2 text-indigo-300 font-black text-xs uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" />
                  <span>Իսպաներեն</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #eef2ff; }
      `}} />
    </div>
  );
}
