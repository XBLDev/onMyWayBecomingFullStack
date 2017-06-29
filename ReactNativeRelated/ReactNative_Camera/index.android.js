
// 'use strict'
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   Dimensions,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View
// } from 'react-native';
// import Camera from 'react-native-camera';


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// index.ios.js, index.android.js

import { AppRegistry } from 'react-native';
import App from './app/index';
import BadInstagramCloneApp from './app/BadInstagramClone';
AppRegistry.registerComponent('RNDemo', () => BadInstagramCloneApp);






/*class BadInstagramCloneApp2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
 
  takePicture() {
    const options = {};
    //options.location = ... 
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});*/



// AppRegistry.registerComponent('RNDemo', () => BadInstagramCloneApp2);





/*import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class RNDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RNDemo', () => RNDemo);*/
