import React from 'react';
import { toastr } from '@expocraft/core';
import useAuthentication from '@cloudhubke/appcore/auth/context/useAuthentication';

const useAppAxios = (props) => {
  const { url, params, initialState } = props || {};
  const { axiosinstance } = useAuthentication();
  // const cache = React.useRef({
  //   params: null,
  //   url: null,
  //   data: {},
  //   unmounted: false,
  // });

  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(initialState);

  const postData = React.useMemo(
    () =>
      async ({ url, params }) => {
        try {
          setLoading(true);
          const { data } = await axiosinstance().post(`${url}`, {
            ...params,
          });

          setLoading(false);
          setSuccess('Post Successful');

          try {
            toastr.success('👍🏽 Update successful');
          } catch (error) {}

          setTimeout(() => {
            setSuccess('');
          }, 4000);
          return data;
        } catch (error) {
          const response = error.response || {};
          const data = response.data || response.body || {};

          setError(`${data.message || error.toString()}`.replace(/_/g, ' '));
        }
        setLoading(false);
      },
    [axiosinstance]
  );

  const getData = React.useMemo(
    () =>
      async ({ url, params }) => {
        try {
          setLoading(true);
          const { data } = await axiosinstance().get(`${url}`, {
            params,
          });

          setLoading(false);

          return data;
        } catch (error) {
          const response = error.response || {};
          const data = response.data || response.body || {};
          setError(`${data.message || 'Server error'}`.replace(/_/g, ' '));
        }
        setLoading(false);
      },
    [axiosinstance]
  );

  const reset = (error = '') => {
    setError(error);
    setSuccess('');
    setLoading(false);
    setData(initialState);
  };

  const reload = () => {
    const hydrateState = async () => {
      const data = await getData({ url, params });
      setData(data || initialState);
    };
    if (url) {
      hydrateState();
    }
  };

  React.useEffect(() => {
    const hydrateState = async () => {
      const data = await getData({ url, params });
      setData(data || initialState);
    };
    if (url) {
      hydrateState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {
    data,
    error,
    success,
    loading,
    getData,
    postData,
    reset,
    setError: reset,
    reload,
    axiosinstance,
  };
};

export default useAppAxios;
