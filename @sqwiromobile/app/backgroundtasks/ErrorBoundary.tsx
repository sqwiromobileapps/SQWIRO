import React from 'react';
import { View, Text } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: {} };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    try {
      // axiosinstance().post("/dev/logerror", {
      //   error,
      //   errorInfo,
      // });
      console.log('Error', error, errorInfo);
    } catch (error) {}
  }

  render() {
    if (this.state.hasError) {
      // console.log('Error', this.state);
      // // You can render any custom fallback UI
      // return (
      //   <View style={{ flex: 1 }}>
      //     <Text>{`${JSON.stringify(this.state)}`}</Text>
      //   </View>
      // );
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
