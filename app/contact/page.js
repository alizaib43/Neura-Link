'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, User, CheckCircle2 } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import emailjs from '@emailjs/browser';
 
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        'service_37v9qrc',
        'template_ae52fby',
        {
          name: data.name,
          email: data.email,
          message: data.message,
          time: new Date().toLocaleString(),
        },
        'KM-Z4Q60TnH2q0r2M'
      );
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="grow flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* Contact Info */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-purple-200 to-slate-400 mb-6">
            Get in Touch
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Have questions about our enterprise plans or need support? We're here to help you scale.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-slate-300">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Email Us</h3>
                <p className="text-sm text-slate-500">ali.maga550@gmail.com</p>
              </div>
            </div>
            
             
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="relative overflow-hidden">
             {isSubmitted ? (
               <div className="h-80 flex flex-col items-center justify-center text-center">
                 <motion.div
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                 >
                   <CheckCircle2 className="w-10 h-10 text-green-400" />
                 </motion.div>
                 <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                 <p className="text-slate-400">We'll get back to you as soon as possible.</p>
               </div>
             ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input 
                        {...register("name")}
                        placeholder="John Doe"
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                   <div>
                    <label className="block text-slate-400 text-sm mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input 
                        {...register("email")}
                        placeholder="john@example.com"
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Message</label>
                    <textarea 
                      {...register("message")}
                      rows={4}
                      placeholder="How can we help you?"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-purple-500/25 flex items-center justify-center space-x-2 transition-all"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
             )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
