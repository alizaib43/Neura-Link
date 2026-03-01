'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link as LinkIcon, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto glass-card rounded-2xl px-6 py-3 flex items-center justify-between border border-white/10 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-purple-500 blur-xl opacity-40 group-hover:opacity-100 transition-opacity" />
            <LinkIcon className="w-8 h-8 text-white relative z-10" />
          </motion.div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-white to-purple-400">
            NebulaLink
          </span>
        </Link>
 
         {/* Desktop Nav */}
         <div className="hidden md:flex items-center space-x-8">
           {navItems.map((item) => (
             <Link
               key={item.path}
               href={item.path}
               className={cn(
                 "relative text-sm font-medium transition-all duration-300",
                 pathname === item.path 
                  ? "text-white" 
                  : "text-slate-400 hover:text-purple-300 hover:scale-105"
               )}
             >
               {item.name}
               {pathname === item.path && (
                 <motion.div
                   layoutId="navbar-indicator"
                   className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                 />
               )}
             </Link>
           ))}
         </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-6 right-6 glass-card rounded-2xl p-4 md:hidden flex flex-col space-y-4"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-medium p-2 rounded-lg transition-colors",
                pathname === item.path 
                  ? "bg-white/10 text-white" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
