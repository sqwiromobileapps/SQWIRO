import React from 'react';
import { GraphqlProvider } from '@cloudhub-ux/graphql';
import AuthProvider from '@cloudhubke/appcore/auth/context/AuthProvider';
import useMerchantAppContext from './useMerchantAppContext';
import useMerchantSettings from './useMerchantSettings';

const MerchantAppProvider = ({ children }: any) => {
  const { authContext, merchantAppContext, CONFIG } = useMerchantAppContext(
    (state) => ({
      authContext: state.authContext,
      merchantAppContext: state.merchantAppContext,
      dispatch: state.dispatch,
      CONFIG: state.CONFIG,
    })
  );

  useMerchantSettings();

  const currentUser = authContext.currentUser;

  const headers = {
    authorization: `Bearer ${authContext.token || ''}`,
    userid: currentUser.id || '',
    username: currentUser.Name || '',
    email: currentUser.Email || '',
    phone: currentUser.Phone || '',
    merchantcode: CONFIG.MerchantCode
      ? `${CONFIG.AppCode}-${CONFIG.MerchantCode}`
      : '',
    url: `${CONFIG.API_ENDPOINT}/gql/www`,
  };

  return (
    <GraphqlProvider
      url={`${CONFIG.API_ENDPOINT}/gql/www`}
      models={[
        'Websitemessage',
        'Websitepost',
        'Merchant',
        'Merchantuser',
        'System',
        'Registration',
        'Appsetting',
      ]}
      headers={headers}
    >
      <AuthProvider>{children}</AuthProvider>
    </GraphqlProvider>
  );
};

export default MerchantAppProvider;
