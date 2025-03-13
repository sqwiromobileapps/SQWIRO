import React from 'react';
import useAppAxios from './useAppAxios';

const useAdvance = () => {
  const { getData } = useAppAxios();
  const [advanceaccount, setAdvanceAccount] = React.useState({
    AdvanceLimit: 0,
    AvailableAdvance: 0,
  });

  const getAdvanceAccount = async () => {
    const data = await getData({
      url: '/mobileloans/advance/getaccount',
    });

    if (data) {
      setAdvanceAccount(data);
    }
  };

  React.useEffect(() => {
    getAdvanceAccount();
  }, []);

  return {
    advanceaccount,
    getAdvanceAccount,
  };
};

export default useAdvance;
