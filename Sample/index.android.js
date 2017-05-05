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
  ListView,
  Dimensions,
  Number,
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
      
    
    this.tmp_array = [
     { headline: "HL1", text: "NEWS1", send_at: "test date" },
     { headline: "HL2", text: "NEWS2", send_at: "test date" },     
    ];
    
    this.storyTitles = [
     { imgURL: "HL1", title: "story telling" },
     { imgURL: "HL2", title: "physics" },     
    ];
    
    this.bodyText = {
     '0':'Get Customers'+"\n"+'Interested by Telling'+"\n"+'a Great Story',
     '1':'How can I use my own experience to help my business?'+'\n'+'Whats the personal approach to story telling?'+'\n'+' whats the higher purpose approach?',
     '2':'Imagine that theres a business onwer Michael, '+'\n'+'who makes hats for cats, donating part of his money to animal rescues, '+'\n'+'\n'+'WHATS A BETTER STARTING POINT FOR MACHAELS STORY?', 
     '3':'',// MONEY MORE MONEY'+'\n'+'I DO THIS FOR THE CATS
     '4':'Thats right, It shares what inspires Michael to do beyond money, instead of just talking about money',
    }
    
    this.TitleText = {
     '0':'CONTENT',
     '1':'WE WIIL ANSWER:',
     '2':'',
     '3':'WHICH ONE IS BETTER?',
     '4':'RESULT', 
    }
    
    this.quizChoice1Text = {
     '0':'',
     '1':'',
     '2':'',
     '3':'Cats for hats sells fashion accessories for cats online. Our hats come in 6 styles',
     '4':'', 
      
    }
    
    this.quizChoice2Text = {
     '0':'',
     '1':'',
     '2':'',
     '3':'I started cats for hats to help local shelters. Each hat sold saves life of a cat',
     '4':'', 
     
    }
    
    
    this.bottomText = {
     '0':'Ryan Holiday, Author and Strategist',
     '1':'',
     '2':'Lets see', 
     '3':'', 
     '4':'Tap and Go back to page 1',
     
    }

    this.bottomStyle = {
     '0':styles.welcome3,
     '1':styles.welcome3,
     '2':styles.welcome5, 
     '3':styles.welcome5,
     '4':styles.welcome3, 
    }    
        
    this.letsSeeIcon = {
     '0':'',
     '1':'',
     '2':{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Arrow_icon.svg/1024px-Arrow_icon.svg.png'},
     '3':{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Arrow_icon.svg/1024px-Arrow_icon.svg.png'}, 
     '4':{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Arrow_icon.svg/1024px-Arrow_icon.svg.png'}, 

    }
    
    this.letsSeeIconSize = {
     '0':0,
     '1':0,
     '2':30, 
     '3':0, 
     '4':0,  
    }
    
    this.headIconSizeX = {
     '0':50,
     '1':50,
     '2':Dimensions.get('window').width, 
     '3':0, 
     '4':0, 
    }
    this.headIconSizeY = {
     '0':50,
     '1':50,
     '2':100, 
     '3':0, 
     '4':0, 
    }
    
    this.backGroundColor = {
     '0':'#FFFFFF',
     '1':'#FFFFFF',
     '2':'#FFFFFF', 
     '3':'rgba(0,0,0,0)',
     '4':'rgba(0,0,0,0)', 
    }
    
    this.letsSeeIconScale = {
     '0':0,
     '1':0,
     '2':0, 
     '3':1,
     '4':0, 
    }

    this.choicesMargin = {
     '0':0,
     '1':0,
     '2':0, 
     '3':5,
     '4':5, 
    }
    //this._onPressed
    //this.bttomAuthorXPosition = 0;
      //this.state.stored['ok']
      //styles.welcome3
     
     //this.props._value = 0;
    this.props.pageNumber = 0;
    this.totalPageNum = 6;
    
    
    //this.topIconWidth = new Animated.Value(50);
    this.topIconHeight = new Animated.Value(50);
    this.springValue = new Animated.Value(0.1);
    this.backgroudTop = new Animated.Value(0);
    
    this.state = {
      
     stored: {
     '0':{uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1033-200.png'},
     '1':{uri: 'https://icons.iconarchive.com/icons/rokey/smooth/128/apple-icon.png'},
     '2':{uri: 'http://bcdn.sadanduseless.com/wp-content/uploads/2014/04/cat-hat1.jpg'},
     '3':{uri: 'http://bcdn.sadanduseless.com/wp-content/uploads/2014/04/cat-hat1.jpg'},
     '4':{uri: 'http://bcdn.sadanduseless.com/wp-content/uploads/2014/04/cat-hat1.jpg'}, 
     }, 
     //https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Arrow_icon.svg/1024px-Arrow_icon.svg.png
      
      topIconWidth : new Animated.Value(50),
      bottomAuthorXPosition: new Animated.Value(1200),
     bodyTextYPosition: new Animated.Value(150),
     bodyFade: new Animated.Value(0),
     pageNumber: new Animated.Value(0),
     topImagefadeIn: new Animated.Value(0),                // Initial value for opacity: 0
      topImagefadeOut: new Animated.Value(0),           // Initial value for opacity: 0     
      
      letsSeeIconFade: new Animated.Value(0),
      onStartMenu: new Animated.Value(0),
      firstPage: true, 
      pageNum: 0,
      alpha :  new Animated.Value(0), 
      AuthorfadeAnim: new Animated.Value(0),           // Initial value for opacity: 0
      //imageFadeOutProgress : 1,
      backgroundTop : new Animated.Value(0),
      choiceOneScale: new Animated.Value(0),
      choiceTwoScale: new Animated.Value(0),
      //choicesMargin: new Animated.Value(0),
      
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
    this.WholeNews = this.WholeNews.bind(this); 
    this.GetStartMenuItems = this.GetStartMenuItems.bind(this); 
    
    
    this.topLevelOnPressed = {
     '0':this._onPressed,
     '1':this._onPressed,
     '2':this._onPressed, 
     '3':'',
     '4':this._onPressed,
    }
    
    this.secondChoiceOnPressed ={
     '0':'',
     '1':'',
     '2':'', 
     '3':this._onPressed,
     '4':'',      
      
    }
    
    
  }
  
  changePageNum()
  {
    this.setState({ pageNum: this.state.pageNum + 1 });
    
    
  }
  
  WholeNews() {
  return tmp_array.map(function(news, i){
    return(
      <View key={i}>
        <Text>{news.headline}</Text>
        <View>
          <Text>{news.text}</Text>
        </View>
      </View>
    );
  });
 }
  //story.imgURL
  GetStartMenuItems() {
  return storyTitles.map(function(story, i){
    return(
      <View key={i}>
        <Image source={story.imgURL}/>
        <View>
          <Text>{story.title}</Text>
        </View>
      </View>
    );
  });
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
  
    Animated.timing(
      this.state.letsSeeIconFade, 
      {
        toValue: 1,
        duration: 100,
        delay: 3500,
      }
    ),     
  
  
]),
    
       Animated.spring(
    this.springValue,
      {
        //duration: 50,
        toValue: 1,
        friction: 1,
      }
    ),  
    
  ]).start(event => {
    if (event.finished) {
    }
  });  
}
  
else if(this.state.pageNum.toString()=='3')//FROM PAGE3 TO PAGE4
{
  //this.state.bottomAuthorXPosition
  Animated.sequence([
    
    Animated.timing(
      this.state.backgroundTop, {
      toValue: 0,
      duration: 1000,
      //delay: 1000
    }),
    
    
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
    
    Animated.timing(
      this.state.choiceOneScale, {
      toValue: 1,
      duration: 1000,
      //delay: 1000
    }),    
    
    Animated.timing(
      this.state.choiceTwoScale, {
      toValue: 1,
      duration: 1000,
      //delay: 1000
    }),    
    
    
  ]).start(event => {
    if (event.finished) {
    }
  });  
}
  
else if(this.state.pageNum.toString()=='4')//FROM PAGE4 TO PAGE5
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
    
    Animated.sequence([
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
        toValue: 0,                                    //Animate to opacity: 1, or fully opaque
      }
    ),      
      
      
      ]),
      
       
      
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

if(this.state.pageNum.toString()=='2'){//FROM PAGE3 TO PAGE4, PAGE3 ANIMATION
    Animated.sequence([
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
      this.state.bodyFade,                        // The animated value to drive
      {
        duration: 500,
        toValue: 0,                                   //Animate to opacity: 1, or fully opaque
      }
    ), 
    Animated.timing(
      this.state.letsSeeIconFade, 
      {
        toValue: 0,
        duration: 1000,
        //delay: 3500,
      }
    ),       
    Animated.timing(                                // Animate over time
      this.state.topImagefadeOut,                      // The animated value to drive
      {
        duration: 500,
        toValue: 0,                                  //Animate to opacity: 1, or fully opaque
      }
    ),   
      
    //Animated.spring(position, {
    //  toValue: {x: 0, y: 0}    // return to start
   // }),
      ]),
    Animated.timing(                                // Animate over time
      this.state.backgroundTop,                      // The animated value to drive
      {
        //duration: 500,
        toValue: 1000,                                  //Animate to opacity: 1, or fully opaque
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
    
 if(this.state.pageNum.toString()=='3'){//FROM PAGE4 TO PAGE5, PAGE4 ANIMATION
    Animated.sequence([
    Animated.parallel([
    
      
    Animated.timing(                                // Animate over time
      this.state.bodyFade,                        // The animated value to drive
      {
        duration: 500,
        toValue: 0,                                    //Animate to opacity: 1, or fully opaque
      }
    ), 
      
    Animated.spring(
      this.state.choiceOneScale, {
      toValue: 0,
      duration: 1000,
      //delay: 1000
    }),    
    Animated.spring(
      this.state.choiceTwoScale, {
      toValue: 0,
      duration: 1000,
      //delay: 1000
    }),
    Animated.timing(                                // Animate over time
      this.state.topImagefadeOut,                      // The animated value to drive
      {
        duration: 1000,
        toValue: 0,                                   //Animate to opacity: 1, or fully opaque
      }
    ),
      
    //Animated.spring(position, {
    //  toValue: {x: 0, y: 0}    // return to start
   // }),
      ]),
       
      
      
      
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
    
 if(this.state.pageNum.toString()=='4'){//FROM PAGE5 BACK TO PAGE1, PAGE5 ANIMATION
    Animated.timing(
    this.springValue,
      {
        //duration: 50,
        toValue: 0,
        //friction: 1,
      }
    ).start(
      event => {
    if (event.finished) {
      this.setState({ pageNum: 0 });//, this.cycleAnimation()
      }
    }    
    
    ),   
   
   
   this.setState({ pageNum: 0 });//, this.cycleAnimation()
   
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

    
    let pic2 = this.state.stored[this.state.pageNum.toString()];
	  
    let letsSeePic = this.letsSeeIcon[this.state.pageNum.toString()];

    
    let bodystyle = this.state.pageNum == 0 ? styles.instructions:styles.instructions2;
    //letsSeeIconSize
    let letsCIconSize = this.letsSeeIconSize[this.state.pageNum.toString()];
    let headerstyle = this.state.pageNum == 0 ? styles.welcome2:styles.welcome4;
    let header2 = this.TitleText[this.state.pageNum.toString()];
    //headIconSize
    let currHeadIconSizeX = this.headIconSizeX[this.state.pageNum.toString()];
    let currHeadIconSizeY = this.headIconSizeY[this.state.pageNum.toString()];

    let bodytext2 = this.bodyText[this.state.pageNum.toString()];
    
    let author = this.state.pageNum == 0 ? 'Ryan Holiday, Author and Strategist' : '';
    let currbottomText = this.bottomText[this.state.pageNum.toString()];
    
    let currChoice1Text = this.quizChoice1Text[this.state.pageNum.toString()];
    let currChoice2Text = this.quizChoice2Text[this.state.pageNum.toString()];

    
    let currBottomStyle = this.bottomStyle[this.state.pageNum.toString()];
    let currBackGroundColor = this.backGroundColor[this.state.pageNum.toString()];
    //let currTopIconWidth = this.topIconWidth;
    
    let currLetsSeeIconOpacity = this.state.letsSeeIconFade;
    //bottomStyle
    let timeAndActivity = this.state.pageNum == 0 ? '3min, 2 activities' : '';
      //let opaqueValue = this.state.pageNum == 0 ? 1 : 0;
    let currentAnimationView = this.state.firstPage? FadeInView : PositionMoveView;
    let paragraph2Text = '';
    //topLevelOnPressed
    let currTopLevelOnPressed = this.topLevelOnPressed[this.state.pageNum.toString()];

    let topimageStyle = this.state.pageNum == 0?
    {
        opacity:   
        this.state.topImagefadeOut,
        //width: this.state.topIconWidth
    }
    :
    {
        opacity: 
        //1,  // Binds directly}
        this.state.topImagefadeOut,
    }
    
    let letsSeeIconStyle = 
    {
        opacity:   
        this.state.letsSeeIconFade,
      

    };
    //https://ak5.picdn.net/shutterstock/videos/880294/thumb/1.jpg
    //{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent',}
       // flex: 1,
    // justifyContent: 'center',//<-----justifyContent: how are children distributed?Available options are flex-start, center, flex-end, space-around, and space-between.
     // alignItems: 'center',
    
    
  //      width: Dimensions.get('window').width, //undefined Dimensions.get('window').width,
  //  height: Dimensions.get('window').height,//undefined Dimensions.get('window').height,
 //   backgroundColor:'#transparent',
 //   justifyContent: 'center',
  //   alignItems: 'center',
  //   resizeMode: 'cover',
   //  top: 0,
    
    
    
    return (

      
      <Animated.View style={{flex:1, top: this.state.backgroundTop,}}>
        
       <Image
        source={{uri: 'https://ak5.picdn.net/shutterstock/videos/880294/thumb/1.jpg'}}
        style={
        {
         flex: 1,
         width: null, 
         height: null, 
         //backgroundColor:'#transparent',
         //justifyContent: 'center',
         alignItems: 'center',
         resizeMode: 'cover',
         top: 0,
          alignSelf: 'stretch',
        }
        }>

      <TouchableWithoutFeedback onPress={currTopLevelOnPressed}  >
        

      
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: currBackGroundColor,}} >
        
          
          <Animated.View style={{opacity: this.state.topImagefadeOut}}>
            <Image source={pic2} style={{width: currHeadIconSizeX, height: currHeadIconSizeY}} />
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
         
          <View>
          <TouchableWithoutFeedback onPress={this.secondChoiceOnPressed[this.state.pageNum.toString()]}>
          <Animated.View                             
            style=
            {{
                marginBottom: this.choicesMargin[this.state.pageNum.toString()],
                marginTop: 0,	
                backgroundColor:'#ffffff',
                width: Dimensions.get('window').width - 10,
                borderRadius: 5,
                opacity: this.state.bodyFade,
                transform: [{scale: this.state.choiceOneScale}],
                //top: this.state.bodyTextYPosition, 
            }}
           >
            <Text style={bodystyle}>
             {currChoice1Text}
            </Text>
          </Animated.View>
          </TouchableWithoutFeedback>
          </View>
          
          
          <View>
          <TouchableWithoutFeedback onPress={this.secondChoiceOnPressed[this.state.pageNum.toString()]}>
          <Animated.View                             
            style=
            {{
                marginBottom: this.choicesMargin[this.state.pageNum.toString()],
                marginTop: 0,
                backgroundColor:'#ffffff',
                width: Dimensions.get('window').width - 10,
                borderRadius: 5,
                opacity: this.state.bodyFade,
                transform: [{scale: this.state.choiceTwoScale}],
                //top: this.state.bodyTextYPosition, 
            }}
           >
            <Text style={bodystyle}>
             {currChoice2Text}
            </Text>
          </Animated.View>
          </TouchableWithoutFeedback>
          </View>
          
          
          
          
          
          <Animated.View                                     //  Special animatable View
              style={{
                //opacity: this.state.topImagefadeOut,
                right: this.state.bottomAuthorXPosition,           // Bind opacity to animated value
                
              }}
           >
            <Text style={currBottomStyle}>
             {currbottomText}
            </Text>
 		   </Animated.View>
          
          <Animated.View style={{ opacity: this.state.letsSeeIconFade, transform: [{scale: this.springValue}], }}>
            <Image source={letsSeePic} 
             style={
              { 
                width: letsCIconSize, 
                height: letsCIconSize, 
                //transform: [{scale: this.springValue}], 
                //opacity: this.state.letsSeeIconFade, 
              }
              } 
             />
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
      
      </Image>  
        
        </Animated.View>
    
    );
  }
}



class MyMenu extends Component {
  
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['story 1', 'story 2']),
      
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
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
    backgroundColor: '#FFFFFF',
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

const BackGroundImagestyles = StyleSheet.create({
  container: {
    //flex: 1,
    width: Dimensions.get('window').width, //undefined Dimensions.get('window').width,
    height: Dimensions.get('window').height,//undefined Dimensions.get('window').height,
    backgroundColor:'#transparent',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    top: 0,
    //right: 0,
  },
});

AppRegistry.registerComponent('aSample', () => aSample);
