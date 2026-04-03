import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, 
  Utensils, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Trophy, 
  User, 
  ChevronRight,
  Sparkles,
  MessageSquare,
  Heart
} from 'lucide-react';

// --- Data ---
const DIALOGUE = [
  { 
    speaker: 'Camarero', 
    text: '¡Buenas tardes! Bienvenidos al restaurante. ¿Qué desean tomar?', 
    armenian: 'Բարի օր: Բարի գալուստ ռեստորան: Ի՞նչ կցանկանաք խմել:',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'Gor', 
    text: 'Queremos dos tés armenios, por favor.', 
    armenian: 'Մենք երկու հայկական թեյ ենք ուզում, խնդրում եմ:',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'Gayane', 
    text: '¿Tienen azúcar?', 
    armenian: 'Շաքարավազ ունե՞ք:',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'Camarero', 
    text: 'Sí, por supuesto. ¿Algo más?', 
    armenian: 'Այո, իհարկե: Էլի ինչ-որ բա՞ն:',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'Gor', 
    text: 'No, gracias. Solo el té.', 
    armenian: 'Ոչ, շնորհակալություն: Միայն թեյը:',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'Camarero', 
    text: 'Muy bien. Aquí tienen el azúcar y el té. ¡Que lo disfruten!', 
    armenian: 'Շատ բարի: Ահա շաքարավազը և թեյը: Վայելե՛ք:',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=600&h=600'
  },
];

const QUIZ = [
  { question: "Ի՞նչ են ուզում խմել Գոռը և Գայանեն:", options: ["Café", "Té armenio", "Agua"], correct: "Té armenio", translation: "Gor y Gayane quieren té armenio." },
  { question: "Գայանեն հարցնում է, թե արդյոք ունեն ___:", options: ["leche", "azúcar", "limón"], correct: "azúcar", translation: "Gayane pregunta si tienen azúcar." },
  { question: "Քանի՞ թեյ են պատվիրում:", options: ["Uno", "Dos", "Tres"], correct: "Dos", translation: "Piden dos tés." },
  { question: "Ի՞նչ է ասում մատուցողը վերջում:", options: ["¡Hola!", "¡Que lo disfruten!", "¡Adiós!"], correct: "¡Que lo disfruten!", translation: "El camarero dice: ¡Que lo disfruten!" },
  { question: "Ո՞վ է մոտենում սեղանին:", options: ["El gerente", "El camarero", "El guía"], correct: "El camarero", translation: "El camarero se acerca a la mesa." },
];

export default function RestaurantGame() {
  const [view, setView] = useState<'intro' | 'dialogue' | 'quiz' | 'finish'>('intro');
  const [step, setStep] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const nextStep = () => {
    if (step < DIALOGUE.length - 1) {
      setStep(step + 1);
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
    <div className="min-h-screen bg-orange-50 text-orange-950 font-sans flex flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center bg-white p-12 rounded-[3rem] shadow-2xl border-8 border-orange-500 max-w-2xl relative overflow-hidden"
          >
            <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-orange-300 shadow-lg">
              <Utensils className="w-12 h-12 text-orange-600" />
            </div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 text-orange-900 leading-tight">
              Ռեստորանային <br /> <span className="text-orange-600">Երկխոսություն</span>
            </h1>
            <p className="text-xl text-orange-800/70 mb-12 font-medium">
              Սովորիր պատվիրել ռեստորանում իսպաներենով: <br />
              Գոռը և Գայանեն պատրաստվում են թեյ խմել:
            </p>
            <button 
              onClick={() => setView('dialogue')}
              className="px-16 py-6 bg-orange-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-orange-700 transition-all shadow-2xl active:scale-95"
            >
              Սկսել Խաղը
            </button>
          </motion.div>
        )}

        {view === 'dialogue' && (
          <motion.div 
            key="dialogue"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-5xl bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-orange-100 flex flex-col md:flex-row min-h-[600px]"
          >
            <div className="w-full md:w-1/2 relative overflow-hidden bg-orange-100">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={step}
                  src={DIALOGUE[step].image}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-orange-600 text-white px-8 py-2 rounded-full font-black uppercase tracking-widest text-xl shadow-xl"
                >
                  {DIALOGUE[step].speaker}
                </motion.div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center relative">
              <div className="absolute top-12 right-12 text-orange-100 font-black text-4xl italic">
                {String(step + 1).padStart(2, '0')}
              </div>
              
              <div className="space-y-8">
                <motion.p 
                  key={`text-${step}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-black italic leading-tight text-orange-900"
                >
                  "{DIALOGUE[step].text}"
                </motion.p>
                
                <motion.div 
                  key={`arm-${step}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 bg-orange-50 rounded-3xl border border-orange-100"
                >
                  <p className="text-xl font-medium text-orange-800 leading-relaxed">
                    {DIALOGUE[step].armenian}
                  </p>
                </motion.div>
              </div>

              <div className="mt-12">
                <button 
                  onClick={nextStep}
                  className="group flex items-center gap-4 px-12 py-5 bg-orange-600 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl active:scale-95"
                >
                  {step === DIALOGUE.length - 1 ? 'Անցնել վարժությանը' : 'Հաջորդը'}
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl bg-white rounded-[4rem] p-16 shadow-2xl border border-orange-100 text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-orange-400 uppercase tracking-[0.3em] text-sm">Վարժություն {quizStep + 1} / {QUIZ.length}</span>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-black italic mb-6 text-orange-900 leading-tight">
                {QUIZ[quizStep].question}
              </h2>
              <p className="text-xl text-orange-400 font-medium italic">{QUIZ[quizStep].translation}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {QUIZ[quizStep].options.map((option) => (
                <button 
                  key={option}
                  onClick={() => handleQuiz(option)}
                  disabled={!!feedback}
                  className={`py-6 rounded-[2rem] font-black text-2xl transition-all border-b-8 active:border-b-0 active:translate-y-2 ${feedback === 'correct' && option === QUIZ[quizStep].correct ? 'bg-emerald-500 border-emerald-700 text-white' : feedback === 'wrong' && option !== QUIZ[quizStep].correct ? 'bg-orange-50 border-orange-100 text-orange-200 opacity-50' : feedback === 'wrong' && option === QUIZ[quizStep].correct ? 'bg-red-500 border-red-700 text-white' : 'bg-orange-600 border-orange-800 text-white hover:bg-orange-700'}`}
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
            className="text-center bg-white p-20 rounded-[5rem] shadow-2xl border border-orange-100 max-w-2xl relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-7xl font-black italic uppercase mb-4 text-orange-900">Ապրե՜ս:</h2>
            <p className="text-2xl text-orange-800/70 mb-12 font-medium">
              Դու հաջողությամբ ավարտեցիր ռեստորանային երկխոսությունը: <br />
              Քո միավորները՝ <span className="text-orange-600 font-black">{score} / {QUIZ.length}</span>
            </p>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  setView('intro');
                  setStep(0);
                  setQuizStep(0);
                  setScore(0);
                }}
                className="px-16 py-6 bg-orange-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-orange-700 transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto w-full"
              >
                <RefreshCw className="w-6 h-6" />
                Նորից սկսել
              </button>
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-orange-300 font-black text-xs uppercase tracking-widest">
                  <Coffee className="w-4 h-4" />
                  <span>Հայկական թեյ</span>
                </div>
                <div className="w-1 h-1 bg-orange-100 rounded-full" />
                <div className="flex items-center gap-2 text-orange-300 font-black text-xs uppercase tracking-widest">
                  <Heart className="w-4 h-4" />
                  <span>Մադրիդ</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #fffaf5; }
      `}} />
    </div>
  );
}
