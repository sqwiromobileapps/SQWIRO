import useMerchantAppContext from './useMerchantAppContext';

const useMerchantAppNavigation = () => {
  const { appNavigationContext, dispatch } = useMerchantAppContext((state) => ({
    appNavigationContext: state.appNavigationContext,
    dispatch: state.dispatch,
  }));

  return {
    ...appNavigationContext,
    dispatch,
  };
};

export default useMerchantAppNavigation;
