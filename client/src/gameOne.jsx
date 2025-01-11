import React, { useState } from "react";
import { X, Eye, Ear, Hand } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GameOne() {
  const [answered, setAnswered] = useState(false);
  const [points, setPoints] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const questions = [
    { text: "Name 3 things you see", icon: <Eye className="w-6 h-6" /> },
    { text: "Identify 3 sounds you hear", icon: <Ear className="w-6 h-6" /> },
    { text: "Move 3 parts of your body", icon: <Hand className="w-6 h-6" /> },
  ];

  const handleDone = () => {
    setShowDialog(true);
    setAnswered(true);
    setPoints(30);
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-700 flex flex-col px-4 py-8 relative">
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-8 px-2">
        <button 
          onClick={handleBack}
          className="hover:bg-white/10 p-2 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white/80" />
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        3-3-3 Rule
      </h1>

      {/* Questions */}
      <div className="space-y-4 mb-auto">
        {questions.map((question, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center space-x-4 text-white transition-transform hover:transform hover:scale-102 active:scale-98"
          >
            <div className="flex-shrink-0">{question.icon}</div>
            <span className="text-lg font-medium">{question.text}</span>
          </div>
        ))}
      </div>

      {/* Done Button */}
      <button
        onClick={handleDone}
        className="mt-8 w-full bg-white rounded-full py-4 text-purple-700 font-semibold text-lg hover:bg-white/90 transition-colors"
      >
        Done
      </button>

      {/* Success Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md transform transition-all animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Great job!
              </h2>
              <p className="text-gray-600">
                You've completed the 3-3-3 exercise
              </p>
              <div className="bg-purple-50 rounded-2xl p-4 mt-6">
                <p className="text-purple-700 font-semibold">
                  You earned {points} experience points
                </p>
              </div>
              <button
                onClick={() => setShowDialog(false)}
                className="mt-6 w-full bg-purple-600 text-white rounded-full py-3 font-semibold hover:bg-purple-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}