import Constants from 'expo-constants';
import appStore from '@expocraft/core/lib/store-provider/appStore';
const { getState } = appStore;

export const appconstants = {
  appotaversion: '1.0.2',
  DeviceName: Constants.deviceName,
};

// const ServerIp = '172.20.10.2';
// const ServerIp = '172.20.10.3';
const ServerIp = '192.168.100.144';
// const ServerIp = '192.168.100.17';
// const ServerIp = '192.168.8.200';

const getConfig = () => {
  const { MerchantCode, PesaPurseMerchantCode, ShowPesaPurse, ...config } =
    getState().CONFIG || {};

  const CONFIG = {
    AppName: 'LABFOXX',
    AppCode: 'labfoxx',
    ServerIp,
    ...config,
    MerchantCode: MerchantCode || '',
    PesaPurseMerchantCode: PesaPurseMerchantCode || MerchantCode,
    ShowPesaPurse,
    AppType: 'SHARED',
    GooglePlayId: 'com.labfoxx.app', // this is important because it determines if the app has Organization select screen

    ...appconstants,
    ...config,

    API_ENDPOINT: __DEV__
      ? `http://${ServerIp}:2088/api`
      : `https://${MerchantCode || 'business'}.labfoxx.com/api`,
  };

  return CONFIG;
};

export default getConfig;
