import { axiosinstance } from '@pesapurse/ppapp/app/store/store';
import React from 'react';
import { View, Text } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: {} };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    try {
      if (error && Object.keys(error).length > 0) {
        this.setState({ hasError: true, error: JSON.stringify(error) });
      }
      axiosinstance().post('/dev/logerror', {
        error,
        errorInfo,
      });
    } catch (error) {
      //
    }
  }

  render() {
    if (this.state.hasError) {
      // console.log('Error', this.state);
      // // You can render any custom fallback UI
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>{`${JSON.stringify(this.state)}`}</Text>
        </View>
      );
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
