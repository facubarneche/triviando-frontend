import { BaseService } from './baseService';

class TopicService extends BaseService {
  getTopics = async () => {
    const { data } = await this.axiosService.get('/api/v1/preguntas/topicos');

    return data;
  };
}

export const topicService = new TopicService();
