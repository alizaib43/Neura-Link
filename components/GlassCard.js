import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function GlassCard({ children, className, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "glass-card rounded-2xl p-6 md:p-8",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
