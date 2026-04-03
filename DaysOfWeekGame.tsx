import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Trophy, 
  Sparkles,
  Sun,
  Moon,
  Coffee,
  ShoppingBag,
  Music,
  Heart,
  Star
} from 'lucide-react';

// --- Data ---
const DAYS = [
  { spanish: 'Lunes', armenian: 'Երկուշաբթի', icon: <Moon className="w-8 h-8" />, color: 'bg-blue-500', description: 'Շաբաթվա սկիզբը' },
  { spanish: 'Martes', armenian: 'Երեքշաբթի', icon: <Star className="w-8 h-8" />, color: 'bg-indigo-500', description: 'Աշխատանքային եռանդ' },
  { spanish: 'Miércoles', armenian: 'Չորեքշաբթի', icon: <Coffee className="w-8 h-8" />, color: 'bg-purple-500', description: 'Շաբաթվա մեջտեղը' },
  { spanish: 'Jueves', armenian: 'Հինգշաբթի', icon: <ShoppingBag className="w-8 h-8" />, color: 'bg-pink-500', description: 'Հանգստի սպասում' },
  { spanish: 'Viernes', armenian: 'Ուրբաթ', icon: <Music className="w-8 h-8" />, color: 'bg-rose-500', description: 'Ուրախ օր' },
  { spanish: 'Sábado', armenian: 'Շաբաթ', icon: <Heart className="w-8 h-8" />, color: 'bg-orange-500', description: 'Հանգստյան օր' },
  { spanish: 'Domingo', armenian: 'Կիրակի', icon: <Sun className="w-8 h-8" />, color: 'bg-yellow-500', description: 'Ընտանեկան օր' },
];

const QUIZ = [
  { question: "Ինչպե՞ս կլինի «Երկուշաբթի» իսպաներեն:", options: ["Lunes", "Martes", "Viernes"], correct: "Lunes" },
  { question: "Ո՞ր օրն է «Sábado»-ն:", options: ["Ուրբաթ", "Շաբաթ", "Կիրակի"], correct: "Շաբաթ" },
  { question: "Ո՞ր օրն է գալիս «Lunes»-ից հետո:", options: ["Miércoles", "Martes", "Jueves"], correct: "Martes" },
  { question: "«Domingo»-ն շաբաթվա ո՞ր օրն է:", options: ["Առաջին", "Վերջին", "Մեջտեղի"], correct: "Վերջին" },
  { question: "Ինչպե՞ս կլինի «Ուրբաթ» իսպաներեն:", options: ["Jueves", "Viernes", "Sábado"], correct: "Viernes" },
];

export default function DaysOfWeekGame() {
  const [view, setView] = useState<'intro' | 'learn' | 'quiz' | 'finish'>('intro');
  const [learnStep, setLearnStep] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const nextLearn = () => {
    if (learnStep < DAYS.length - 1) {
      setLearnStep(learnStep + 1);
    } else {
      setView('quiz');
    }
  };

  const handleQuiz = (option: string) => {
    if (feedback) return;
    if (option === QUIZ[quizStep].correct) {
      setFeedback('correct');
      setScore(score + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (quizStep < QUIZ.length - 1) {
        setQuizStep(quizStep + 1);
      } else {
        setView('finish');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center bg-white p-12 rounded-[3rem] shadow-2xl border-8 border-blue-500 max-w-2xl relative overflow-hidden"
          >
            <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-blue-300 shadow-lg">
              <Calendar className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 text-slate-900 leading-tight">
              Շաբաթվա <br /> <span className="text-blue-600">Օրերը</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 font-medium">
              Սովորիր շաբաթվա օրերը իսպաներենով: <br />
              Días de la semana
            </p>
            <button 
              onClick={() => setView('learn')}
              className="px-16 py-6 bg-blue-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl active:scale-95"
            >
              Սկսել Խաղը
            </button>
          </motion.div>
        )}

        {view === 'learn' && (
          <motion.div 
            key="learn"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-4xl bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100 flex flex-col min-h-[500px]"
          >
            <div className={`h-48 ${DAYS[learnStep].color} flex items-center justify-center text-white relative overflow-hidden`}>
              <motion.div 
                key={`icon-${learnStep}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1.5, rotate: 0 }}
                className="z-10"
              >
                {DAYS[learnStep].icon}
              </motion.div>
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            <div className="p-12 flex flex-col items-center justify-center text-center flex-1">
              <div className="mb-8">
                <motion.h2 
                  key={`spa-${learnStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-7xl font-black italic text-slate-900 mb-2"
                >
                  {DAYS[learnStep].spanish}
                </motion.h2>
                <motion.p 
                  key={`arm-${learnStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-blue-600 uppercase tracking-widest"
                >
                  {DAYS[learnStep].armenian}
                </motion.p>
              </div>

              <p className="text-xl text-slate-400 italic mb-12">
                {DAYS[learnStep].description}
              </p>

              <button 
                onClick={nextLearn}
                className="group flex items-center gap-4 px-12 py-5 bg-slate-900 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
              >
                {learnStep === DAYS.length - 1 ? 'Անցնել վարժությանը' : 'Հաջորդը'}
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="flex h-2 bg-slate-100">
              {DAYS.map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 transition-all duration-500 ${i <= learnStep ? DAYS[i].color : 'bg-transparent'}`} 
                />
              ))}
            </div>
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl bg-white rounded-[4rem] p-16 shadow-2xl border border-slate-100 text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-slate-400 uppercase tracking-[0.3em] text-sm">Վարժություն {quizStep + 1} / {QUIZ.length}</span>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-black italic mb-6 text-slate-900 leading-tight">
                {QUIZ[quizStep].question}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {QUIZ[quizStep].options.map((option) => (
                <button 
                  key={option}
                  onClick={() => handleQuiz(option)}
                  disabled={!!feedback}
                  className={`py-6 rounded-[2rem] font-black text-2xl transition-all border-b-8 active:border-b-0 active:translate-y-2 ${feedback === 'correct' && option === QUIZ[quizStep].correct ? 'bg-emerald-500 border-emerald-700 text-white' : feedback === 'wrong' && option !== QUIZ[quizStep].correct ? 'bg-slate-50 border-slate-100 text-slate-200 opacity-50' : feedback === 'wrong' && option === QUIZ[quizStep].correct ? 'bg-red-500 border-red-700 text-white' : 'bg-blue-600 border-blue-800 text-white hover:bg-blue-700'}`}
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
                  className={`mt-12 flex items-center justify-center gap-3 font-black uppercase tracking-widest text-2xl ${feedback === 'correct' ? 'text-emerald-600' : 'text-red-600'}`}
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
            className="text-center bg-white p-20 rounded-[5rem] shadow-2xl border border-slate-100 max-w-2xl relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-7xl font-black italic uppercase mb-4 text-slate-900">Ապրե՜ս:</h2>
            <p className="text-2xl text-slate-600 mb-12 font-medium">
              Դու հաջողությամբ սովորեցիր շաբաթվա օրերը: <br />
              Քո միավորները՝ <span className="text-blue-600 font-black">{score} / {QUIZ.length}</span>
            </p>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  setView('intro');
                  setLearnStep(0);
                  setQuizStep(0);
                  setScore(0);
                }}
                className="px-16 py-6 bg-blue-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto w-full"
              >
                <RefreshCw className="w-6 h-6" />
                Նորից սկսել
              </button>
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-slate-300 font-black text-xs uppercase tracking-widest">
                  <Calendar className="w-4 h-4" />
                  <span>Días de la semana</span>
                </div>
                <div className="w-1 h-1 bg-slate-100 rounded-full" />
                <div className="flex items-center gap-2 text-slate-300 font-black text-xs uppercase tracking-widest">
                  <Heart className="w-4 h-4" />
                  <span>Իսպաներեն</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #f8fafc; }
      `}} />
    </div>
  );
}
