import { motion } from 'framer-motion';

interface TopicCardLoaderProps {
  name: string;
}

const TopicCardLoader = ({ name }: TopicCardLoaderProps) => (
  <motion.div
    key="topic-loader"
    initial={{ opacity: 0, x: 70, y: 40 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="h-[200px] flex flex-col items-center justify-center text-center bg-white/80 rounded-lg shadow-md border border-dashed border-cyan-300">
      <div className="mb-2">
        <motion.div
          className="h-8 w-8 rounded-full border-4 border-t-transparent border-cyan-400 animate-spin mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <h3 className="text-lg font-bold text-cyan-700">{name}</h3>
      <p className="text-sm text-muted-foreground">Generando preguntas con IA...</p>
    </div>
  </motion.div>
);

export default TopicCardLoader;
