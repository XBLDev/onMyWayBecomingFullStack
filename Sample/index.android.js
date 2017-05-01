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
// 'Get Customers'+"\n"+'Interested by Telling'+"\n"+'a Great Story' : 'How can I use my own experience to help my business?'+'\n'+'Whats the personal approach to story telling?'+'\n'+' whats the higher purpose approach?';
      
    this.bodyText = {
     '0':'Get Customers'+"\n"+'Interested by Telling'+"\n"+'a Great Story',
     '1':'How can I use my own experience to help my business?'+'\n'+'Whats the personal approach to story telling?'+'\n'+' whats the higher purpose approach?',
     '2':'Imagine that theres a business onwer Michael, '+'\n'+'who makes hats for cats, donating part of his money to animal rescues, '+'\n'+'\n'+'WHATS A BETTER STARTING POINT FOR MACHAELS STORY?', 
    }
    
    this.TitleText = {
     '0':'CONTENT',
     '1':'WE WIIL ANSWER:',
     '2':'', 
    }
    
    this.bottomText = {
     '0':'Ryan Holiday, Author and Strategist',
     '1':'',
     '2':'Lets see', 
    }

    this.bottomStyle = {
     '0':styles.welcome3,
     '1':styles.welcome3,
     '2':styles.welcome5, 
    }    
        
    this.letsSeeIcon = {
     '0':'',
     '1':'',
     '2':{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Arrow_icon.svg/1024px-Arrow_icon.svg.png'}, 
    }
    
    this.letsSeeIconSize = {
     '0':0,
     '1':0,
     '2':30, 
    }
    
    this.headIconSize = {
     '0':50,
     '1':50,
     '2':100, 
    }
    //this.bttomAuthorXPosition = 0;
      //this.state.stored['ok']
      //styles.welcome3
     
     //this.props._value = 0;
    this.props.pageNumber = 0;
    this.state = {
      
     stored: {
     '0':{uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1033-200.png'},
     '1':{uri: 'https://icons.iconarchive.com/icons/rokey/smooth/128/apple-icon.png'},
     '2':{uri: 'http://bcdn.sadanduseless.com/wp-content/uploads/2014/04/cat-hat1.jpg'}
     }, 
     //https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Arrow_icon.svg/1024px-Arrow_icon.svg.png
      
      bottomAuthorXPosition: new Animated.Value(1200),
     bodyTextYPosition: new Animated.Value(150),
     bodyFade: new Animated.Value(0),
     pageNumber: new Animated.Value(0),
     topImagefadeIn: new Animated.Value(0),                // Initial value for opacity: 0
      topImagefadeOut: new Animated.Value(0),           // Initial value for opacity: 0     
      
      letsSeeIconFade: new Animated.Value(0),
      
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
  
if(this.state.pageNum.toString()=='1')//FROM PAGE1 TO PAGE2
{
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

    Animated.timing(                                 // Animate over time
      this.state.bodyTextYPosition,                      // The animated value to drive
      {
        duration: 2000,
        toValue: 0,                                  // Animate to opacity: 1, or fully opaque
        delay: 500,
      }
    ),      

]),
    
  ]).start(event => {
    if (event.finished) {
      //this.cycleAnimation();
      
    }
  });
  
}
else if(this.state.pageNum.toString()=='2')//FROM PAGE2 TO PAGE3
{
  //this.state.bottomAuthorXPosition
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

    Animated.timing(                                 // Animate over time
      this.state.bodyTextYPosition,                      // The animated value to drive
      {
        duration: 2000,
        toValue: 0,                                  // Animate to opacity: 1, or fully opaque
        delay: 500,
      }
    ),      
    
    Animated.timing(
      this.state.bottomAuthorXPosition,
      {
        toValue: 0,
        //easing: Easing.bounce,
        duration: 1000,
        delay: 2500,
      }                              
    ),  
  
     
  
  
]),
  ]).start(event => {
    if (event.finished) {
    }
  });  
}
  

  
}
  
  
  
  animateHeadImgFadeOut()
  {
 if(this.state.pageNum.toString()=='0'){//FROM PAGE1 TO PAGE2, PAGE1 ANIMATION  
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
      this.setState({ pageNum: this.state.pageNum + 1 });
    }
  }

    );                                     //     Starts the animatio   
 }
if(this.state.pageNum.toString()=='1'){//FROM PAGE2 TO PAGE3, PAGE2 ANIMATION
    Animated.parallel([
    
    Animated.timing(
      this.state.bottomAuthorXPosition,
      {
        toValue: 1200,
        //easing: Easing.bounce,
        duration: 500,
    
      }                              
    ),      

    Animated.timing(                                 // Animate over time
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
        toValue: 0,                                   //Animate to opacity: 1, or fully opaque
      }
    ),      
      ])
      .start
    (
      
      event => {
    if (event.finished) {
      this.setState({ pageNum: this.state.pageNum + 1 });//, this.cycleAnimation()
    }
  }

    );                                     //     Starts the animatio     
}

}
  
  

      
      
      
      
  onCompleted()
  {
    this.setState({ pageNum: this.state.pageNum + 1 });
  }
  
  

  
  render() {

    
  //  const numbers = [{
  //    uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1033-200.png'
  //  }, {uri: 'https://icons.iconarchive.com/icons/rokey/smooth/128/apple-icon.png'}, 3, 4, 5];
    
  //  const doubled = numbers.map((number) => number * 2);
    //const spin = this.state.alpha.interpolate({
  //  inputRange: [0, 1, 2],
  //  outputRange: ['0', '1', '2']
  //})
    //this.state.stored['ok']
	let pic = this.state.pageNum == 0? {
      uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1033-200.png'
    }: {uri: 'https://icons.iconarchive.com/icons/rokey/smooth/128/apple-icon.png'};
    
    let pic2 = this.state.stored[this.state.pageNum.toString()];
	  
    let letsSeePic = this.letsSeeIcon[this.state.pageNum.toString()];

    
    let bodystyle = this.state.pageNum == 0 ? styles.instructions:styles.instructions2;
    //letsSeeIconSize
    let letsCIconSize = this.letsSeeIconSize[this.state.pageNum.toString()];
    let headerstyle = this.state.pageNum == 0 ? styles.welcome2:styles.welcome4;
    let header = this.state.pageNum == 0 ? 'CONTENT' : 'WE WILL ANSWER:';
    let header2 = this.TitleText[this.state.pageNum.toString()];
    //headIconSize
    let currHeadIconSize = this.headIconSize[this.state.pageNum.toString()];
    let bodytext = this.state.pageNum == 0 ? 'Get Customers'+"\n"+'Interested by Telling'+"\n"+'a Great Story' : 'How can I use my own experience to help my business?'+'\n'+'Whats the personal approach to story telling?'+'\n'+' whats the higher purpose approach?';
    let bodytext2 = this.bodyText[this.state.pageNum.toString()];
    
    let author = this.state.pageNum == 0 ? 'Ryan Holiday, Author and Strategist' : '';
    let currbottomText = this.bottomText[this.state.pageNum.toString()];
    let currBottomStyle = this.bottomStyle[this.state.pageNum.toString()];
    let currLetsSeeIconOpacity = this.state.letsSeeIconFade;
    //bottomStyle
    let timeAndActivity = this.state.pageNum == 0 ? '3min, 2 activities' : '';
     //let opaqueValue = this.state.pageNum == 0 ? 1 : 0;
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
        //1,  // Binds directly}
        this.state.topImagefadeOut,
    }
    
    
    
    
    return (
     
      <TouchableWithoutFeedback onPress={this._onPressed} style={styles.container}>
        
        
        <View style={styles.container} >
        
          <Animated.View style={topimageStyle}>
            <Image source={pic2} style={{width: currHeadIconSize, height: currHeadIconSize}} />
          </Animated.View>
          
           
          <Animated.View style={topimageStyle}>
            <Text style={headerstyle}  >
            {header2}
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
             {bodytext2}
            </Text>
          </Animated.View>
         
          
          
          <Animated.View                                    //  Special animatable View
              style={{
                //opacity: this.state.topImagefadeOut,
                right: this.state.bottomAuthorXPosition,           // Bind opacity to animated value
                
              }}
           >
            <Text style={currBottomStyle}>
             {currbottomText}
            </Text>
 		   </Animated.View>
          
          <Animated.View style={topimageStyle}>
            <Image source={letsSeePic} style={{width: letsCIconSize, height: letsCIconSize, opacity: currLetsSeeIconOpacity}} />
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
  welcome5: {
    fontSize: 12,
    textAlign: 'center',
    margin: 5,
	color: '#000000',
    fontWeight: 'bold'
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