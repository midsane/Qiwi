import React from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

export const FuturisticLoader = () => {
    return (
        createPortal(<div className="flex flex-col  fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] items-center justify-center h-screen">
            <motion.div
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <span className="text-white font-bold text-lg">AI</span>
            </motion.div>

            <motion.div
                className="relative w-4 h-4 bg-green-400 rounded-full mt-4"
                animate={{
                    rotate: 360,
                    x: [0, 50, 0, -50, 0],
                    y: [50, 0, -50, 0, 50],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <motion.p
                className="mt-8 text-blue-300 text-xl font-semibold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                Processing...
            </motion.p>
        </div>, document.getElementById('root'))
    );
};
