import { motion } from "framer-motion";
import NewTopicCard from "./NewTopicCard";
import TopicCardLoader from "./TopicCardLoader";
import TopicCard from "@/app/components/topic-card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ITopic } from "../types";
import { topicService } from "@/app/services/topicService";
import { handleError } from "@/app/utils/errorHandler";

interface TopicsProps {
  topics: ITopic[];
}



const Topics = ({ topics }: TopicsProps) => {
  const [creating, setCreating] = useState<null | string>(null); //nombre del tópico en creación
  const router = useRouter();

  // 1. Restaurar el estado desde sessionStorage al montar
  useEffect(() => {
    const stored = sessionStorage.getItem('creatingTopic');
    if (stored) setCreating(stored);
  }, []);

  // 2. Limpiar el loader si el tópico real ya existe
  useEffect(() => {
    if (creating && topics.some((t) => t.name === creating)) {
      setCreating(null);
      sessionStorage.removeItem('creatingTopic');
    }
  }, [topics, creating]);

  const handleCreateTopic = async (name: string, context: string) => {
    setCreating(name);
    sessionStorage.setItem('creatingTopic', name);
    try {
      await topicService.createTopic(name, context);
      router.refresh();
    } catch (error) {
      handleError(error);
    } finally {
      setCreating(null);
      sessionStorage.removeItem('creatingTopic');
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <motion.div
        key={'new-topic'}
        initial={{ opacity: 0, x: 70, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NewTopicCard onCreateTopic={handleCreateTopic} />
      </motion.div>
      {creating && <TopicCardLoader name={creating} />}
      {topics.map((topic, index) => (
        <motion.div
          key={topic.name}
          initial={{ opacity: 0, x: 70, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        >
          <TopicCard topic={topic} />
        </motion.div>
      ))}
    </div>
  );
};

export default Topics;
