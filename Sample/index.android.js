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
  Easing,
} from 'react-native';




class SequenceAnimationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xPosition: new Animated.Value(0),         
    };
  }
  componentDidMount() {
Animated.sequence([            // decay, then spring to start and twirl
  Animated.decay(position, {   // coast to a stop
    velocity: {x: gestureState.vx, y: gestureState.vy}, // velocity from gesture release
    deceleration: 0.997,
  }),
  Animated.parallel([          // after decay, in parallel:
    Animated.spring(position, {
      toValue: {x: 0, y: 0}    // return to start
    }),
    Animated.timing(twirl, {   // and twirl
      toValue: 360,
    }),
  ]),
]).start();                    // start the sequence group
  }
  render() {
    return (
      <Animated.View                            // Special animatable View
        style={{
          ...this.props.style,
          right: this.state.xPosition,          // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}



class PositionMoveView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xPosition: new Animated.Value(1200),         
    };
  }
  componentDidMount() {
Animated.timing(
  this.state.xPosition,
  {
    toValue: 0,
    easing: Easing.bounce,
    duration: 500,
    
  }                              
).start();
  }
  render() {
    return (
      <Animated.View                            // Special animatable View
        style={{
          ...this.props.style,
          right: this.state.xPosition,          // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class FadeInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),          // Initial value for opacity: 0
    };
  }
  componentDidMount() {
    Animated.timing(                            // Animate over time
      this.state.fadeAnim,                      // The animated value to drive
      {
        duration: 500,
        toValue: 1,                             // Animate to opacity: 1, or fully opaque
      }
    ).start();                                  // Starts the animation
  }
  
  
  render() {
    return (
      <Animated.View                            // Special animatable View
        style={{
    opacity: this.state.fadeAnim, // Binds directly
    transform: [{
      translateY: this.state.fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
      }),
    }],
  }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}






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
    this.state = {readText: true, firstPage: true, pageNum: 0};
    
    this._onPressed = this._onPressed.bind(this);
    
  }
  _onPressed() {
   
    this.setState({ readText: !this.state.readText });
    this.setState({ firstPage: !this.state.firstPage });
    this.setState({ pageNum: this.state.pageNum + 1 });
  }
  
  render() {

    
	let pic = this.state.firstPage ? {
      uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1033-200.png'
    }:{uri: 'https://icons.iconarchive.com/icons/rokey/smooth/128/apple-icon.png'};  
	
    let bodystyle = this.state.firstPage ? styles.instructions:styles.instructions2;
    let headerstyle = this.state.firstPage ? styles.welcome2:styles.welcome4;
    let header = this.state.firstPage ? 'CONTENT' : 'WE WILL ANSWER:';
    let bodytext = this.state.firstPage ? 'Get Customers'+"\n"+'Interested by Telling'+"\n"+'a Great Story' : 'How can I use my own experience to help my business?'+'\n'+'Whats the personal approach to story telling?'+'\n'+' whats the higher purpose approach?';
    let author = this.state.firstPage ? 'Ryan Holiday, Author and Strategist' : '';
    let timeAndActivity = this.state.firstPage ? '3min, 2 activities' : '';
    let opaqueValue = this.state.firstPage? 1 : 0;
    let currentAnimationView = this.state.firstPage? FadeInView : PositionMoveView;
    return (
     
      <TouchableWithoutFeedback onPress={this._onPressed} style={styles.container}>
        
        
      <View style={styles.container} >
        
        
        <Image source={pic} style={{width: 50, height: 50}} />
        
        
         <FadeInView>
          <Text style={headerstyle}  >
           {header}
          </Text>
        </FadeInView>
        
        <FadeInView>
          <Text style={bodystyle}>
            {bodytext}
          </Text>
        </FadeInView>
        
        <PositionMoveView >
          <Text style={styles.welcome3}>
            {author}
          </Text>
		</PositionMoveView>
        
		<PositionMoveView >
        <Text style={styles.welcome3}>
          {timeAndActivity}
        </Text>
        </PositionMoveView>
        
        
        
      </View>
        
        
        
      </TouchableWithoutFeedback>
      
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    
    justifyContent: 'center',//<-----justifyContent: how are children distributed?Available options are flex-start, center, flex-end, space-around, and space-between.
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
	//flexDirection: 'row'
	
  },  
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
