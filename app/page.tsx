"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Link as LinkIcon,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { shortenLink } from "@/lib/actions";
import { QRCodeSVG } from "qrcode.react";

const schema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [shortenedSlug, setShortenedSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const slug = await shortenLink(data.url);
      setShortenedSlug(slug);
    } catch (error) {
      console.error("Error shortening link:", error);
      alert("Failed to shorten link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fullShortUrl = shortenedSlug
    ? `${window.location.protocol}//${window.location.host}/${shortenedSlug}`
    : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setShortenedSlug(null);
    reset();
  };

  return (
    <>
      <div className="flex-grow flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-xs sm:text-sm font-medium">
                Inbuilt NebulaLink Engine
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-purple-200 to-slate-400 mb-6 leading-tight">
              Shorten links, <br className="hidden sm:block" /> Expand reach.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-md mx-auto md:mx-0">
              Transform long, ugly links into clean, trackable short URLs.
              Elevate your digital presence with our lightning-fast inbuilt
              engine.
            </p>
          </motion.div>

          {/* Shortener Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto md:max-w-none"
          >
            <AnimatePresence mode="wait">
              {!shortenedSlug ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                >
                  <GlassCard className="relative overflow-hidden group p-6 sm:p-8">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/30" />

                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                      Start Shortening
                    </h2>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-slate-400 text-xs sm:text-sm mb-2">
                          Destination URL
                        </label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                          <input
                            {...register("url")}
                            placeholder="https://long-url.com/..."
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white text-sm sm:text-base placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                          />
                        </div>
                        {errors.url && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.url.message}
                          </p>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-purple-500/25 flex items-center justify-center space-x-2 transition-all text-sm sm:text-base"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Shorten Now</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-[10px] sm:text-xs text-slate-500 text-center">
                        NebulaLink Engine v2.0 • Data stored securely
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                >
                  <GlassCard className="relative overflow-hidden border-purple-500/50 p-6 sm:p-8">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -mr-16 -mt-16" />

                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl sm:text-2xl font-semibold text-white">
                        Ready!
                      </h2>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-slate-900/80 rounded-xl p-3 border border-white/10 flex items-center justify-between group">
                        <span className="text-purple-300 font-medium truncate mr-2 text-xs sm:text-sm">
                          {fullShortUrl}
                        </span>
                        <div className="flex gap-1.5 sm:gap-2 shrink-0">
                          <button
                            onClick={handleCopy}
                            title="Copy Link"
                            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-slate-300 hover:text-white"
                          >
                            {copied ? (
                              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            )}
                          </button>
                          <a
                            href={fullShortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-purple-600/20 hover:bg-purple-600/40 rounded-lg transition-colors text-purple-400"
                          >
                            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </a>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 items-center">
                        <div className="bg-white p-2 rounded-lg shrink-0 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                          <QRCodeSVG
                            value={fullShortUrl}
                            size={100}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                          <button
                            onClick={handleReset}
                            className="flex items-center justify-center space-x-2 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-all text-xs sm:text-sm"
                          >
                            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>Shorten Another</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest">
                      <span>Instant Redirection</span>
                      <span>No Latency</span>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}
