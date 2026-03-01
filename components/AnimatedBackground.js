'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
      
      {/* Primary Nebula Orbs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 50, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-purple-600/20 rounded-full blur-[100px]"
      />
      
      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 60, -100, 0],
          scale: [1, 1.2, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-indigo-600/15 rounded-full blur-[120px]"
      />

      {/* Secondary Accent Orbs */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [50, -150, 50],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[80px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-800/10 rounded-full blur-[150px]"
      />

      <motion.div
        animate={{
          x: [50, -50, 50],
          y: [-50, 100, -50],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-3/4 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-[70px]"
      />
      
      <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]" />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
