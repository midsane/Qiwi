import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const breathingPatterns = [
  { name: "1 Minute", duration: 60, inhale: 4, hold: 2, exhale: 4 },
  { name: "3 Minutes", duration: 180, inhale: 4, hold: 2, exhale: 8 },
  { name: "5 Minutes", duration: 300, inhale: 5, hold: 2, exhale: 5 },
];

export function BreathingExercise() {
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate()

  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        updatePhase();
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      completeExercise();
    }
    return () => clearTimeout(timerRef.current);
  }, [isActive, timeLeft]);

  const updatePhase = () => {
    const { inhale, hold, exhale } = selectedPattern;
    const totalCycleTime = inhale + hold + exhale;
    const currentCycleTime = timeLeft % totalCycleTime;

    if (currentCycleTime >= exhale + hold) {
      setCurrentPhase('Inhale');
    } else if (currentCycleTime >= exhale) {
      setCurrentPhase('Hold');
    } else {
      setCurrentPhase('Exhale');
    }
  };

  const startExercise = (pattern) => {
    setSelectedPattern(pattern);
    setTimeLeft(pattern.duration);
    setIsActive(true);
    setCurrentPhase('Inhale');
  };

  const completeExercise = () => {
    setIsActive(false);
    setShowResults(true);
    setPoints(calculatePoints());
  };

  const calculatePoints = () => {

    return selectedPattern.duration - timeLeft;
  };

  const resetExercise = () => {
    setSelectedPattern(null);
    setTimeLeft(0);
    setIsActive(false);
    setShowResults(false);
    setPoints(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-[90vh] rounded bg-blue-400 flex flex-col px-4 py-8 text-white">
      <header className="flex justify-between items-center ">
        {selectedPattern ? <button onClick={resetExercise} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft /> </button> :
          <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /> </button>}

        <h1 className="text-2xl font-bold">Breathing Exercise</h1>
        <div className="w-8" />
      </header>

      <AnimatePresence mode="wait">
        {!selectedPattern && !showResults && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex-grow flex flex-col justify-center space-y-4"
          >
            {breathingPatterns.map((pattern) => (
              <button
                key={pattern.name}
                onClick={() => startExercise(pattern)}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-left hover:bg-white/30 transition-colors"
              >
                <h2 className="text-xl font-semibold mb-2">{pattern.name}</h2>
                <p>Inhale: {pattern.inhale}s, Hold: {pattern.hold}s, Exhale: {pattern.exhale}s</p>
              </button>
            ))}
          </motion.div>
        )}

        {selectedPattern && isActive && (
          <motion.div
            key="exercise"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-grow flex flex-col justify-center items-center text-center"
          >
            <div className="text-6xl font-bold mb-8">{formatTime(timeLeft)}</div>
            <motion.div
              animate={{
                scale: currentPhase === 'Inhale' ? 1.2 : currentPhase === 'Hold' ? 1.2 : 1,
                opacity: currentPhase === 'Hold' ? 0.7 : 1,
              }}
              transition={{ duration: 2 }}
              className="w-48 h-48 rounded-full bg-white/30 flex items-center justify-center mb-8"
            >
              <span className="text-2xl font-semibold">{currentPhase}</span>
            </motion.div>
            <p className="text-xl">{selectedPattern.name} Breathing</p>
          </motion.div>
        )}

        {showResults && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow flex flex-col justify-center items-center text-center"
          >
            <div className="bg-white rounded-3xl p-8 text-purple-700">
              <h2 className="text-2xl font-bold mb-4">Great job!</h2>
              <p className="text-xl mb-6">You've completed the {selectedPattern.name} exercise</p>
              <div className="bg-purple-100 rounded-2xl p-4 mb-6">
                <p className="font-semibold">You earned {points} points</p>
              </div>
              <button
                onClick={resetExercise}
                className="w-full bg-purple-600 text-white rounded-full py-3 font-semibold hover:bg-purple-700 transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}