import { useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import BackgroundDashboard from "./components/BackgroundDashboard";
import FocusModal from "./components/FocusModal";

export default function App() {
  const [isFocusOpen, setIsFocusOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-neutral-900 flex items-center justify-center p-4 md:p-8">
      {/* Device Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-zinc-950 rounded-[48px] overflow-hidden shadow-2xl border-[8px] border-zinc-800">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-7 pt-4 pb-2">
          <span className="text-zinc-100 text-sm font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-zinc-100" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l11 11c.39.39 1.02.39 1.41 0l11-11c.18-.18.29-.43.29-.71 0-.28-.11.53-.29.71C20.66 4.78 16.54 3 12 3z" />
            </svg>
            <svg className="w-4 h-4 text-zinc-100" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
            </svg>
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-40 w-[160px] h-[34px] bg-zinc-950 rounded-b-[20px]" />

        {/* Background Dashboard */}
        <div className="h-full pt-12">
          <BackgroundDashboard />
        </div>

        {/* Floating Focus Button (visible when modal is closed) */}
        {!isFocusOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFocusOpen(true)}
            className="absolute bottom-24 right-5 z-30 w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              boxShadow: "0 8px 32px rgba(99, 102, 241, 0.4)",
            }}
          >
            <Brain className="w-6 h-6 text-white" />
          </motion.button>
        )}

        {/* Focus Modal Overlay */}
        <FocusModal isOpen={isFocusOpen} onClose={() => setIsFocusOpen(false)} />

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 w-[134px] h-[5px] bg-zinc-700 rounded-full" />
      </div>

      {/* Desktop hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-zinc-600 text-xs hidden md:block">
        Mobile preview — open in responsive mode for best experience
      </div>
    </div>
  );
}
