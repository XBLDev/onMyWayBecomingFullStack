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
  TouchableHighlight,
  View,
  Modal,
  Dimensions,
  Alert
} from 'react-native';

import RNVideoEditor from 'react-native-video-editor';
import Camera from 'react-native-camera';
import Video from 'react-native-video';

export default class videoEditingExample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videoUrls: [],
      mergedVideo: '',
      mergedVideoFile: 'NA',
      cameraModal: false,
      videoModal: false,
      isRecording: false,
      
    };

    this.mergeVideos = this.mergeVideos.bind(this);
  }

  mergeVideos() {
    if(this.state.videoUrls.length > 1) {
      RNVideoEditor.merge(
        this.state.videoUrls,
        function errorCallback(results) {
          // alert('Error: ' + results);
          // Alert.alert(
          //   'Merge Video',
          //   'Failed!',
          //   [
          //     // {text: 'Ask me later'},
          //     {text: 'Error: ' + results},
          //   ],
          //   { cancelable: true }
          // )              
        },
        (results, file) => {
          // alert('Success : ' + results + " " + file);
          // Alert.alert(
          //   'Merge Video',
          //   'Succeess!',
          //   [
          //     // {text: 'Ask me later'},
          //     {text: 'file name: '+file},
          //   ],
          //   { cancelable: true }
          // )    

          this.setState({mergedVideo: file, videoModal: true});
        }
      );
    } else {
      alert('Select at least 2 videos')
    }
  }

  takeVideo() {
    if(!this.state.isRecording) {
      this.camera.capture()
        .then((data) => {
          console.log(data)
          this.setState({videoUrls: [...this.state.videoUrls, data.path], cameraModal: false});
        })
        .catch(err => console.error(err));

      this.setState({isRecording: true});
    } else {
      this.camera.stopCapture();
      this.setState({isRecording: false});
    }
  }

  render() {

    let buttonText = this.state.isRecording == true? 'STOP' : 'CAPTURE';

    return (
      <View style={styles.container}>

        <TouchableHighlight style={styles.button} onPress={() => this.setState({cameraModal: true})}>
          <Text>Take Video</Text>
        </TouchableHighlight>

        {this.state.videoUrls.length > 1 ? (
          <TouchableHighlight style={styles.button} onPress={this.mergeVideos}>
            <Text>Merge {this.state.videoUrls.length} Videos</Text>
          </TouchableHighlight>
        ) : null}

        {this.state.videoUrls.length == 2 ? (
            <Text>Path1:  {this.state.videoUrls[0]} Path2: {this.state.videoUrls[1]}</Text>
            
        ) : null}

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.cameraModal}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            captureTarget={Camera.constants.CaptureTarget.disk}
            captureMode={Camera.constants.CaptureMode.video}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <Text style={styles.capture} onPress={this.takeVideo.bind(this)}>{buttonText}</Text>
          </Camera>

        </Modal>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.videoModal}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <Video source={{uri: this.state.mergedVideo}}   // Can be a URL or a local file.
           rate={1.0}                     // 0 is paused, 1 is normal.
           volume={1.0}                     // 0 is muted, 1 is normal.
           muted={false}                  // Mutes the audio entirely.
           paused={false}                 // Pauses playback entirely.
           resizeMode="cover"             // Fill the whole screen at aspect ratio.
           repeat={true}                  // Repeat forever.
           style={styles.preview} />
           <Text>File: {this.state.mergedVideo}</Text>
        </Modal>

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
  button: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    height: 40,
    backgroundColor: 'orange',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
});

AppRegistry.registerComponent('RNVideoEditExample', () => videoEditingExample);
// AppRegistry.registerComponent('RNVideoEditExample', () => BadInstagramCloneApp);
