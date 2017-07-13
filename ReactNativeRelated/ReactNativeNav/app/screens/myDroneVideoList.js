
// RNDEMO/app/index.js
// require('batchedUpdates');
import React, {Component, PropTypes } from 'react';
import  {
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
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  NativeModules,
} from 'react-native';

import { List, ListItem } from 'react-native-elements';
import Meteor, {createContainer, connectMeteor} from 'react-native-meteor';
import Video from 'react-native-video';
import RNVideoEditor from 'react-native-video-editor';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

var ScreenWidth = Dimensions.get('window').width; 
var ScreenHeight = Dimensions.get('window').height; 
var ImagePicker = NativeModules.ImageCropPicker;
const SERVER_URL = 'ws://reactjsmeteortestxbldev.meteorapp.com/websocket';


class myDroneVideoList extends Component {


  constructor(props) {
  super(props);
  this.state = {
      numberOfTasksState: 0,
      videoUrls: [],
      MergedVideoFilePath: '',
      
  };


//   this.handleAddItem = this.handleAddItem.bind(this);
  this.numberOfTasks = 0;
//    this.handleClick = this.handleClick.bind(this);
}

  componentWillMount() {
    // Meteor.connect(SERVER_URL);
    // Meteor.subscribe('itemsRN', function(){
    //     this.props.count = Meteor.collection('tasks').find().length;

    // });
    // this.props.count = Meteor.collection('tasks').find().length;
  }

  mergeVideos() {
    if(this.state.videoUrls.length > 1) {
      RNVideoEditor.merge(
        this.state.videoUrls,
        function errorCallback(results) {
          // alert('Error: ' + results);
          Alert.alert(
            'Merge Video',
            'Failed!',
            [
              // {text: 'Ask me later'},
              {text: 'Error: ' + results},
            ],
            { cancelable: true }
          )              
        },
        (results, file) => {
          // alert('Success : ' + results + " " + file);
          Alert.alert(
            'Merge Video',
            'Succeess! Path: '+file,
            [
              // {text: 'Ask me later'},
              {text: 'OK'},
            ],
            { cancelable: true }
          )    

        //   this.setState({MergedVideoFilePath: file, hasMergedVideo: true, showingMergedVideo: true, videoUrls: []});
          this.setState({MergedVideoFilePath: file});
          
        }
      );
    } else {
         Alert.alert(
            'Merge Video',
            'Need more than 2 videos!',
            [
              // {text: 'Ask me later'},
              {text: 'OK'},
            ],
            { cancelable: true }
          )
    }
  }



  render() {
    // let currentCount = this.props.count;
    // let currentCount2 = Meteor.collection('itemsRN').find().length;
    return (


      <View style={{flex:1, flexDirection:'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: ScreenWidth}}>  
                <ScrollView>
                    <List>
                    {this.props.droneURLlist.map((droneurl) => (
                        <View key={droneurl.videoURL} style={{justifyContent: 'center', alignItems: 'center', width: ScreenWidth, height: 200, borderColor: 'green', borderWidth: 5}}>
                            <View style={{width: ScreenWidth, height: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text>{droneurl.videoURL}</Text>
                            </View>
                            <View style={{width: ScreenWidth, height: 170, justifyContent: 'center', alignItems: 'center'}}>
                                <Video source={{uri: 'file:///storage/emulated/0/Movies/testTrimVideo.mp4'}}
                                    style={{position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0
                                    }}
                                    rate={1.0}
                                    paused={false}
                                    volume={1.0}// 0 is muted, 1 is normal.
                                    muted={false}
                                    resizeMode={'cover'}
                                    repeat={true} 
                                />
                                
                            </View>  
                        </View>

                    ))}
                    </List>
                </ScrollView>
            </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#c5c5c5',
  },
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
    fontWeight: 'bold',
  },


});


const storyCardStyles = StyleSheet.create({
  storyCardContainer: {
    
    justifyContent: 'center',//<-----justifyContent: how are children distributed?Available options are flex-start, center, flex-end, space-around, and space-between.
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
	//flexDirection: 'row'
	marginBottom: 10,
	marginTop: 10,
	marginLeft: 20,
	marginRight: 20,	
	width: Dimensions.get('window').width-20,
	height: Dimensions.get('window').height/7,
	borderRadius: 20,
  },  

  
});

const menuStyles= StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'center',//<-----justifyContent: how are children distributed?Available options are flex-start, center, flex-end, space-around, and space-between.
    alignItems: 'center',
    backgroundColor: '#329999',
    
	//flexDirection: 'row'
	//width: undefined,
    //height: undefined,
  },

  
});


myDroneVideoList.propTypes = {
  count: PropTypes.number.isRequired,
  
};

// export default myTasks;


export default createContainer(() => {
  Meteor.subscribe('droneurls');
//   console.log("Meteor subscribed")
  return {
    droneURLlist: Meteor.collection('dronevideourls').find(),      
    count: Meteor.collection('dronevideourls').find().length,
  };
}, myDroneVideoList);

