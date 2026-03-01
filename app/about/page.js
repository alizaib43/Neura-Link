'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { Users, Target, Zap, Globe } from 'lucide-react';

const team = [
  { name: 'Antigravity', role: 'AI Assistant', color: 'bg-blue-500', img:'OIP.webp' },
  { name: 'Alizaib', role: 'Developer', color: 'bg-purple-500' ,img:'ali.jpg' },
  { name: 'Nextjs', role: 'Framework', color: 'bg-black', img:'nextjs.webp' }
];

export default function About() {
  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
      
      <section className="mb-20 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span className="text-purple-400 font-medium tracking-wider text-sm uppercase mb-4 block">Our Mission</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Simplify the Web,<br/>One Link at a Time.</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We believe that sharing information should be seamless. Our platform transforms complex URLs into clean, manageable links, empowering creators and businesses to track and optimize their digital presence.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
         <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Instant redirection with our global edge network." },
            { icon: Users, title: "User Centric", desc: "Built with the user experience as our top priority." },
            { icon: Globe, title: "Global Scale", desc: "Reliable infrastructure that scales with you." }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <GlassCard className="h-full hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6 text-purple-400">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-white text-center mb-12">Meet the Developer & Utilities Used</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <GlassCard className="relative overflow-hidden group p-0">
                <div className={`h-32 ${member.color} opacity-20`} />
                <div className="p-6 relative">
                  <div className={`w-20 h-20 rounded-full ${member.color} absolute -top-10 left-6 border-4 border-slate-900 flex items-center justify-center text-2xl font-bold text-white`}>
                    <img src={member.img} 
  alt={member.name.charAt(0)}
  width={80}
  height={80}
  className="rounded-full object-cover"></img>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-purple-300 text-sm">{member.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
