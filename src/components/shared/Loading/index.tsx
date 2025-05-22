import { PlaneTakeoff } from 'lucide-react';
import { motion } from 'framer-motion';

const Loading = ({ message = '잠시만 기다려주세요...' }: { message?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex flex-col items-center justify-center"
    >
      <PlaneTakeoff className="text-secondary animate-bounce" size={48} />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-text text-lg font-semibold"
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default Loading;
