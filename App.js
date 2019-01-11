import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { AppLoading, Asset, Font, Icon } from 'expo';
import Navigator from './navigation/Navigator';


const Store = store();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  async componentDidMount() {
    await this.loadResourcesAsync();
    this.setState({
      isLoadingComplete: true,
    });
  }

  loadResourcesAsync = async () => {
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Icon.Ionicons.font,
    });
  };

  handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };


  render() {
    const { isLoadingComplete } = this.state;
    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={Store}>
        <View style={styles.container}>
          <Navigator />
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
