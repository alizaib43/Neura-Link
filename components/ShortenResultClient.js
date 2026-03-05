'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink, Share2, QrCode as QrCodeIcon } from 'lucide-react';
import confetti from 'canvas-confetti'; 
import {QRCodeSVG} from 'qrcode.react';
import GlassCard from '@/components/GlassCard';

export default function ShortenResultClient({ id }) {
  const [copied, setCopied] = useState(false);
  
  // Construct the full short URL
  const shortUrl = `https://tinyurl.com/${id}`;

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-green-400" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2">Link Ready!</h1>
        <p className="text-slate-400 mb-8">Your link has been successfully shortened and is ready to share.</p>

        <div className="bg-slate-900/50 rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10">
          <span className="text-purple-300 font-medium text-lg truncate w-full md:w-auto text-left">
            {shortUrl}
          </span>
          
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <a 
              href={shortUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit</span>
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="bg-white p-4 rounded-xl flex items-center justify-center h-full">
             <QRCodeSVG value={shortUrl} size={150} />
          </div>
          
          <div className="flex flex-col justify-center space-y-4">
             <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Share2 className="w-5 h-5 text-purple-400" />
                  <h3 className="text-white font-medium">Share Socially</h3>
                </div>
                <p className="text-xs text-slate-500">Share this link directly on your favorite platforms.</p>
             </div>
             
             <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 text-left">
                <div className="flex items-center gap-2 mb-2">
                   <QrCodeIcon className="w-5 h-5 text-blue-400" />
                   <h3 className="text-white font-medium">QR Code</h3>
                </div>
                <p className="text-xs text-slate-500">Download high-res QR for print materials.</p>
             </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
