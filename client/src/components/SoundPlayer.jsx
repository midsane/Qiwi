import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Pause, Play, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Modal } from './modal';
const sounds = [
  { name: 'Rain', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { name: 'Ocean', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { name: 'Forest', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { name: 'Thunderstorm', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
];
export default function SoundPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSound, setSelectedSound] = useState(sounds[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const handleSoundChange = (sound) => {
    setSelectedSound(sound);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = sound.src;
      audioRef.current.play();
    }
  };
  return (
    createPortal(<>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-amber-500  text-white p-1 sm:p-4 rounded-full shadow-lg hover:bg-amber-300 border z-50 border-orange-400 transition-colors"
      >
        <Volume2 size={20} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <Modal color={false} handleClose={() => setIsOpen(false)} >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 rounded-lg bg-black bg-opacity-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
              >
                <div className="flex justify-between  items-center mb-4">
                  <h2 className="text-2xl font-semibold text-orange-900">Soothing Sounds</h2>
                  <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                  </button>
                </div>
                <div className="space-y-4">
                  {sounds.map((sound) => (
                    <button
                      key={sound.name}
                      onClick={() => handleSoundChange(sound)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${selectedSound.name === sound.name
                        ? 'bg-indigo-100 text-orange-900'
                        : 'bg-gray-100 text-orange-600 hover:bg-gray-200'
                        }`}
                    >
                      {sound.name}
                    </button>
                  ))}
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={togglePlay}
                      className="bg-orange-900 text-white p-3 rounded-full hover:bg-orange-500 transition-colors"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="slider w-2/3 h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                    />

                  </div>
                  <p className="text-center text-orange-900">
                    Now Playing: {selectedSound.name}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
      <audio ref={audioRef} src={selectedSound.src} loop />
    </>, document.getElementById('root'))
  );
}



<style jsx>{`
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #ff6600; /* Custom color for the thumb */
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #ff6600;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .slider::-ms-thumb {
    width: 16px;
    height: 16px;
    background: #ff6600;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`}</style>
