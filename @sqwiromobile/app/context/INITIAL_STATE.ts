import {
  I_AUTH_CONTEXT_INITIAL_STATE,
  AUTH_CONTEXT_INITIAL_STATE,
} from '@cloudhubke/appcore/auth/context/AUTH_CONTEXT_INITIAL_STATE';
import {
  REALISTYCA_CONTEXT_INITIAL_STATE,
  I_REALISTYCA_CONTEXT_INITIAL_STATE,
} from '@cloudhubke/labfoxx/context/REALISTYCA_CONTEXT_INITIAL_STATE';
import {
  APPCORE_INITIAL_STATE,
  I_APPCORE_INITIAL_STATE,
} from '@cloudhubke/appcore/appcorecontext/APPCORE_INITIAL_STATE';

export interface Country {
  CountryName: string;
  CountryCode: string;
  Currency: string;
}

export interface IInitialState
  extends I_AUTH_CONTEXT_INITIAL_STATE,
    I_APPCORE_INITIAL_STATE,
    I_REALISTYCA_CONTEXT_INITIAL_STATE {
  dispatch: (
    cb: (state: IInitialState) => {
      [K in keyof IInitialState]?: IInitialState[K];
    }
  ) => void;
  getState: () => IInitialState;
  resetState: () => void;

  CONFIG: {
    AppName: string;
    MerchantCode: string;
    PesaPurseMerchantCode: string;
    AppCode: string;
    ServerIp: string;
    API_ENDPOINT: string;
    GroupCode: string;
    AppType: 'CUSTOM' | 'SHARED';
  };

  deviceContext: {
    version: string;
  };
}

const INITIAL_STATE: IInitialState = {
  ...AUTH_CONTEXT_INITIAL_STATE,
  ...REALISTYCA_CONTEXT_INITIAL_STATE,
  ...APPCORE_INITIAL_STATE,

  CONFIG: {},

  deviceContext: {
    version: '',
  },
} as any;

export default INITIAL_STATE;
