
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
  PermissionsAndroid,
} from 'react-native';

import { List, ListItem } from 'react-native-elements';
import Meteor, {createContainer, connectMeteor} from 'react-native-meteor';
import Video from 'react-native-video';
import RNVideoEditor from 'react-native-video-editor';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';

var ScreenWidth = Dimensions.get('window').width; 
var ScreenHeight = Dimensions.get('window').height; 
const PictureDir = RNFetchBlob.fs.dirs.PictureDir;


class RNFetchBlobTest extends Component {

  constructor(props)
  {
    super(props);
    // this.data = {};
    this.state = {
        filedownloaded: false,
        downloadedFilePath: ''
    }
    this.onPressDownLoadFile = this.onPressDownLoadFile.bind(this);
    this.onPressDownloadFileBase64 = this.onPressDownloadFileBase64.bind(this);
  }

  onPressDownloadFileBase64()
  {
        // send http request in a new thread (using native code) 
        RNFetchBlob.fetch('GET', 'https://s3-ap-southeast-2.amazonaws.com/dronevideoflyabove/FixedUserFileFPS30_2.mp4', {
            // Authorization : 'Bearer access-token...',
            // more headers  .. 
        })
        // when response status code is 200 
        .then((res) => {
            // the conversion is done in native code 
            let base64Str = res.base64()
            // the following conversions are done in js, it's SYNC 
            let text = res.text()
            let json = res.json()

            Alert.alert(
                'File Download',
                'Downloaded file BASE64 text: '+text,
                [
                    // {text: 'Ask me later'},
                    {text: 'OK'},
                ],
                { cancelable: true }
            )            
        
        })
        // Status code is not 200 
        .catch((errorMessage, statusCode) => {
            // error handling 
        })
  }

  onPressDownLoadFile()
  {
        let dirs = RNFetchBlob.fs.dirs;
        let downloadDir = dirs.DownloadDir;
        //dirs.CacheDir, dirs.DCIMDir, dirs.DownloadDir
        Alert.alert(
            'Fetch Blob path',
            'Fetch Blob file path: '+downloadDir,
            [
                // {text: 'Ask me later'},
                {text: 'OK'},
            ],
            { cancelable: true }
        );

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

    render() {
    return (
        <View style={{flex:1, backgroundColor:'white', justifyContent: 'center', alignItems: 'center'}}>

            <TouchableOpacity onPress={this.onPressDownLoadFile} style={{width: ScreenWidth, height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
                <Text style={{color: 'green', fontSize: 30}}>DOWNLOAD DRONE VIDEO FROM AMAZON S3!</Text>
            </TouchableOpacity>

            {/*<TouchableOpacity onPress={this.onPressDownloadFileBase64} style={{width: ScreenWidth, height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
                <Text style={{color: 'green', fontSize: 30}}>DOWNLOAD USER VIDEO FROM AMAZON S3!</Text>
            </TouchableOpacity>*/}
















            <Text style={{color: 'red', fontSize: 20}}>downloaded file is in: {this.state.downloadedFilePath}</Text>    
        </View>
    );
  }


}

export default RNFetchBlobTest;