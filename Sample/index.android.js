/**

 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';


class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState({ showText: !this.state.showText });
    }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

export default class aSample extends Component {
  
  constructor(props) {
    super(props);
    this.state = {readText: true, firstPage: true};
    this._onPressed = this._onPressed.bind(this);
  }
  _onPressed() {
   
    this.setState({ readText: !this.state.readText });
    this.setState({ firstPage: !this.state.firstPage });
  }
  
  render() {

    
	let pic = this.state.readText ? {
      uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1033-200.png'
    }:{uri: 'https://icons.iconarchive.com/icons/rokey/smooth/128/apple-icon.png'};  
	
    let bodystyle = this.state.firstPage ? styles.instructions:styles.instructions2;
    let headerstyle = this.state.firstPage ? styles.welcome2:styles.welcome4;
    let header = this.state.firstPage ? 'CONTENT' : 'WE WILL ANSWER:';
    let bodytext = this.state.firstPage ? 'Get Customers'+"\n"+'Interested by Telling'+"\n"+'a Great Story' : 'How can I use my own experience to help my business?'+'\n'+'Whats the personal approach to story telling'+'\n'+' whats the higher purpose approach?';
    let author = this.state.firstPage ? 'Ryan Holiday, Author and Strategist' : '';
    let timeAndActivity = this.state.firstPage ? '3min, 2 activities' : '';
    
    return (
      <TouchableWithoutFeedback onPress={this._onPressed} style={styles.container}>
      <View style={styles.container} >
	    <Image source={pic} style={{width: 50, height: 50}} />
        
        <Text style={headerstyle}  >
         {header}
        </Text>
        <Text style={bodystyle}>
        {bodytext}
        </Text>
        <Text style={styles.welcome3}>
          {author}
        </Text>
		
		
        <Text style={styles.welcome3}>
          {timeAndActivity}
        </Text>
        
        <Blink text='Tap to continue' />
      </View>
        </TouchableWithoutFeedback>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',//<-----justifyContent: how are children distributed?Available options are flex-start, center, flex-end, space-around, and space-between.
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
	//flexDirection: 'row'
	
  },
  welcome4: {
    fontSize: 15,
    textAlign: 'center',
    margin: 30,
    color: '#000000',
    fontWeight: 'bold'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  welcome2: {
    fontSize: 15,
    textAlign: 'center',
    margin: 30,
	color: '#00ffab',
    fontWeight: 'bold'
  },
  welcome3: {
    fontSize: 11,
    textAlign: 'center',
    margin: 5,
	color: '#D3D3D3',
    //fontWeight: 'bold'
  },
  
  instructions: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  instructions2: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 5,
    fontSize: 12,
  },
  
  instructions3: {
    textAlign: 'center',
    color: '#D3D3D3',
    marginBottom: 5,
  },
  
});

AppRegistry.registerComponent('aSample', () => aSample);
