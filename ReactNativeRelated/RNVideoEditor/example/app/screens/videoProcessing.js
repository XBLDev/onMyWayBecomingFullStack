import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import { VideoPlayer, Trimmer } from 'react-native-video-processing';

class videoProcessing extends Component {

    constructor() {
        super();
        this.trimVideo = this.trimVideo.bind(this);
    }
    
    trimVideo() {
        const options = {
            startTime: 1,
            endTime: 13,//15 and 10 both ended up having 19 seconds
            // quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
            // saveToCameraRoll: true, // default is false // iOS only
            // saveWithCurrentDate: true, // default is false // iOS only
            //1 -> 5: 9 seconds
            //1 -> 6: 9 seconds
            //1 -> 7: 9 seconds
            //1 -> 8: 9 seconds
            //1 -> 9: 9 seconds
            //1 -> 10: 19 seconds
            //1 -> 11: 19 seconds
            //1 -> 12, with video shot by mobile phone: 12 seconds
            //1 -> 13, with video shot by mobile phone: 13 seconds
        };
        this.videoPlayerRef.trim(options)
            .then(
                (newSource) => 
                // console.log(newSource)
                Alert.alert(
                    'Trimmed Video',
                    newSource,
                    [
                        // {text: 'Ask me later'},
                        {text: 'OK'},
                    ],
                    { cancelable: true }
                )    

            )
            .catch(console.warn);
    }

    compressVideo() {
        const options = {
            width: 720,
            height: 1280,
            bitrateMultiplier: 3, // iOS only
            saveToCameraRoll: true, // default is false, iOS only
            saveWithCurrentDate: true, // default is false, iOS only
            minimumBitrate: 300000, // iOS only
            removeAudio: true, // default is false
        };
        this.videoPlayerRef.compress(options)
            .then((newSource) => console.log(newSource))
            .catch(console.warn);
    }

    getPreviewImageForSecond(second) {
        const maximumSize = { width: 640, height: 1024 }; // default is { width: 1080, height: 1080 } iOS only
        this.videoPlayerRef.getPreviewForSecond(second, maximumSize) // maximumSize is iOS only
        .then((base64String) => console.log('This is BASE64 of image', base64String))
        .catch(console.warn);
    }

    getVideoInfo() {
        this.videoPlayerRef.getVideoInfo()
        .then((info) => console.log(info))
        .catch(console.warn);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 300}}>
                    {/*<VideoPlayer
                        ref={ref => this.videoPlayerRef = ref}
                        startTime={1}  // seconds
                        endTime={4}   // seconds
                        play={true}     // default false
                        replay={true}   // should player play video again if it's ended
                        rotate={true}   // use this prop to rotate video if it captured in landscape mode iOS only
                        source={'file:///storage/emulated/0/Movies/RealRawDroneFPS30_2_27.mp4'}
                        style={{ height: 300, width: 400}}
                        resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
                        onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second
                    />*/}
                    <VideoPlayer
                        ref={ref => this.videoPlayerRef = ref}
                        play={true}     // default false
                        replay={true}   // should player play video again if it's ended
                        rotate={true}   // use this prop to rotate video if it captured in landscape mode iOS only
                        source={'file:///storage/emulated/0/Movies/testTrimVideo.mp4'}
                        style={{ height: 300, width: 400}}
                        resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
                        onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second
                    />                    
                </View>
                {/*<Trimmer
                    source={'file:///storage/emulated/0/Movies/RealRawDroneFPS30_2_27.mp4'}
                    height={100}
                    width={300}
                    onChange={(e) => console.log(e.startTime, e.endTime)}
                />*/}
                <View style={{ height: 50, width: 400}}>
                        <TouchableOpacity style={styles.button} onPress={this.trimVideo}>
                            <Text style={styles.text}>Trim this video</Text>
                        </TouchableOpacity>      
                </View>
            </View>
        );
    }
}

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

export default videoProcessing;
