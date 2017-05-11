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
  View,
  Animated, 
  Dimensions,
} from 'react-native';
import Animation from 'lottie-react-native';

export default class LottieExperiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
	
	//this.cycleAnimation = this.cycleAnimation.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
    }).start(
      event => {
    if (event.finished) {
      //this.setState({ progress: this.state.progress - 1 });
    }
  }	
	);
  }

  componentDidUpdate()
  {
    
     //({value}) => this._value = value
     //this.state.pageNumber.addListener(this.changePageNum.bind());

     //this.cycleAnimation();
     //this.animateHeadImgFadeOut();
  }
  
  cycleAnimation()
  {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
    }).start(
      event => {
    if (event.finished) {
      this.setState({ progress: this.state.progress - 1 });
    }
  }	
	);	  
  }
  
  render() {
    return (
      <Animation
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        source={require('animations/EddyAppAnimation.json')}
        progress={this.state.progress}
      />
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

AppRegistry.registerComponent('LottieExperiment', () => LottieExperiment);
