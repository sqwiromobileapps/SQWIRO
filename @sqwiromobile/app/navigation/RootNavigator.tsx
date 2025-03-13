import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MerchantAppProvider from '../context/MerchantAppProvider';
import PersonalAccountDrawerNavigator from '@cloudhubke/labfoxx/personalaccount/PersonalAccountDrawerNavigator';
import PesaPurseApp from '@pesapurse/ppapp/app/App';

const Stack = createStackNavigator();

const AppRootNavigator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={'PersonalAccountDrawerNavigator'}
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen
          name="PersonalAccountDrawerNavigator"
          component={PersonalAccountDrawerNavigator}
        />
        <Stack.Screen name="PesaPurseApp" component={PesaPurseApp} />
      </Stack.Navigator>
    </>
  );
};

const RootNavigator = (props) => (
  <NavigationContainer>
    <MerchantAppProvider>
      <AppRootNavigator />
    </MerchantAppProvider>
  </NavigationContainer>
);
export default RootNavigator;
