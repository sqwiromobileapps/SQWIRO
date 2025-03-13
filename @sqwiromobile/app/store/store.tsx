import axios from 'axios';
import appStore from '@expocraft/core/lib/store-provider/appStore';
import getConfig, { appconstants } from '@cloudhubke/app/config/getConfig';

const { getState } = appStore;

// const logger = createLogger({ diff: true, collapsed: true });
// const storage = createSecureStore();

// const ip = '172.20.10.3';

export const axiosinstance = () => {
  const { token, currentUser } = getState().authContext;
  const CONFIG = getConfig();

  if (token) {
    return axios.create({
      baseURL: CONFIG.API_ENDPOINT,
      headers: {
        'x-proxies': 1,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        authorization: `Bearer ${token}`,
        userid: currentUser.id,
        username: currentUser.Name,
        phone: currentUser.Phone,
        pushtoken: currentUser.PushToken,
        ...appconstants,
      },
    });
  }
  return axios.create({
    baseURL: CONFIG.API_ENDPOINT,
    headers: {
      'x-proxies': 1,
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      userid: currentUser.id,
      username: currentUser.Name,
      Phone: currentUser.Phone,
      rating: currentUser.Rating || 4,
    },
  });
};
