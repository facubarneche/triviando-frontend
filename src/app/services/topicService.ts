import { BaseService } from './baseService';

class TopicService extends BaseService {
  getTopics = async () => {
    const { data } = await this.axiosService.get('/preguntas/topicos');
    return data;
  };

  createTopic = async (name: string, context: string) => {
    const { data } = await this.axiosService.post('/preguntas/generate', {
      topic: name,
      promptContext: context,
    });
    return data;
  };
}

export const topicService = new TopicService();
