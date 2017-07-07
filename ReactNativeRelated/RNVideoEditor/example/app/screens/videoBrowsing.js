import React, {Component} from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert,
  Image, TouchableOpacity, NativeModules, Dimensions
} from 'react-native';

import Video from 'react-native-video';
import RNVideoEditor from 'react-native-video-editor';
import Camera from 'react-native-camera';

var ImagePicker = NativeModules.ImageCropPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,    
  },

  button2: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    height: 40,
    backgroundColor: 'orange',
  },  
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default class videoBrowsing extends Component {

  constructor() {
    super();
    this.state = {
      image: null,
      images: null,
      videoUrls: [],
      hasMergedVideo: false,
      showingMergedVideo: false,
      MergedVideoFilePath: '',
    };

    this.mergeVideos = this.mergeVideos.bind(this);
    this.flipShowingMergedVideo = this.flipShowingMergedVideo.bind(this);
    this.cleanupImages = this.cleanupImages.bind(this);
  }

  componentWillMount(){
      this.cleanupImages();
  }

  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }

  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true
    }).then(image => {
      console.log('received base64 image');
      this.setState({
        image: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }

  cleanupImages() {
    ImagePicker.clean().then(() => {
      console.log('removed tmp images from tmp directory');
    }).catch(e => {
      alert(e);
    });
  }

  cleanupSingleImage() {
    let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
    console.log('will cleanup image', image);

    ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
      console.log(`removed tmp image ${image.uri} from tmp directory`);
    }).catch(e => {
      alert(e);
    })
  }

  cropLast() {
    if (!this.state.image) {
      return Alert.alert('No image', 'Before open cropping only, please select image');
    }

    ImagePicker.openCropper({
      path: this.state.image.uri,
      width: 200,
      height: 200
    }).then(image => {
      console.log('received cropped image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  pickSingle(cropit, circular=false) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false
    }).then(images => {
      this.setState({
        image: null,
        images: images.map(i => {
          console.log('received image', i);
          this.setState({videoUrls: [...this.state.videoUrls, i.path]});

          return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        })
      });
    }).catch(e => alert(e));
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  /*renderVideo(video) {
    return (<View style={{height: 300, width: 300}}>
      <Video source={{uri: video.uri, type: video.mime}}
         style={{position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}
         rate={1}
         paused={false}
         volume={1}
         muted={false}
         resizeMode={'cover'}
         onError={e => console.log(e)}
         onLoad={load => console.log(load)}
         repeat={true} />
     </View>);
  }*/

  renderVideoThumbNail(video) {
    return (<View style={{height: 300, width: 300}}>
      <Video source={{uri: video.uri, type: video.mime}}
         style={{position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}
         rate={1}
         paused={false}
         volume={1}
         muted={false}
         resizeMode={'cover'}
         onError={e => console.log(e)}
         onLoad={load => console.log(load)}
         repeat={true} />
     </View>);
  }  


  renderVideo(video) {
    return (<View style={{height: 300, width: 300}}>
      <Video source={{uri: video.uri, type: video.mime}}
         style={{position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}
         rate={1}
         paused={false}
         volume={1}
         muted={false}
         resizeMode={'cover'}
         onError={e => console.log(e)}
         onLoad={load => console.log(load)}
         repeat={true} />
     </View>);
  }  

  renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

  mergeVideos() {

    // Alert.alert(
    //     'Merge Video',
    //     'Succeess!',
    //     [
    //         // {text: 'Ask me later'},
    //         {text: 'OK'},
    //     ],
    //     { cancelable: true }
    // )    
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
            'Succeess!',
            [
              // {text: 'Ask me later'},
              {text: 'OK'},
            ],
            { cancelable: true }
          )    

          this.setState({MergedVideoFilePath: file, hasMergedVideo: true, showingMergedVideo: true, videoUrls: []});
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
    //   alert('Select at least 2 videos')
    }
  }

  flipShowingMergedVideo()
  {
    if(this.state.showingMergedVideo == true)
    {
        this.setState({showingMergedVideo: false});
    }
    else
    {
         this.setState({showingMergedVideo: true});       
    }
  }

  render() {

    let flipShowingMergedVideoButtonText = this.state.showingMergedVideo == true? 'hideMergedVideo':'showMergedVideo';

    return (<View style={styles.container}>
      <ScrollView style={{height: 100, width: 300}}>
        {this.state.image ? this.renderAsset(this.state.image) : null}
        {this.state.images ? this.state.images.map(i => <View key={i.uri}><Text>{i.uri}</Text>{this.renderAsset(i)}</View>) : null}
      </ScrollView>

      {/*<ScrollView>
        {this.state.videoUrls.length > 0 ? this.state.videoUrls.map(i => <View key={i}><Text>{i}</Text></View>) : null}

      </ScrollView>*/}

      {this.state.videoUrls.length > 1 ? (
          <TouchableOpacity style={styles.button} onPress={this.mergeVideos}>
            <Text style={styles.text}>Merge {this.state.videoUrls.length} Videos</Text>
          </TouchableOpacity>
        ) : null}

      {this.state.MergedVideoFilePath == '' ? null: this.state.showingMergedVideo == false ? null:(
            <View style={{height: 300, width: 300}}>
                <Text style={styles.text}>Merged Video:</Text>
                <Video source={{uri: this.state.MergedVideoFilePath}}
                    style={{position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0
                    }}
                    rate={1}
                    paused={false}
                    volume={1}
                    muted={false}
                    resizeMode={'cover'}
                    onError={e => console.log(e)}
                    onLoad={load => console.log(load)}
                    repeat={true} />
                </View>
        ) }

      {this.state.hasMergedVideo == true ? (
          <TouchableOpacity style={styles.button} onPress={this.flipShowingMergedVideo}>
            <Text style={styles.text}>{flipShowingMergedVideoButtonText}</Text>
          </TouchableOpacity>
        ) : null}


        {/*{this.state.videoUrls.length == 2 ? (
            <Text>Path1:  {this.state.videoUrls[0]} Path2: {this.state.videoUrls[1]} </Text>
            
        ) : null}*/}

      {/*<TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
        <Text style={styles.text}>Select Single With Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Camera With Cropping</Text>
      </TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => this.pickSingle(false)} style={styles.button}>
        <Text style={styles.text}>Select Single</Text>
      </TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => this.cropLast()} style={styles.button}>
        <Text style={styles.text}>Crop Last Selected Image</Text>
      </TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => this.pickSingleBase64(false)} style={styles.button}>
        <Text style={styles.text}>Select Single Returning Base64</Text>
      </TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => this.pickSingle(true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Cropping</Text>
      </TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => this.pickSingle(true, true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Circular Cropping</Text>
      </TouchableOpacity>*/}
      <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
        <Text style={styles.text}>Select Videos to merge</Text>
      </TouchableOpacity>
      {/*<TouchableOpacity onPress={this.cleanupImages.bind(this)} style={styles.button}>
        <Text style={styles.text}>Cleanup All Images</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.cleanupSingleImage.bind(this)} style={styles.button}>
        <Text style={styles.text}>Cleanup Single Image</Text>
      </TouchableOpacity>*/}
    </View>);
  }
}
