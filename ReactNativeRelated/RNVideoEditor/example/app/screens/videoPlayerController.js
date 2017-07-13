import React, {Component} from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert,
  Image, TouchableOpacity, NativeModules, Dimensions
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import Video from 'react-native-video';
import RNVideoEditor from 'react-native-video-editor';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-controls';

class videoPlayerController extends Component {


  render() {
    return (
      <View style={styles.container}>
        
        <VideoPlayer
            source={{uri:'file:///storage/emulated/0/Movies/testTrimVideo.mp4'}}

            // react-native-video options 
            playInBackground={ false }   // play audio when entering background 
            resizeMode={ 'contain' }     // 'contain' or 'cover' should be used. 
            paused={ false }             // stop playback entirely 
            repeat={ false }             // Repeats at end of duration 
            muted={ false }              // Mutes the audio entirely. 
            title={ '' }                 // Video title, if null title area is hidden 
            volume={ 1 }                 // 0 is muted, 1 is normal. 
            rate={ 1 }                   // 0 is paused, 1 is normal. 
        
            // settings 
            controlTimeout={ 15000 }     // hide controls after ms of inactivity. 
            navigator={ this.props.navigator }      // prop from React Native <Navigator> component 
            seekColor={ '#FFF' }         // fill/handle colour of the seekbar 
            videoStyle={ {} }            // Style appended to <Video> component 
            style={ {} }                 // Style appended to <View> container 
        
            // event callbacks 
            onError={ () => {} }         // Fired when an error is encountered on load 
            onBack={ () => {} }          // Function fired when back button is pressed. 
            onEnd={ () => {} }           // Fired when the video is complete. 
        
        />            
       


      </View>
    );
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
});

export default videoPlayerController;
