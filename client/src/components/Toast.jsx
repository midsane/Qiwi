import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ToastBar = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="fixed bottom-8 right-8 bg-blue-500 
                bg-opacity-75 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-4"
            >
                <span>{message}</span>
                <motion.div
                    className="h-1 bg-white absolute bottom-0 left-0 rounded-full"
                    initial={{ width: "100%" }}
                    animate={{ width: 0 }}
                    transition={{ duration: 3, ease: "linear" }}
                    style={{ position: "absolute", bottom: 0, left: 0, height: "4px" }}
                ></motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
