"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminClubsView } from "./_component/AdminClubView";

export default function Dashboard() {
  const [activeView, setActiveView] = useState<string>("Join Club");

  return (
    <div className="max-h-[1440px] mx-auto bg-[#050c1f] selection:bg-primary selection:text-white">
      {/* Background хэсэг хэвээрээ... */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(90,160,255,0.15),transparent_45%)]" />
      </div>

      <div className="pl-64 relative z-10 flex flex-col min-h-screen">
        <main className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="w-full h-full"
            >
              <AdminClubsView />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
