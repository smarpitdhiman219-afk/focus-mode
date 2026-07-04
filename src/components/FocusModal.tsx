import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, Square, Brain, Volume2, VolumeX } from "lucide-react";

const FOCUS_DURATION = 25 * 60; // 25 minutes in seconds

interface FocusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FocusModal({ isOpen, onClose }: FocusModalProps) {
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION);
  const [isPaused, setIsPaused] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const progress = ((FOCUS_DURATION - timeLeft) / FOCUS_DURATION) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    if (isOpen && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen, isPaused]);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(FOCUS_DURATION);
      setIsPaused(false);
    }
  }, [isOpen]);

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  const handleEndSession = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    onClose();
  };

  // SVG circle calculations
  const radius = 120;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with heavy blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-40 bg-black/70 backdrop-blur-md"
          />

          {/* Floating Glassmorphic Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 flex items-center justify-center px-6"
          >
            <div
              className="w-full max-w-[340px] rounded-[32px] p-6 relative"
              style={{
                background: "rgba(24, 24, 27, 0.75)",
                backdropFilter: "blur(48px)",
                WebkitBackdropFilter: "blur(48px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow:
                  "0 25px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 0 100px rgba(99, 102, 241, 0.08)",
              }}
            >
              {/* Ambient glow behind modal */}
              <div
                className="absolute -inset-20 rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="flex items-center gap-2 mb-8"
                >
                  <div className="w-7 h-7 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <Brain className="w-3.5 h-3.5 text-violet-400" />
                  </div>
                  <span className="text-zinc-300 text-xs font-semibold uppercase tracking-[0.15em]">
                    Deep Work Session
                  </span>
                  <button
                    onClick={() => setIsSoundOn(!isSoundOn)}
                    className="ml-2 p-1.5 rounded-full hover:bg-white/5 transition-colors"
                  >
                    {isSoundOn ? (
                      <Volume2 className="w-3.5 h-3.5 text-zinc-500" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                    )}
                  </button>
                </motion.div>

                {/* Circular Progress Timer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                  className="relative mb-6"
                >
                  {/* Outer breathing ring */}
                  <div
                    className="absolute inset-0 rounded-full animate-breathe"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
                      transform: "scale(1.4)",
                    }}
                  />

                  <svg
                    width="260"
                    height="260"
                    viewBox="0 0 260 260"
                    className="relative z-10"
                  >
                    {/* Track */}
                    <circle
                      cx="130"
                      cy="130"
                      r={normalizedRadius}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth={strokeWidth}
                    />

                    {/* Animated glow filter */}
                    <defs>
                      <linearGradient
                        id="progressGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur
                          stdDeviation="3"
                          result="coloredBlur"
                        />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Progress circle */}
                    <circle
                      cx="130"
                      cy="130"
                      r={normalizedRadius}
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeDasharray={`${circumference} ${circumference}`}
                      strokeDashoffset={strokeDashoffset}
                      filter="url(#glow)"
                      className="progress-ring-circle"
                    />

                    {/* Timer Text */}
                    <text
                      x="130"
                      y="125"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-zinc-100"
                      style={{
                        fontSize: "52px",
                        fontWeight: 700,
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
                    </text>

                    {/* Label below timer */}
                    <text
                      x="130"
                      y="158"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-zinc-500"
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {isPaused ? "PAUSED" : timeLeft === 0 ? "COMPLETED" : "REMAINING"}
                    </text>
                  </svg>
                </motion.div>

                {/* Current Task */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="text-center mb-8"
                >
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">
                    Current Focus
                  </p>
                  <p className="text-zinc-200 text-base font-medium">
                    Designing UI Mockups
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex gap-3 w-full"
                >
                  {/* Pause/Resume Button */}
                  <button
                    onClick={handlePauseResume}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 font-medium text-sm transition-all active:scale-95 border border-zinc-700/50"
                  >
                    {isPaused ? (
                      <>
                        <Play className="w-4 h-4" />
                        Resume
                      </>
                    ) : (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause
                      </>
                    )}
                  </button>

                  {/* End Session Button */}
                  <button
                    onClick={handleEndSession}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-medium text-sm transition-all active:scale-95"
                    style={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 20px rgba(99, 102, 241, 0.35)",
                    }}
                  >
                    <Square className="w-4 h-4" />
                    End Session
                  </button>
                </motion.div>

                {/* Motivational micro-copy */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="text-zinc-600 text-[11px] mt-5 text-center leading-relaxed"
                >
                  {isPaused
                    ? "Take a breath. Resume when ready."
                    : timeLeft === 0
                    ? "Great work! You've completed your session."
                    : "Stay focused. Distractions can wait."}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
