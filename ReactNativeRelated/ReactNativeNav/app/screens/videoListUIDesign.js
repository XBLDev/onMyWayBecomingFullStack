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



const testIcon = (<Icon name="rocket" size={30} color="#900" />);

var ScreenWidth = Dimensions.get('window').width; 
var ScreenHeight = Dimensions.get('window').height; 
var ImagePicker = NativeModules.ImageCropPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
    alignItems: 'center'    
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
  },
  selectedVideoBorder:{
    // borderRadius:10, 
    borderWidth:5, 
    borderColor: '#00FF00'
  },
  unSelectedVideoBorder:{
    borderWidth:5, 
    borderColor: '#A9A9A9'
  }
});

export default class videoListUIDesign extends Component {

  constructor() {
    super();
    this.state = {
      allVideoPlaying: true,
      allVideoPaused: false,
      selectedVideoPaused: true,
      selectedVideoMuted: false,
      selectedVideoFullScreen: false,
      selectedVideoDuration: 0,
      allVideoRate: 1.0,
      selectedVideoCurrentTime: 0,
      image: null,
      images: null,
      videoUrls: [],
      videoUrlIndex: [],
      videoWidthList:[],
      videoHeightList:[],
      videoDurationList:[],
      hasMergedVideo: false,
      showingMergedVideo: false,
      MergedVideoFilePath: '',
      showVideoInList: [],
      selectedVideoToShowIndexList: [],
      numberOfSelectedVideos: 0,
      selectedVideoToShow: '',
    };

    this.mergeVideos = this.mergeVideos.bind(this);
    this.flipShowingMergedVideo = this.flipShowingMergedVideo.bind(this);
    this.selectedVideoOnProgress = this.selectedVideoOnProgress.bind(this);
    this.selectedVideoOnLoad = this.selectedVideoOnLoad.bind(this);
    this.selectedVideoOnEnd = this.selectedVideoOnEnd.bind(this);
    // this.onPressVideoItem = this.onPressVideoItem.bind(this);

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
    // this.cleanupImages();

    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false
    }).then(images => {
      this.setState({
        image: null,
        images: images.map(i => {
          // console.log('received image', i);
          this.setState({videoUrls: [...this.state.videoUrls, i.path]});
          this.setState({numberOfSelectedVideos: this.state.numberOfSelectedVideos + 1});
          this.setState({videoUrlIndex: [...this.state.videoUrlIndex, this.state.numberOfSelectedVideos]});
          this.setState({videoWidthList: [...this.state.videoWidthList, i.width]});
          this.setState({videoHeightList: [...this.state.videoHeightList, i.height]});
          this.setState({videoDurationList: [...this.state.videoDurationList, i.length]});
          
                    
          // alreadyExist = false;
          // if(this.state.videoUrls.length == 0)
          // {
          //   this.setState({videoUrls: [...this.state.videoUrls, i.path]});
            
          // }
          // else
          // {
            
          //   for (var i = 0; i < this.state.videoUrls.length; i++) {
          //       if(this.state.videoUrls[i] == i.path)
          //       {
          //         alreadyExist = true;
          //         break;
          //       }
          //   }
          //   if(alreadyExist == false)
          //   {
          //       let videoUrlsCopy = this.state.videoUrls;
          //       this.setState({videoUrls: []});            
          //       videoUrlsCopy.push(i.path);
          //       this.setState({videoUrls: videoUrlsCopy});
          //   }
          // }
          // // this.setState({showVideoInList: [...this.state.showVideoInList, false]});
          // if(alreadyExist == false)
          // {
          //     this.setState({numberOfSelectedVideos: this.state.numberOfSelectedVideos + 1});
          // }
          // if(this.state.videoUrlIndex.length == 0)
          // {
          //     this.setState({videoUrlIndex: [...this.state.videoUrlIndex, this.state.numberOfSelectedVideos]});
          // }
          // else
          // {
          //   if(alreadyExist == false)
          //   {            
          //     let videoUrlIndexCopy = this.state.videoUrlIndex;
          //     this.setState({videoUrlIndex: []});                        
          //     videoUrlIndexCopy.push(this.state.numberOfSelectedVideos);
          //     this.setState({videoUrlIndex: videoUrlIndexCopy});
          //   }            
          // }

          // return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        })
      });
    }).catch(e => alert(e));
    //  this.cleanupImages();
    // this.forceUpdate();
    // this.setState({allVideoPaused: false});
    // this.setState({allVideoPlaying: true});
    // this.setState({allVideoRate: 1.0});
                  
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

//   onPressVideoItem(video)
//   {
//     Alert.alert(
//     'Pressed on video item',
//     'Pressed '+video.uri +"!",
//     [
//         // {text: 'Ask me later'},
//         {text: 'OK'},
//     ],
//     { cancelable: true }
//     )     
//   }

   onPressVideoItem = (video) => {
    // Alert.alert(
    //     'Pressed on video item',
    //     'Pressed '+video.uri +"!",
    //     [
    //         // {text: 'Ask me later'},
    //         {text: 'OK'},
    //     ],
    //     { cancelable: true }
    // );
    if(this.state.selectedVideoToShow == '')
    {
      this.setState({selectedVideoToShow: video.uri});
    }
    else
    {
      if(video.uri == this.state.selectedVideoToShow)
      {
        this.setState({selectedVideoToShow: ''});
      }
      else
      {
        this.setState({selectedVideoToShow: video.uri});
       
      }      
    }

  };

   onPressVideoItem2 = (videoURL) => {
    // Alert.alert(
    //     'Pressed on video item',
    //     'Pressed '+video.uri +"!",
    //     [
    //         // {text: 'Ask me later'},
    //         {text: 'OK'},
    //     ],
    //     { cancelable: true }
    // );
    if(this.state.selectedVideoToShow == '')
    {
      this.setState({selectedVideoToShow: videoURL});
      this.setState({selectedVideoPaused: false});
      this.setState({selectedVideoMuted: false});
      this.setState({selectedVideoCurrentTime: 0});
      
    }
    else
    {
      if(videoURL == this.state.selectedVideoToShow)
      {
        this.setState({selectedVideoToShow: ''});
        this.setState({selectedVideoPaused: true});
        this.setState({selectedVideoMuted: true});
        this.setState({selectedVideoCurrentTime: 0});
     
      }
      else
      {
        this.setState({selectedVideoToShow: videoURL});
        this.setState({selectedVideoPaused: false});
        this.setState({selectedVideoMuted: false});
        this.setState({selectedVideoCurrentTime: 0});
                       
      }      
    }

  };


  onPressVideoItem3 = (videoURLIndex) => {
      var currentVideoIsSelectedToShow = false;
      if(this.state.selectedVideoToShowIndexList.length !=0)
      {
          for (var i = 0; i < this.state.selectedVideoToShowIndexList.length; i++) {
              var temp = selectedVideoToShowIndexList[i];
              if(temp == videoURLIndex)
              {
                  currentVideoIsSelectedToShow = true;
                  break;
              }
          }
      }


  };


   onPressMoveUp = (currentVideoIndex) => {
      if(currentVideoIndex-1 != 0)
      {
          currentVideoUrl = this.state.videoUrls[currentVideoIndex-1];
          previousVideoUrl = this.state.videoUrls[currentVideoIndex-2];
          // this.setState({videoUrls: videoURL});
          let videoUrlsCopy = this.state.videoUrls;
          videoUrlsCopy[currentVideoIndex-2] = currentVideoUrl;
          videoUrlsCopy[currentVideoIndex-1] = previousVideoUrl;
          this.setState({videoUrls: videoUrlsCopy});
      }
      else
      {
          Alert.alert(
              'Failed moving video up',
              'Cannot move the first video up!',
              [
                  // {text: 'Ask me later'},
                  {text: 'OK'},
              ],
              { cancelable: true }
          ) 
      }

  };

  onPressMoveDown = (currentVideoIndex) => {
      if(currentVideoIndex != this.state.numberOfSelectedVideos)
      {
        currentVideoUrl = this.state.videoUrls[currentVideoIndex-1];
        nextVideoUrl = this.state.videoUrls[currentVideoIndex];
        let videoUrlsCopy = this.state.videoUrls;
        videoUrlsCopy[currentVideoIndex-1] = nextVideoUrl;
        videoUrlsCopy[currentVideoIndex] = currentVideoUrl;    
        this.setState({videoUrls: videoUrlsCopy});
      }
      else
      {
          Alert.alert(
              'Failed moving video down',
              'Cannot move the last video down!',
              [
                  // {text: 'Ask me later'},
                  {text: 'OK'},
              ],
              { cancelable: true }
          )         
      }
     
  }

  onPressRemove = (currentVideoIndex) => {
        Alert.alert(
              'Remove video',
              'Are you sure you want to remove this video?',
              [
                  {text: 'Yes', onPress: () => 
                    {
                      // VideoUrlsCopy = this.state.videoUrls;
                      // VideoUrlsCopy.splice(currentVideoIndex-1, 1);
                      // videoURLIndexCopy = this.state.videoURLIndex;
                      // videoURLIndexCopy.splice(videoURLIndexCopy.length-1, 1);

                      // this.setState({numberOfSelectedVideos: this.state.numberOfSelectedVideos - 1});
                      // this.setState({videoUrls: VideoUrlsCopy});
                      // this.setState({videoURLIndex: videoURLIndexCopy});
                      this.removeVideo(currentVideoIndex);
                    }
                  },
                  {text: 'Cancel'},
              ],
              { cancelable: true }
          )
     
  }

  removeVideo(currentVideoIndex) {

    if(this.state.videoUrls[currentVideoIndex-1] == this.state.selectedVideoToShow)
    {
      this.setState({selectedVideoToShow: ''});
    }
    
    var temp = this.state.numberOfSelectedVideos;
    this.setState({videoUrlIndex: this.state.videoUrlIndex.filter(function(videoIndex) { 
        return videoIndex !== temp
    })})

    this.setState({numberOfSelectedVideos: this.state.numberOfSelectedVideos - 1});
    temp = this.state.videoUrls;
    this.setState({videoUrls: this.state.videoUrls.filter(function(video) { 
        return video !== temp[currentVideoIndex-1] 
    })})

  }

  renderSelectedVideo(currentVideoIndex)
  {
      var currentVideoIsSelectedToShow = false;
      if(this.state.selectedVideoToShowIndexList.length !=0)
      {
          for (var i = 0; i < this.state.selectedVideoToShowIndexList.length; i++) {
              var temp = selectedVideoToShowIndexList[i];
              if(temp == currentVideoIndex)
              {
                  currentVideoIsSelectedToShow = true;
                  break;
              }
          }
      }

      return currentVideoIsSelectedToShow;
  }

  onPressRemoveAll = () => {
        Alert.alert(
              'Remove all videos',
              'Are you sure you want to remove all videos in the list?',
              [
                  {text: 'Yes', onPress: () => 
                    {
                      // VideoUrlsCopy = this.state.videoUrls;
                      // VideoUrlsCopy.splice(currentVideoIndex-1, 1);
                      // videoURLIndexCopy = this.state.videoURLIndex;
                      // videoURLIndexCopy.splice(videoURLIndexCopy.length-1, 1);

                      // this.setState({numberOfSelectedVideos: this.state.numberOfSelectedVideos - 1});
                      // this.setState({videoUrls: VideoUrlsCopy});
                      // this.setState({videoURLIndex: videoURLIndexCopy});
                      // this.removeVideo(currentVideoIndex);
                    }
                  },
                  {text: 'Cancel'},
              ],
              { cancelable: true }
          )
     
  }

  onPressNew = () => {
        Alert.alert(
              'Make new list of videos',
              'Are you sure you want to start a new list? This will remove all the videos in your current list!',
              [
                  {text: 'Yes', onPress: () => 
                    {
                      // VideoUrlsCopy = this.state.videoUrls;
                      // VideoUrlsCopy.splice(currentVideoIndex-1, 1);
                      // videoURLIndexCopy = this.state.videoURLIndex;
                      // videoURLIndexCopy.splice(videoURLIndexCopy.length-1, 1);

                      // this.setState({numberOfSelectedVideos: this.state.numberOfSelectedVideos - 1});
                      // this.setState({videoUrls: VideoUrlsCopy});
                      // this.setState({videoURLIndex: videoURLIndexCopy});
                      // this.removeVideo(currentVideoIndex);
                    }
                  },
                  {text: 'Cancel'},
              ],
              { cancelable: true }
          )
     
  }

  onPressRecordVideo = () => {
       this.props.navigation.navigate('videoRecording');

     
  }

  onPressSelectedVideoPause = () => {
       if(this.state.selectedVideoPaused == false)
       {
          this.setState({selectedVideoPaused: true});
       }
       else
       {
          this.setState({selectedVideoPaused: false});
         
       }
     
  }

  onPressSelectedVideoMute = () => {
       if(this.state.selectedVideoMuted == false)
       {
          this.setState({selectedVideoMuted: true});
       }
       else
       {
          this.setState({selectedVideoMuted: false});
         
       }
     
  }  

  selectedVideoOnProgress()
  {
    if(this.state.selectedVideoPaused == false)
    {
      this.setState({selectedVideoCurrentTime: this.state.selectedVideoCurrentTime + 1});
    }
  }

  selectedVideoOnLoad()
  {
      this.setState({selectedVideoCurrentTime: 0});
      
  }
  selectedVideoOnEnd()
  {
      this.setState({selectedVideoCurrentTime: 0});
      this.setState({selectedVideoPaused: true});

  }

  _onLoad( data = {} ) {
        // let state = this.state;
        this.setState({selectedVideoDuration: data.duration});
        // this.state.selectedVideoDuration = data.duration;
        // state.loading = false;
        // this.setState( state );

        // if ( state.showControls ) {
        //     this.setControlTimeout();
        // }
  }  

    _onProgress( data = {} ) {

        // state.currentTime = data.currentTime;
        this.setState({selectedVideoCurrentTime: data.currentTime});


    }

  render() {

    // let flipShowingMergedVideoButtonText = this.state.showingMergedVideo == true? 'hideMergedVideo':'showMergedVideo';
    let whitespacechar = ' ';
    return (<View style={{flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
      
        {/*{this.state.image ? this.renderAsset(this.state.image) : null}*/}
        {/*{this.state.images ? this.state.images.map(i => <View key={i.uri}><Text>{i.uri}</Text>{this.renderAsset(i)}</View>) : null}*/}
        
        <View style={{flex: 0.85,  justifyContent: 'center', alignItems: 'center', width: ScreenWidth}}>
             {this.state.videoUrlIndex.length != 0 ? 
                  <ScrollView style={{backgroundColor: this.state.videoUrlIndex.length != 0 ? 'black':'red'}}>
                        <List style={{backgroundColor:'black'}}>
                              {this.state.videoUrlIndex.map((i) => 
                              (
                                  <View key={this.state.videoUrls[i-1]} style={{width: ScreenWidth, flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <View style={{height: 150, flexDirection:'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#d3d3d3', marginTop: 3, marginBottom: 3, marginLeft: 5, marginRight: 5}}>
                                          
                                              <View style={{width: (ScreenWidth-10)/2, height: 150, backgroundColor: '#d3d3d3',justifyContent: 'center', alignItems: 'center',}}>
                                                    {/*<View style={{flex:1, margin: 2, backgroundColor: 'black'}}>*/}
                                                          {/*<Image style={{ width: (ScreenWidth-10)/2, height: 150, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}} source={{uri : this.state.videoUrls[i-1]}} />*/}
                                                          
                                                          <Image style={{ width: (ScreenWidth-10)/2, height: 150, justifyContent: 'center', alignItems: 'center'}} source={{uri : this.state.videoUrls[i-1]}}>
                                                                  <TouchableOpacity style={{width: (ScreenWidth-10)/2, height: 150, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.onPressVideoItem2(this.state.videoUrls[i-1])}>
                                                                      <View style={{backgroundColor:'rgba(0,0,0,0)'}}>
                                                                            <Icon name={this.state.selectedVideoToShow != this.state.videoUrls[i-1]? "play-circle-o": "stop-circle"} size={60} color="#ffffff" />  
                                                                      </View>      
                                                                  </TouchableOpacity>  
                                                          </Image>
                                                          
                                                          {/*<Text>video thumbnail</Text>*/}
                                                    {/*</View>*/}

                                              </View>
                                              <View style={{width: (ScreenWidth-10)/2-2, height: 150, backgroundColor: '#d3d3d3',justifyContent: 'center', alignItems: 'center',marginLeft:1, marginRight:1}}>
                                                    {/*<Text>video info</Text>*/}
                                                    <View style={{width: (ScreenWidth-10)/2-2, height: 150/2, justifyContent: 'center', alignItems: 'center'}}>
                                                          <View style={{flexDirection:'row', width: (ScreenWidth-10)/2-2, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                                                                <Icon name="file-sound-o" size={15} color="#000000" />
                                                                <Text style={{fontSize: 15, fontWeight: 'bold'}}>{whitespacechar}{this.state.videoUrls[i-1].substring(this.state.videoUrls[i-1].lastIndexOf('/')+1,this.state.videoUrls[i-1].length).substring(0,10)}...</Text>
                                                          </View>
                                                          <View style={{flexDirection:'row', width: (ScreenWidth-10)/2-2, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                                                                <Icon name="arrows-alt" size={15} color="#000000" />
                                                                <Text style={{fontSize: 15, fontWeight: 'bold'}} allowFontScaling={true}>{whitespacechar}{this.state.videoWidthList[i-1]} * {this.state.videoHeightList[i-1]}</Text>
                                                          </View>
                                                    </View>

                                                    <View style={{width: (ScreenWidth-10)/2-2, height: 150/2, justifyContent: 'center', alignItems: 'center'}}>
                                                          <View style={{flexDirection:'row', width: (ScreenWidth-10)/2-2, height: 150/2, justifyContent: 'center', alignItems: 'center'}}>
                                                                
                                                                <TouchableOpacity style={{width: ((ScreenWidth-10)/2-2)/4, height: 150/2, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.onPressMoveUp(i)}>
                                                                    <Icon name="arrow-circle-up" size={30} color="#000000" />
                                                                </TouchableOpacity>                                                          

                                                                <TouchableOpacity style={{width: ((ScreenWidth-10)/2-2)/4, height: 150/2, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.onPressMoveDown(i)}>
                                                                    <Icon name="arrow-circle-down" size={30} color="#000000" />
                                                                </TouchableOpacity>

                                                                <TouchableOpacity style={{width: ((ScreenWidth-10)/2-2)/4, height: 150/2, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.onPressMoveDown(i)}>
                                                                    {/*<Icon name="arrow-circle-down" size={30} color="#000000" />*/}
                                                                </TouchableOpacity>                                                          

                                                                <TouchableOpacity style={{width: ((ScreenWidth-10)/2-2)/4, height: 150/2, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.onPressRemove(i)}>
                                                                    <Icon name="times-circle" size={30} color="#000000" />
                                                                </TouchableOpacity>                                                             
                                                                {/*<Icon name="arrow-circle-down" size={30} color="#000000" />
                                                                <Icon name="times-circle" size={30} color="#000000" />*/}
                                                          </View>                                                    
                                                    </View>
                                                    {/*<View style={{flexDirection:'row', width: (ScreenWidth-10)/2-2, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                                                          <Icon name="clock-o" size={15} color="#ffffff" />
                                                          <Text style={{fontSize: 15}} allowFontScaling={true}>{this.state.videoDurationList[i-1]}</Text>
                                                    </View>                                                                                                   */}
                                              </View>
                                        </View>
                                        {this.state.selectedVideoToShow == this.state.videoUrls[i-1]?
                                        <View style={{width :ScreenWidth, height: 360, flexDirection:'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>

                                              <View style={{width: ScreenWidth-10, height: 300, flexDirection:'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', marginTop: 2, marginBottom: 2, marginLeft: 5, marginRight: 5}}>
                                                    <Video source={{uri: this.state.videoUrls[i-1]}}
                                                        style={{position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            bottom: 0,
                                                            right: 0
                                                        }}
                                                        rate={1}
                                                        paused={this.state.selectedVideoPaused}
                                                        volume={10}// 0 is muted, 1 is normal.
                                                        muted={this.state.selectedVideoMuted}
                                                        resizeMode={'cover'}
                                                        onProgress={this._onProgress.bind(this)}    // Callback when video loads
                                                        onError={e => console.log(e)}
                                                        onLoad={this._onLoad.bind(this)}
                                                        onEnd={this.selectedVideoOnEnd}
                                                        repeat={false} 
                                                    >
                                                        <View style={{width: ScreenWidth-10, height: 150, backgroundColor: 'rgb(0,0,0,0)',flexDirection:'column', justifyContent: 'center'}}>
                                                              <Icon name={this.state.selectedVideoPaused == false? "pause-circle" : "play"} size={40} color="#ffffff" />

                                                        </View>
                                                        <View style={{width: ScreenWidth-10, height: 150, backgroundColor: 'rgb(0,0,0,0)',flexDirection:'column', justifyContent: 'center'}}>
                                                              <Icon name={this.state.selectedVideoPaused == false? "pause-circle" : "play"} size={40} color="#ffffff" />

                                                        </View>

                                                    </Video>                                              
                                              </View>
                                              <View style={{width: ScreenWidth-10, height: 60, flexDirection:'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', marginTop: 3, marginBottom: 3, marginLeft: 5, marginRight: 5}}>
                                                    <View style={{width: (ScreenWidth-10)/3, height: 60, backgroundColor: "#ffffff"}}>
                                                          <TouchableOpacity style={{width: (ScreenWidth-10)/3, height: 60, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.onPressSelectedVideoPause()}>
                                                                <Icon name={this.state.selectedVideoPaused == false? "pause-circle" : "play"} size={40} color="#000000" />
                                                          </TouchableOpacity>
                                                    </View>
                                                    {/*<View style={{width: (ScreenWidth-10)/4, height: 60, backgroundColor: "#ffffff"}}>
                                                          <TouchableOpacity style={{width: (ScreenWidth-10)/4, height: 50, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.onPressSelectedVideoMute()}>
                                                                <Icon name={this.state.selectedVideoMuted == false? "volume-off" : "volume-up"} size={40} color="#000000" />
                                                          </TouchableOpacity>
                                                    </View>*/}
                                                    <View style={{width: (ScreenWidth-10)/3, height: 60, backgroundColor: "#ffffff"}}>
                                                          <View style={{width: (ScreenWidth-10)/3, height: 60, justifyContent: 'center', alignItems: 'center'}}>
                                                                {/*<Icon name={this.state.selectedVideoMuted == false? "volume-off" : "volumn-down"} size={40} color="#000000" />*/}
                                                                {/*<Text style={{fontSize: 20, fontWeight: 'bold'}}>00:{Math.floor(this.state.selectedVideoCurrentTime/4)}</Text>*/}
                                                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{Math.floor(this.state.selectedVideoCurrentTime)}/{Math.floor(this.state.selectedVideoDuration)}</Text>
                                                                
                                                          </View>
                                                    </View>
                                                    <View style={{width: (ScreenWidth-10)/3, height: 60, backgroundColor: "#ffffff"}}>
                                                          <TouchableOpacity style={{width: (ScreenWidth-10)/3, height: 60, justifyContent: 'center', alignItems: 'center'}}>
                                                                <Icon name="expand" size={40} color="#000000" />
                                                          </TouchableOpacity>
                                                    </View>                                                                                                                                                                                                                          
                                              </View>
                                              {/*<View style={{width: ScreenWidth-10, height: 10, flexDirection:'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', marginTop: 3, marginBottom: 3, marginLeft: 5, marginRight: 5}}>

                                              </View>                                                                                                */}
                                        </View>
                                        : 
                                        null  

                                        }
                                  </View>
                                    
                              )
                              )
                              }
                                   
                        </List>      
                  </ScrollView>
                    
                  : 
                  <View style={{flex:1, justifyContent: 'center', alignItems: 'center', width: ScreenWidth}}>

                        <View style={{justifyContent: 'center', alignItems: 'center', width: ScreenWidth * 0.8}}>
                              <Icon name="th-list" size={100} color="#ffffff" />

                              <Text style={{fontSize: 20, color: 'white'}}>Add at least 2 videos here to merge into a new video</Text>
                        </View>
                  </View>
             } 
        </View>

        <View style={{flex: 0.15, flexDirection:'row', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', 
                    width: ScreenWidth}}>
              <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: ScreenWidth/4}}>
                    <TouchableOpacity onPress={this.pickMultiple.bind(this)}>
                        <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>                      
                              <Text>Add video</Text>
                              <Icon name="file-video-o" size={20} color="#000" />
                        </View>                                                
                    </TouchableOpacity>
              </View>
              <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: ScreenWidth/4}}>
                    <TouchableOpacity onPress={() => this.onPressRemoveAll()}>
                        <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                              <Text>Clear all</Text>
                              <Icon name="remove" size={20} color="#000" />
                        </View>                        
                    </TouchableOpacity>                    
              </View>
              <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: ScreenWidth/4}}>
                    <TouchableOpacity>
                        <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                              <Text>Merge</Text>
                              <Icon name="plus-circle" size={20} color="#000" />
                        </View>
                    </TouchableOpacity>                    
              </View>
              <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: ScreenWidth/4}}>
                    <TouchableOpacity onPress={() => this.onPressRecordVideo()}>
                        <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                              <Text>Record Video</Text>
                              <Icon name="mobile-phone" size={20} color="#000" />
                        </View>
                    </TouchableOpacity>                    
              </View>               
              {/*<View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: ScreenWidth/4}}>
                    <TouchableOpacity onPress={() => this.onPressNew()}>
                        <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                              <Text>New</Text>
                              <Icon name="list-ul" size={20} color="#000" />
                        </View>
                    </TouchableOpacity>                    
              </View>                              */}
        </View>  

        {/*{this.state.videoUrlIndex.length != 0 ? 
        <ScrollView style={{flex: 0.9, height: 500, maxHeight: 0.5}}>
            <List>
                {this.state.videoUrlIndex.map((i) => (

                    <View key={this.state.videoUrls[i-1]} style={{borderRadius:1, borderWidth:5, borderColor: '#00FF00'}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex: 0.4, height: 400, maxHeight: 0.5}}>
                                    <Image style={{ position: 'absolute', height: 400, maxHeight: 0.5, top: 0, left: 0, bottom: 0, right: 0}} source={{uri : this.state.videoUrls[i-1]}} />
                            </View>  
                            <View style={{flex: 0.6, height: 400, maxHeight: 0.5}}>
                                <TouchableOpacity onPress={() => this.onPressVideoItem2(this.state.videoUrls[i-1])}>
                                    <Icon name="play-circle" size={100} color="#000" />
                                </TouchableOpacity>
                            </View>  
                        </View>
                        {this.state.selectedVideoToShow == this.state.videoUrls[i-1]?
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex: 0.3, height:100}}>
                                    <TouchableOpacity style={{backgroundColor: 'white',margin: 1, alignItems: 'center'}} onPress={() => this.onPressMoveUp(i)}>
                                        <Icon name="arrow-up" size={100} color="#000" />

                                    </TouchableOpacity>                              
                                </View>
                                <View style={{flex: 0.3, height:100}}>
                                    <TouchableOpacity style={{backgroundColor: 'white',margin: 1, alignItems: 'center'}} onPress={() => this.onPressMoveDown(i)}>
                                        <Icon name="arrow-down" size={100} color="#000" />                                        
                                    </TouchableOpacity>                              
                                </View>
                                <View style={{flex: 0.3, height:100}}>
                                    <TouchableOpacity style={{backgroundColor: 'white',margin: 1, alignItems: 'center'}} onPress={() => this.onPressRemove(i)}>
                                        <Icon name="remove" size={100} color="#000" />                                                                                
                                    </TouchableOpacity>                              
                                </View>
                            </View> 
                            <View style={{height: 300}}>
                                <Video source={{uri: this.state.videoUrls[i-1]}}
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
                        </View>:null}                       
                    </View>
                ))}
            </List>
        </ScrollView>: null}*/}
        
        {/*// Use width variable in style declaration
        <TextInput style={{ width: width * .8 }} />*/}


        {/*{this.state.videoUrlIndex.length != 0 ? 
        <ScrollView style={{width: 300, height: 500}}>
            <List>
                {this.state.videoUrlIndex.map((i) => (
                    <View key={this.state.videoUrls[i-1]}>
                        <TouchableOpacity onPress={() => this.onPressVideoItem2(this.state.videoUrls[i-1])}>
                            <ListItem
                            
                            title={this.state.videoUrls[i-1]}
                            subtitle={this.state.videoUrls[i-1]}
                                                        
                            />                                            
                        </TouchableOpacity>
                          
                        {this.state.selectedVideoToShow == this.state.videoUrls[i-1]?
                        <View style={{width: 300}}>
                            <View style={{width: 300, height:50}}>
                                <TouchableOpacity style={styles.button} onPress={() => this.onPressMoveUp(i)}>
                                    <Text style={styles.text}>Move this video Up</Text>
                                </TouchableOpacity>                              
                            </View>
                            <View style={{width: 300, height:50}}>
                                <TouchableOpacity style={styles.button} onPress={() => this.onPressMoveDown(i)}>
                                    <Text style={styles.text}>Move this video down</Text>
                                </TouchableOpacity>                              
                            </View> 
                            <View style={{height: 300, width: 300}}>
                                <Video source={{uri: this.state.videoUrls[i-1]}}
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
                        </View>:null}                       
                    </View>
                ))}
            </List>
        </ScrollView>: null}*/}


        {/*{this.state.videoUrls.length != 0 ? 
        <ScrollView style={{width: 300}}>
            <List>
                {this.state.videoUrls.map((i) => (
                    <View key={i}>
                        <TouchableOpacity onPress={() => this.onPressVideoItem2(i)}>
                            <ListItem
                            
                            title={i}
                            subtitle={i}
                            rightIcon={{ name: 'cached' }}
                            
                            />                                            
                        </TouchableOpacity>
                          
                        {this.state.selectedVideoToShow == i?
                        <View style={{width: 300}}>
                            <View style={{width: 300, height:50}}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.text}>Move this video Up</Text>
                                </TouchableOpacity>                              
                            </View>
                            <View style={{width: 300, height:50}}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.text}>Move this video down</Text>
                                </TouchableOpacity>                              
                            </View> 
                            <View style={{height: 300, width: 300}}>
                                <Video source={{uri: i}}
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
                        </View>:null}                       
                    </View>
                ))}
            </List>
        </ScrollView>: null}*/}

        {/*{this.state.images ? 
        <ScrollView style={{width: 300}}>
            <List>
                {this.state.images.map((i) => (
                    <View key={i.uri}>
                        <ListItem
                        
                        title={i.uri}
                        subtitle={i.uri}
                        onPress={() => this.onPressVideoItem(i)}                    
                        />
                        {this.state.selectedVideoToShow == i.uri? <View style={{height: 300, width: 300}}>
                            <Video source={{uri: i.uri}}
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
                        </View>:null}                       
                    </View>
                ))}
            </List>
        </ScrollView>: null}*/}

      {/*<ScrollView>
        {this.state.videoUrls.length > 0 ? this.state.videoUrls.map(i => <View key={i}><Text>{i}</Text></View>) : null}

      </ScrollView>*/}

      {/*{this.state.videoUrls.length > 1 ? (
          <TouchableOpacity style={styles.button} onPress={this.mergeVideos}>
            <Text style={styles.text}>Merge {this.state.videoUrls.length} Videos</Text>
          </TouchableOpacity>
        ) : null}*/}

      {/*{this.state.MergedVideoFilePath == '' ? null: this.state.showingMergedVideo == false ? null:(
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
        ) }*/}

      {/*{this.state.hasMergedVideo == true ? (
          <TouchableOpacity style={styles.button} onPress={this.flipShowingMergedVideo}>
            <Text style={styles.text}>{flipShowingMergedVideoButtonText}</Text>
          </TouchableOpacity>
        ) : null}*/}


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
      {/*<TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
        <Text style={styles.text}>Select More Videos to merge</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.cleanupImages.bind(this)} style={styles.button}>
        <Text style={styles.text}>Cleanup All Images</Text>
      </TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={this.cleanupSingleImage.bind(this)} style={styles.button}>
        <Text style={styles.text}>Cleanup Single Image</Text>
      </TouchableOpacity>*/}
    </View>);
  }
}
