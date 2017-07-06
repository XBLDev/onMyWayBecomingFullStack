'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
 
class BadInstagramCloneApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
        videoCapturing: false,
    };



  //    this.handleClick = this.handleClick.bind(this);
 }

  render() {
    let buttonText = this.state.videoCapturing == true? 'STOP' : 'CAPTURE';
    return (
      <View style={styles.container}>
        
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
            captureMode={Camera.constants.CaptureMode.video}
            captureTarget={Camera.constants.CaptureTarget.disk}
            >
              <Text style={styles.capture} onPress={this.takePicture.bind(this)}>{buttonText}</Text>
          </Camera>
       


      </View>
    );
  }
 
  takePicture() {
    if(this.state.videoCapturing == false)
    {
      this.setState({videoCapturing: true});
      const options = {};
      //options.location = ... 
      this.camera.capture({metadata: options})
        .then((data) => console.log(data))
        .catch(err => console.error(err));
    }
    else
    {
      this.setState({videoCapturing: false});
      this.camera.stopCapture();

    }
  }

  stopVideoRecording()
  {
    this.camera.stopCapture();
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

export default BadInstagramCloneApp;
