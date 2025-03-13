import React from 'react';
import { Platform } from 'react-native';
import { AsyncStorage } from '@expocraft/core';

import * as Notifications from 'expo-notifications';
import MerchantAppContextProvider from '@expocraft/core/lib/store-provider/AppContextProvider';
import INITIAL_STATE from './INITIAL_STATE';
import useMerchantAppContext from './useMerchantAppContext';
import useStateStore from '@cloudhubke/appcore/auth/context/useStateStore';
import getConfig from '../config/getConfig';

let DeviceInfo = {} as any;

const deviceInforContext = {} as typeof INITIAL_STATE.deviceContext;

try {
  DeviceInfo = require('react-native-device-info');

  deviceInforContext.version = DeviceInfo.getVersion();
} catch (error) {
  if (!DeviceInfo.getVersion && __DEV__) {
    throw new Error(
      "react-native-device-info is not installed. Please run 'yarn add react-native-device-info'"
    );
  }
  //
}

const LoadCache = ({ children, ...props }) => {
  const { dispatch, systemContext, CONFIG } = useMerchantAppContext(
    (state) => ({
      dispatch: state.dispatch,
      systemContext: state.systemContext,
      CONFIG: state.CONFIG,
    })
  );

  const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);

  useStateStore();

  const createNotificationChannels = async () => {
    if (Platform.OS === 'android') {
      try {
        await Notifications.setNotificationChannelAsync(
          `${CONFIG.MerchantCode}`.toUpperCase(),
          {
            Name: `${CONFIG.MerchantCode}`.toUpperCase(),
            sound: true,
          } as any
        );
      } catch (error) {
        // console.log('====================================');
        // console.log(error);
        // console.log('====================================');
      }
    }
  };

  const loadCacheAsync = async () => {
    try {
      const initialState = await AsyncStorage.getItem(
        `${getConfig().AppCode}-store`
      );

      if (
        initialState &&
        initialState.authContext &&
        initialState.authContext.token
      ) {
        const merchant = (initialState.merchantAppContext || {}).merchant || {};

        dispatch((state) => ({
          ...state,
          ...initialState,
          authContext: {
            ...initialState.authContext,
            confirmedUser: false,
            showPin: true,
            loading: false,
            hydrated: true,
          },
          merchantAppContext: {
            ...state.merchantAppContext,
            ...initialState.merchantAppContext,
          },
          systemContext: {
            ...initialState.systemContext,
            hydrated: true,
          },
          CONFIG: {
            ...getConfig(),
            ...initialState.CONFIG,
            API_ENDPOINT: getConfig().API_ENDPOINT,
            GroupCode: getConfig().GroupCode,
            AppCode: getConfig().AppCode,
            AppName: getConfig().AppName,
            AppType: getConfig().AppType,
            MerchantCode: merchant.MerchantCode || getConfig().MerchantCode,
            PesaPurseMerchantCode:
              (merchant.SystemSettings || {}).PesaPurseMerchantCode ||
              merchant.MerchantCode,
          },
          deviceInforContext,
        }));
      } else {
        dispatch((state) => ({
          ...INITIAL_STATE,
          authContext: {
            ...state.authContext,
            confirmedUser: false,
            showPin: true,
            loading: false,
            hydrated: true,
          },
          systemContext: {
            ...state.systemContext,
            hydrated: true,
          },
          CONFIG: {
            ...getConfig(),
            API_ENDPOINT: getConfig().API_ENDPOINT,
            GroupCode: getConfig().GroupCode,
            AppCode: getConfig().AppCode,
            AppName: getConfig().AppName,
            AppType: getConfig().AppType,
            MerchantCode: getConfig().MerchantCode,
          },
          deviceInforContext,
        }));
      }

      setIsLoadingComplete(true);
    } catch (error) {
      // console.warn(e);
    }
  };

  React.useEffect(() => {
    void loadCacheAsync();
    void createNotificationChannels();
  }, []);

  const appIsReady = isLoadingComplete && systemContext.hydrated;

  if (!appIsReady) {
    return null;
  }

  return <>{children}</>;
};

const PreloadApp = ({
  children,
  MerchantCode,
  GooglePlayId,
  ShowPesaPurse,
}: {
  children: any;
  MerchantCode: string;
  GooglePlayId: string; // This is important because it tells paprycaapp that this is a custom app
  ShowPesaPurse: boolean;
}) => {
  return (
    <MerchantAppContextProvider
      INITIAL_STATE={{
        ...INITIAL_STATE,
        CONFIG: {
          ...INITIAL_STATE.CONFIG,
          MerchantCode,
          ShowPesaPurse: ShowPesaPurse,
          ...(GooglePlayId ? { GooglePlayId } : {}),
        },
      }}
    >
      <LoadCache>{children}</LoadCache>
    </MerchantAppContextProvider>
  );
};

export default PreloadApp;
