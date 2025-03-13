import React from 'react';
import { Platform, AppState } from 'react-native';

import moment from 'moment';

const useAppState = props => {
  const [showPinScreen, setShowPinScreen] = React.useState(true);
  const [appState, setAppState] = React.useState(AppState.currentState);
  const [LastActive, setLastActive] = React.useState(moment().valueOf());
  const [DurationSinceLastActive, setDurationSinceLastActive] = React.useState(
    0
  );

  const _handleAppStateChange = React.useCallback(nextAppState => {
    setAppState(nextAppState);
  }, []);

  React.useEffect(() => {
    if (appState !== 'active') {
      setLastActive(new Date().getTime());
      setDurationSinceLastActive(0);
    }

    if (appState === 'active') {
      const duration = moment().diff(moment(LastActive), 'seconds');
      setDurationSinceLastActive(duration);
    }
  }, [appState]);

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const resetScreen = React.useCallback(value => {
    setShowPinScreen(value);
  }, []);

  return {
    appState,
    showPinScreen,
    LastActive,
    DurationSinceLastActive
  };
};

export default useAppState;
