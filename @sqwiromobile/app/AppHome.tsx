import React from 'react';
import PreloadApp from './context/PreloadApp';
import RootNavigator from './navigation/RootNavigator';

const AppHome = ({ children }) => {
  return (
    <PreloadApp
      MerchantCode=""
      GooglePlayId="com.labfoxx.app"
      ShowPesaPurse={false}
    >
      <RootNavigator />
    </PreloadApp>
  );
};

export default AppHome;
