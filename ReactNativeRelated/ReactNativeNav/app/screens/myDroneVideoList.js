
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
  Alert,
} from 'react-native';

import { List, ListItem } from 'react-native-elements';
import Meteor, {createContainer, connectMeteor} from 'react-native-meteor';
import Video from 'react-native-video';
import RNVideoEditor from 'react-native-video-editor';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob'

var ScreenWidth = Dimensions.get('window').width; 
var ScreenHeight = Dimensions.get('window').height; 
var ImagePicker = NativeModules.ImageCropPicker;

const SERVER_URL = 'ws://reactjsmeteortestxbldev.meteorapp.com/websocket';


class myDroneVideoList extends Component {


  constructor(props) {
      super(props);
      this.state = {
          numberOfTasksState: 0,
          mobileVideoUrls: [],
          videoUrls: [],
          droneVideoUrlList: [],
          MergedVideoFilePath: '',
          selectedDroneVideoPath: '',
          downloadedFilePath: '',
          hasMergedVideo: false,
          image: null,
          images: null,
          droneVideoDownloaded: false,
      }


    //   this.handleAddItem = this.handleAddItem.bind(this);
      this.numberOfTasks = 0;
    //    this.handleClick = this.handleClick.bind(this);
      this.mergeVideos = this.mergeVideos.bind(this);
      this.mergeVideos2 = this.mergeVideos2.bind(this);
  }

  componentWillMount() {
    // Meteor.connect(SERVER_URL);
    // Meteor.subscribe('itemsRN', function(){
    //     this.props.count = Meteor.collection('tasks').find().length;

    // });
    // this.props.count = Meteor.collection('tasks').find().length;
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
          // this.setState({videoUrls: [...this.state.videoUrls, i.path]});
          this.setState({mobileVideoUrls: [...this.state.mobileVideoUrls, i.path]});
          
          // this.setState({numberOfSelectedVideos: this.state.numberOfSelectedVideos + 1});
          // this.setState({videoUrlIndex: [...this.state.videoUrlIndex, this.state.numberOfSelectedVideos]});
          // this.setState({videoWidthList: [...this.state.videoWidthList, i.width]});
          // this.setState({videoHeightList: [...this.state.videoHeightList, i.height]});
          // this.setState({videoDurationList: [...this.state.videoDurationList, i.length]});
        })
      });
    }).catch(e => alert(e));
                  
  }  

  onPressDownLoadFile()
  {
        let dirs = RNFetchBlob.fs.dirs;
        let downloadDir = dirs.DownloadDir;
        //dirs.CacheDir, dirs.DCIMDir, dirs.DownloadDir
        // Alert.alert(
        //     'Fetch Blob path',
        //     'Fetch Blob file path: '+downloadDir,
        //     [
        //         // {text: 'Ask me later'},
        //         {text: 'OK'},
        //     ],
        //     { cancelable: true }
        // );

        // now = new Date().toDateString();
        RNFetchBlob.config({
            // add this option that makes response data to be stored as a file, 
            // this is much more performant. 
            // file:///storage/emulated/0/Movies/testTrimVideo.mp4
            // fileCache : true,
            // appendExt : 'mp4',
            // path : '/storage/emulated/0/Movies/FixedDroneFileFPS30.mp4',
            path: downloadDir+'/FixedDroneFileFPS30.mp4'
            // path : 'file:///storage/emulated/0/Movies/',
            // path : 'file:///storage/emulated/0/Download/FixedDroneFileFPS30_2.mp4',
            // path : dirs.DocumentDir + '/FixedDroneFileFPS30_2.mp4'

            
        })
        .fetch('GET', 'https://s3-ap-southeast-2.amazonaws.com/dronevideoflyabove/FixedDroneFileFPS30_2.mp4', {
                        
            'Cache-Control' : 'no-store'

            //some headers .. 
        })
        .then((res) => {
            // the temp file path 
            // console.log('The file saved to ', res.path())
        //   Alert.alert(
        //       'File Download',
        //       'Downloaded file to: '+res.path(),
        //       [
        //           // {text: 'Ask me later'},
        //           {text: 'OK'},
        //       ],
        //       { cancelable: true }
        //   )
            // res.path();
            this.setState({filedownloaded: true});    
            this.setState({downloadedFilePath: res.path()});             
        })
  }


  mergeVideos() 
  {
    //maybe download the file first?
    // now = new Date().toDateString();
    if(this.state.selectedDroneVideoPath!='')
    {
      let dirs = RNFetchBlob.fs.dirs;
      let downloadDir = dirs.DownloadDir;   
      // selectedDroneVideoPathCopy = this.state.selectedDroneVideoPath;
      var properfilename = this.state.selectedDroneVideoPath.substring(this.state.selectedDroneVideoPath.lastIndexOf('/')+1,this.state.selectedDroneVideoPath.length);
      // Alert.alert(
      //       'Fetch Blob path',
      //       'Fetch Blob file path: '+downloadDir,
      //       [
      //           // {text: 'Ask me later'},
      //           {text: 'OK'},
      //       ],
      //       { cancelable: true }
      // );      

      RNFetchBlob.config({
              // file:///storage/emulated/0/Movies/testTrimVideo.mp4
              // fileCache : true,
              // path : 'file:///storage/emulated/0/Movies/downloadFromS3/'+this.state.selectedDroneVideoPath.substring(this.state.selectedDroneVideoPath.lastIndexOf('/')+1,this.state.selectedDroneVideoPath.length),
          path: downloadDir+'/'+properfilename

      })
      .fetch('GET',  this.state.selectedDroneVideoPath, {
            'Cache-Control' : 'no-store'

      })
      .then((res) => {
        // this.setState({selectedDroneVideoPath: res.path()});
        this.setState({downloadedFilePath: res.path()});             
        this.setState({droneVideoDownloaded: true});             
        
        // this.mergeVideos2; 
      })


    }


    //// start merge the user video with the (downloaded) drone video 
    // if(this.state.mobileVideoUrls.length >= 1 && this.state.selectedDroneVideoPath!='') {
    //   var mobileVideoUrlsCopy = this.state.mobileVideoUrls;
    //   var videoUrlsCopy = this.state.videoUrls;
    //   for(var i =0;i<this.state.mobileVideoUrls.length;i++)
    //   {
    //       videoUrlsCopy.push(mobileVideoUrlsCopy[i]);
    //   }
    //   videoUrlsCopy.push(this.state.selectedDroneVideoPath);
    //   this.setState({videoUrls: videoUrlsCopy});

    //   // for(var i =0;i<this.state.mobileVideoUrls.length;i++)
    //   // {
    //   //     // videoUrlsCopy.push(mobileVideoUrlsCopy[i]);
    //   //     this.setState({videoUrls:[...this.state.videoUrls, this.state.mobileVideoUrls[i]]});
    //   // }
    //   // this.setState({videoUrls:[...this.state.videoUrls, this.state.selectedDroneVideoPath]});

    //   Alert.alert(
    //     'merge video Url paths',
    //     'Succeess! Path 1: '+this.state.videoUrls[0] +' , path 2: '+this.state.videoUrls[1],
    //     [
    //       // {text: 'Ask me later'},
    //       {text: 'OK'},
    //     ],
    //     { cancelable: true }
    //   )          

    //   RNVideoEditor.merge(
    //     this.state.videoUrls,
    //     function errorCallback(results) {
    //       // alert('Error: ' + results);
    //       Alert.alert(
    //         'Merge Video',
    //         'Failed!',
    //         [
    //           // {text: 'Ask me later'},
    //           {text: 'Error: ' + results},
    //         ],
    //         { cancelable: true }
    //       )              
    //     },
    //     (results, file) => {
    //       // alert('Success : ' + results + " " + file);
    //       Alert.alert(
    //         'Merge Video',
    //         'Succeess! Path: '+file,
    //         [
    //           // {text: 'Ask me later'},
    //           {text: 'OK'},
    //         ],
    //         { cancelable: true }
    //       )    

    //     //   this.setState({MergedVideoFilePath: file, hasMergedVideo: true, showingMergedVideo: true, videoUrls: []});
    //       this.setState({MergedVideoFilePath: file, hasMergedVideo: true});
          
    //     }
    //   );
    //}
    //else {
    //      Alert.alert(
    //         'Merge Video',
    //         'Need more than 2 videos!',
    //         [
    //           // {text: 'Ask me later'},
    //           {text: 'OK'},
    //         ],
    //         { cancelable: true }
    //       )
    // }
  }

  mergeVideos2()
  {
    if(this.state.mobileVideoUrls.length >= 1 && this.state.downloadedFilePath!='') 
    {
      var mobileVideoUrlsCopy = this.state.mobileVideoUrls;
      var videoUrlsCopy = this.state.videoUrls;
      for(var i =0;i<this.state.mobileVideoUrls.length;i++)
      {
          videoUrlsCopy.push(mobileVideoUrlsCopy[i]);
      }
      videoUrlsCopy.push(this.state.downloadedFilePath);
      this.setState({videoUrls: videoUrlsCopy});

      // for(var i =0;i<this.state.mobileVideoUrls.length;i++)
      // {
      //     // videoUrlsCopy.push(mobileVideoUrlsCopy[i]);
      //     this.setState({videoUrls:[...this.state.videoUrls, this.state.mobileVideoUrls[i]]});
      // }
      // this.setState({videoUrls:[...this.state.videoUrls, this.state.selectedDroneVideoPath]});

      // Alert.alert(
      //   'merge video Url paths',
      //   'Succeess! Path 1: '+this.state.videoUrls[0] +' , path 2: '+this.state.videoUrls[1],
      //   [
      //     // {text: 'Ask me later'},
      //     {text: 'OK'},
      //   ],
      //   { cancelable: true }
      // )          

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
          this.setState({MergedVideoFilePath: file, hasMergedVideo: true});
          
        }
      );
    




    }
  
    else 
    {
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

  setSelectedDroneURL = (currentDroneVideoURL) => {
    //  var droneVideoUrlListCopy = this.state.droneVideoUrlList;
    //  var alreadyContains = false;
    //  for()
    //  {

    //  }

     if(this.state.selectedDroneVideoPath != currentDroneVideoURL)
     {
        this.setState({selectedDroneVideoPath: currentDroneVideoURL});
     }
     else
     {
        this.setState({selectedDroneVideoPath: ''});
     }

     //BELOW IS THE IMPLEMENTATION FOR CHOOSING MULTIPLE DRONE VIDEOS
    //  if(this.state.droneVideoUrlList.length == 0)
    //  {
    //     this.setState({droneVideoUrlList: [...this.state.droneVideoUrlList, currentDroneVideoURL]});
    //  }
    //  else
    //  {
    //    containsURL = false;
    //    for(var i=0;i<this.state.droneVideoUrlList.length;i++)
    //    {
    //       if(this.state.droneVideoUrlList[i] == currentDroneVideoURL)
    //       {
    //         containsURL = true;
    //         break;
    //       }
    //    }

    //    if(containsURL)
    //    {
    //         temp = this.state.droneVideoUrlList;
    //         this.setState({droneVideoUrlList: this.state.droneVideoUrlList.filter(function(video) { 
    //             return video !== temp[currentDroneVideoURL] 
    //         })});
    //    }
    //    else
    //    {
    //         this.setState({droneVideoUrlList: [...this.state.droneVideoUrlList, currentDroneVideoURL]});
    //    }
    //  }
  }



  DownloadVideo = (downLoadVideoURL) => {
    // now = new Date().toDateString();

  }  

  render() {
    // let currentCount = this.props.count;
    // let currentCount2 = Meteor.collection('itemsRN').find().length;
    return (


      <View style={{flex:1, flexDirection:'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
            <View style={{flex:0.85, justifyContent: 'center', alignItems: 'center', width: ScreenWidth}}>
                <View style={{justifyContent: 'center', alignItems: 'center', width: ScreenWidth, height: 50, backgroundColor: 'blue'}}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>Number of drone video count on S3: {this.props.countOfDroneVideo}, 
                            selected drone video path: {this.state.downloadedFilePath}

                      </Text>
                </View>    
                <ScrollView>
                    <List>
                    {this.props.droneURLlist.map((droneurl) => (
                        <View key={droneurl.videoURL} style={{justifyContent: 'center', alignItems: 'center', width: ScreenWidth, borderColor: 'black', borderWidth: 5}}>
                            <View style={{width: ScreenWidth, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.selectedDroneVideoPath == droneurl.videoURL? '#00F7FF':'white'}}>
                                <TouchableOpacity onPress={() => this.setSelectedDroneURL(droneurl.videoURL)} style={{width: ScreenWidth, height: 30, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: this.state.selectedDroneVideoPath == droneurl.videoURL? 'white':'black'}}>{droneurl.videoURL}</Text>
                                </TouchableOpacity>
                            </View>
                            {/*{this.state.selectedDroneVideoPath == droneurl.videoURL? 
                            <View style={{width: ScreenWidth, height: 200, justifyContent: 'center', alignItems: 'center'}}>
                                <Video source={{uri: droneurl.videoURL}}
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
                                
                            </View>: null}  */}
                        </View>

                    ))}
                    </List>
                </ScrollView>
                <View style={{justifyContent: 'center', alignItems: 'center', width: ScreenWidth, height: 30, backgroundColor: 'blue'}}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>Number of user video: {this.state.mobileVideoUrls.length}</Text>
                </View>
                <ScrollView>
                    <List>
                        {this.state.mobileVideoUrls.map((userVideoUrl) => (
                            <View key={userVideoUrl} style={{justifyContent: 'center', alignItems: 'center', width: ScreenWidth, borderColor: 'black', borderWidth: 5}}>
                                <View style={{width: ScreenWidth, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                                        <Text style={{color: 'black'}}>{userVideoUrl}</Text>                                    
                                </View>
                            </View>
                        ))}
                    </List>
                </ScrollView>

            </View>





            <View style={{flex: 0.15, flexDirection:'row', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', width: ScreenWidth}}> 
                <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: ScreenWidth/3}}>
                      <TouchableOpacity onPress={this.pickMultiple.bind(this)}>
                          <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>                      
                                <Text>Add video</Text>
                                <Icon name="file-video-o" size={20} color="#000" />
                          </View>                                                
                      </TouchableOpacity>
                </View>
                
                <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: ScreenWidth/3}}>
                      <TouchableOpacity onPress={this.mergeVideos}>
                          <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Text>Merge(download)</Text>
                                <Icon name="plus-circle" size={20} color="#000" />
                          </View>
                      </TouchableOpacity>                    
                </View>

                <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: ScreenWidth/3}}>
                      <TouchableOpacity onPress={this.mergeVideos2}>
                          <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Text>merge2</Text>
                                <Icon name="plus-circle" size={20} color="#000" />
                          </View>
                      </TouchableOpacity>                    
                </View>
                {/*<View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: ScreenWidth/3}}>
                      <TouchableOpacity onPress={this.mergeVideos}>
                          <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Text>downloadDroneVideo</Text>
                                <Icon name="plus-circle" size={20} color="#000" />
                          </View>
                      </TouchableOpacity>                    
                </View>                                                                  */}
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
  countOfDroneVideo: PropTypes.number.isRequired,
  
};

// export default myTasks;


export default createContainer(() => {
  Meteor.subscribe('droneurls');
//   console.log("Meteor subscribed")
  return {
    droneURLlist: Meteor.collection('dronevideourls').find(),      
    countOfDroneVideo: Meteor.collection('dronevideourls').find().length,
  };
}, myDroneVideoList);

