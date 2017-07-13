import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';

class videoFunctions extends Component {

  handleVideoBrowsingPress = () => {
    this.props.navigation.navigate('videoBrowsing');
  };


  handleVideoMergingPress = () => {
    this.props.navigation.navigate('videoMerging');
  };

  handleVideoUIDesignPress = () => {
    this.props.navigation.navigate('videoUIDesign');
  };  

  handleVideoProcessingPress = () => {
    this.props.navigation.navigate('videoProcess');
  };  

  handleVideoPlayerControllerPress = () => {
    this.props.navigation.navigate('videoPlayerController');
  };    

   render() {
    return (
      <ScrollView>

        <List>
          <ListItem
            title="Video Browsing"
            onPress={() => this.handleVideoBrowsingPress()}
          />            


          <ListItem
            title="Video Merging"
            onPress={() => this.handleVideoMergingPress()}
          />
            


          <ListItem
            title="Video List UI design"
            onPress={() => this.handleVideoUIDesignPress()}
          />          

          <ListItem
            title="Video Processing"
            onPress={() => this.handleVideoProcessingPress()}
          />

          <ListItem
            title="Video player controller"
            onPress={() => this.handleVideoPlayerControllerPress()}
          />                           

        </List>


      </ScrollView>
    );
  }   
}

export default videoFunctions;
