import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
