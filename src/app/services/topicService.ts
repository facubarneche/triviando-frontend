import { BaseService } from './baseService';

class TopicService extends BaseService {
  getTopics = async () => {
    const { data } = await this.axiosService.get('/preguntas/topicos');
    console.log('TOPICS', data);
    return data;
  };
}

export const topicService = new TopicService();
