/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class aSample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome2}>
          CONTENT
        </Text>
        <Text style={styles.instructions}>
          Get Customers{'\n'}
		  Interested by telling{'\n'}
		  a story
        </Text>
        <Text style={styles.instructions2}>
          Ryan Holiday, Author and Strategist
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  welcome2: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
	color: '#1E90FF',
  },
  
  instructions: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 5,
  },
  instructions2: {
    textAlign: 'center',
    color: '#D3D3D3',
    marginBottom: 5,
  },
  
});

AppRegistry.registerComponent('aSample', () => aSample);
