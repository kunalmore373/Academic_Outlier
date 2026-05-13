import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../utils/ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative flex h-10 w-20 items-center rounded-full bg-slate-200 p-1 transition-colors duration-500 focus:outline-none dark:bg-slate-800 shadow-inner overflow-hidden"
            aria-label="Toggle Theme"
        >
            {/* Background Glow */}
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r from-amber-200 to-amber-300 dark:from-indigo-600 dark:to-blue-800"
                initial={false}
                animate={{
                    opacity: isDarkMode ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
            />

            {/* Slider/Circle */}
            <motion.div
                className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg"
                layout
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
                animate={{
                    x: isDarkMode ? 40 : 0,
                    rotate: isDarkMode ? 360 : 0
                }}
            >
                <AnimatePresence mode="wait">
                    {isDarkMode ? (
                        <motion.span
                            key="moon"
                            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            className="material-symbols-outlined text-indigo-600 text-xl"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            dark_mode
                        </motion.span>
                    ) : (
                        <motion.span
                            key="sun"
                            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            className="material-symbols-outlined text-amber-500 text-xl"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            light_mode
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Subtle Stars/Dots for Dark Mode */}
            {isDarkMode && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute right-4 top-2 h-0.5 w-0.5 rounded-full bg-white" />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute right-6 top-5 h-1 w-1 rounded-full bg-white" />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute right-3 top-7 h-0.5 w-0.5 rounded-full bg-white" />
                </>
            )}
            
            {/* Subtle Clouds for Light Mode */}
            {!isDarkMode && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute right-6 top-3 h-2 w-4 rounded-full bg-white/40" />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute right-3 top-6 h-1.5 w-3 rounded-full bg-white/40" />
                </>
            )}
        </button>
    );
};

export default ThemeToggle;
