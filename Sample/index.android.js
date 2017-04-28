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
  LayoutAnimation,
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
        duration: 1000,
        toValue: 1,                             // Animate to opacity: 1, or fully opaque
      }
    ).start();                                  // Starts the animation
  }
  
  
  render() {
    return (
      <Animated.View                              // Special animatable View
        style={{
    opacity: this.state.fadeAnim, // Binds directly
    transform: [{
      translateY: this.state.fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0]   // 0 : 150, 0.5 : 75, 1 : 0
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
    this.springValue =new Animated.Value(0);
    this.topImagefadeOutAnim = new Animated.Value(0);
      
    

    //this.bttomAuthorXPosition = 0;
      
      
     
     //this.props._value = 0;
    this.props.pageNumber = 0;
    this.state = {
     bottomAuthorXPosition: new Animated.Value(1200),
     bodyTextYPosition: new Animated.Value(150),
     bodyFade: new Animated.Value(0),
     pageNumber: new Animated.Value(0),
     topImagefadeIn: new Animated.Value(0),                // Initial value for opacity: 0
      topImagefadeOut: new Animated.Value(0),           // Initial value for opacity: 0     
      
      firstPage: true, 
      pageNum: 0,
      alpha :  new Animated.Value(0), 
      AuthorfadeAnim: new Animated.Value(0),          // Initial value for opacity: 0
      imageFadeOutProgress : 1,
    };
    
        //({value}) => this._value = value
     this.state.pageNumber.addListener(({value}) => this.state.pageNum = value);
    
    //this.changePageNum = this.changePageNum.bind(this);
     //this.onCompleted = this.onCompleted.bind(this);
    this.animateHeadImgFadeOut = this.animateHeadImgFadeOut.bind(this);   
     this._onPressed = this._onPressed.bind(this);
    this.cycleAnimation = this.cycleAnimation.bind(this);
    //this.state.topImagefadeOut.addListener(({value}) => this.state.imageFadeOutProgress = value);
    //this.state.topImagefadeOut.addListener(({value}) => this.props._value = value);

  }
  
  changePageNum()
  {
    this.setState({ pageNum: this.state.pageNum + 1 });
    
    
  }
  
  
  
  _onPressed() {
    //this.cycleAnimation();
    this.animateHeadImgFadeOut();
    //this.onCompleted();
    //this.setState({ firstPage: !this.state.firstPage });
    //this.setState({ pageNum: this.state.pageNum + 1 });
    
    
    
    
  }

  
  spring () {
  this.springValue.setValue(0.3)
  Animated.spring(
    this.springValue,
    {
      toValue: 1,
      friction: 1
    }
  ).start()
}
  
  
  componentDidMount() {
    
    Animated.parallel([
    
    Animated.timing(                                // Animate over time
      this.state.bodyTextYPosition,                      // The animated value to drive
      {
        duration: 1000,
        toValue: 0,                              // Animate to opacity: 1, or fully opaque
      }
    ),
      //  Starts the animation
    Animated.timing(                               // Animate over time
      this.state.topImagefadeOut,                      // The animated value to drive
      {
        duration: 1000,
        toValue: 1,                              // Animate to opacity: 1, or fully opaque
      }
    ),                                        //  Starts the animation
      
          //  Starts the animation
    Animated.timing(                               // Animate over time
      this.state.bodyFade,                      // The animated value to drive
      {
        delay: 1000,
        duration: 1000,
        toValue: 1,                               // Animate to opacity: 1, or fully opaque
      }
    ),                                        //  Starts the animation  
    
    Animated.timing(                             // Animate over time
      this.state.AuthorfadeAnim,                      // The animated value to drive
      {
        duration: 1000,
        toValue: 1,                              // Animate to opacity: 1, or fully opaque
      }
    ),                                        //  Starts the animation     
    
    Animated.timing(
      this.state.bottomAuthorXPosition,
      {
        toValue: 0,
        //easing: Easing.bounce,
        duration: 1000,
    
      }                              
    ),  
      
    ]).start();
    
  }
  
  componentDidUpdate()
  {
    
     //({value}) => this._value = value
     //this.state.pageNumber.addListener(this.changePageNum.bind());

     this.cycleAnimation();
     //this.animateHeadImgFadeOut();
  }
  
  componentWillUpdate()
  {
    
    //this.cycleAnimation();
    
  }
  
  
  //this.state.animatedStartValue = 0;

cycleAnimation() {

  
  
  
  
  //this.setState({ pageNum: this.state.pageNum + 1 });
  Animated.sequence([

    
Animated.parallel([

  
    
        

  
  
    Animated.timing(
      this.state.topImagefadeOut, {
      toValue: 1,
      duration: 2000,
      //delay: 1000
    }),
    
    Animated.timing(
      this.state.bodyFade, {
      toValue: 1,
      duration: 2000,
      delay: 500
    }),

    Animated.timing(                                // Animate over time
      this.state.bodyTextYPosition,                      // The animated value to drive
      {
        duration: 2000,
        toValue: 0,                                // Animate to opacity: 1, or fully opaque
        delay: 500,
      }
    ),      

]),
    
    
//    Animated.timing(this.state.topImagefadeOut, {
//      toValue: 0.5,
 //     duration: 500
//   }),
    
  //  Animated.timing(this.state.alpha, {
  //    toValue: 0,
      //duration: 500
  // }),
    
  ]).start(event => {
    if (event.finished) {
      //this.cycleAnimation();
      
    }
  });
  
  
  
  
  
   //this.setState({ pageNum: this.state.pageNum + 1 });
  
}
  
  
  
  animateHeadImgFadeOut()
  {
    
    Animated.parallel([
    
    Animated.timing(
      this.state.bottomAuthorXPosition,
      {
        toValue: 1200,
        //easing: Easing.bounce,
        duration: 500,
    
      }                              
    ),      

    Animated.timing(                                // Animate over time
      this.state.bodyTextYPosition,                      // The animated value to drive
      {
        duration: 1000,
        toValue: 150,                              // Animate to opacity: 1, or fully opaque
      }
    ),      
      
    
    Animated.timing(                                // Animate over time
      this.state.topImagefadeOut,                      // The animated value to drive
      {
        duration: 500,
        toValue: 0,                                  //Animate to opacity: 1, or fully opaque
      }
    ),
      
    Animated.timing(                                // Animate over time
      this.state.bodyFade,                      // The animated value to drive
      {
        duration: 500,
        toValue: 0,                                  //Animate to opacity: 1, or fully opaque
      }
    ),      
      ])
      .start
    (
      
      event => {
    if (event.finished) {
      this.setState({ pageNum: this.state.pageNum + 1 }, this.cycleAnimation());
    }
  }
       //this.onCompleted.bind(this),
       //this.onCompleted.bind(this),
       //this.setState({ pageNum: this.state.pageNum + 1 }),
//      function onComplete() 
//      {
//        this.props.pageNumber = 1;
//      }
    );                                     //     Starts the animatio   
    
     //this.stopAnimation.bind(this)
     //this.animateValue.spring({}).start(function onComplete() {})
     //this.setState({ pageNum: this.state.pageNum + 1 });
    
  }
  
  

      
      
      
      
  onCompleted()
  {
    this.setState({ pageNum: this.state.pageNum + 1 });
  }
  
  
  pageURI_array = 
  [
     
      1: {uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1033-200.png'}, 
      2: {uri: 'https://icons.iconarchive.com/icons/rokey/smooth/128/apple-icon.png'}, 
      
    
  ];
  
  
  render() {

    
    
    //const spin = this.state.alpha.interpolate({
  //  inputRange: [0, 1, 2],
  //  outputRange: ['0', '1', '2']
  //})
	let pic = this.state.pageNum == 0? {
      uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1033-200.png'
    }: {uri: 'https://icons.iconarchive.com/icons/rokey/smooth/128/apple-icon.png'};
    
    //let pic2 = this.pageURI_array[this.state.pageNum];
	  
    let bodystyle = this.state.pageNum == 0 ? styles.instructions:styles.instructions2;
    let headerstyle = this.state.pageNum == 0 ? styles.welcome2:styles.welcome4;
    let header = this.state.pageNum == 0 ? 'CONTENT' : 'WE WILL ANSWER:';
    let bodytext = this.state.pageNum == 0 ? 'Get Customers'+"\n"+'Interested by Telling'+"\n"+'a Great Story' : 'How can I use my own experience to help my business?'+'\n'+'Whats the personal approach to story telling?'+'\n'+' whats the higher purpose approach?';
    let author = this.state.pageNum == 0 ? 'Ryan Holiday, Author and Strategist' : '';
    let timeAndActivity = this.state.pageNum == 0 ? '3min, 2 activities' : '';
    let opaqueValue = this.state.pageNum == 0 ? 1 : 0;
    let currentAnimationView = this.state.firstPage? FadeInView : PositionMoveView;
    
    let topimageStyle = this.state.pageNum == 0?
    {
        opacity:   
		//1,
        //spin,
        this.state.topImagefadeOut,

      //this.state.topImagefadeOut.interpolate
      // ({
      //  inputRange: [0, 1],
      //  outputRange: [1, 0]
      //  }),
      

    }
    :
    {
        opacity: 
        //1, // Binds directly}
        this.state.topImagefadeOut,
    }
    
    
    
    
    return (
     
      <TouchableWithoutFeedback onPress={this._onPressed} style={styles.container}>
        
        
        <View style={styles.container} >
        
          <Animated.View style={topimageStyle}>
            <Image source={pic} style={{width: 50, height: 50}} />
          </Animated.View>
          
           
          <Animated.View style={topimageStyle}>
            <Text style={headerstyle}  >
            {header}
            </Text>
          </Animated.View>
         
          
          
          <Animated.View                             
            style=
            {{
                opacity: this.state.bodyFade,

                top: this.state.bodyTextYPosition, 
            }}
           >
            <Text style={bodystyle}>
             {bodytext}
            </Text>
          </Animated.View>
         
          
          
          <Animated.View                                   //  Special animatable View
              style={{
                //opacity: this.state.topImagefadeOut,
                right: this.state.bottomAuthorXPosition,           // Bind opacity to animated value
                
              }}
           >
            <Text style={styles.welcome3}>
             {author}
            </Text>
 		   </Animated.View>
         
           <Animated.View                            // Special animatable View
              style={{
                //opacity: this.state.topImagefadeOut,
                right: this.state.bottomAuthorXPosition,           // Bind opacity to animated value
                
              }}
           >
            <Text style={styles.welcome3}>
             {timeAndActivity}
            </Text>
           </Animated.View>
          
          
          
          
          
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