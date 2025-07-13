import { BaseService } from './baseService';

class SuscriptionService extends BaseService {
  getCheckoutUrlForSubscription = async ({ email }: { email: string }) => {
    const { data } = await this.axiosService.post(`/suscriptions?email=${email}`);
    return data;
  };
}

export const suscriptionService = new SuscriptionService();
