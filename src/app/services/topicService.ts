import { BaseService } from './baseService';

class TopicService extends BaseService {
  getTopics = async ({ id }: { id: number }) => {
    const { data } = await this.axiosService.get(`/preguntas/topicos/${id}`);
    return data;
  };

  createTopic = async (name: string, userId: number) => {
    const { data } = await this.axiosService.post('/preguntas/generate', {
      topic: name,
      userId,
      promptType: 'topicPrompter',
    });

    return data;
  };
}

export const topicService = new TopicService();
