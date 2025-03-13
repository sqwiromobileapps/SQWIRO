import React from 'react';
import useGraphql from '@cloudhub-ux/graphql';
import useMerchantAppContext from './useMerchantAppContext';

const useMerchantSettings = () => {
  const { Appsetting, Merchant } = useGraphql();
  const { merchantAppContext, dispatch, CONFIG } = useMerchantAppContext(
    (state) => ({
      merchantAppContext: state.merchantAppContext,
      dispatch: state.dispatch,
      CONFIG: state.CONFIG,
    })
  );

  const merchant = merchantAppContext.merchant || {};

  const getOrganization = async () => {
    const data = await Appsetting()
      .findOne({
        id: 'Organization',
      })
      .toJson();

    if (data) {
      dispatch((state) => ({
        merchantAppContext: {
          ...state.merchantAppContext,
          Organization: data as any,
        },
      }));
    }
  };

  const getMerchant = async () => {
    const data = await Merchant()
      .findOne({
        MerchantCode: CONFIG.MerchantCode,
      })
      .toJson();

    if (data) {
      dispatch((state) => ({
        merchantAppContext: {
          ...state.merchantAppContext,
          merchant: data as any,
          SystemSettings: data.SystemSettings,
          Organization: data.Organization,
        },
      }));
    }
  };

  React.useEffect(() => {
    if (!merchant.MerchantCode) {
      getMerchant();
    }
  }, [merchant.MerchantCode]);

  return {
    ...merchantAppContext,
    getOrganization,
    getMerchant,
  };
};

export default useMerchantSettings;
