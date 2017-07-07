import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';

class videoFunctions extends Component {

  handleVideoBrowsingPress = () => {
    this.props.navigation.navigate('videoBrowsing');
  };

  handleVideoProcessingPress = () => {
    this.props.navigation.navigate('videoProcessing');
  };

  handleVideoMergingPress = () => {
    this.props.navigation.navigate('videoMerging');
  };

  handleVideoUIDesignPress = () => {
    this.props.navigation.navigate('videoUIDesign');
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

        </List>


      </ScrollView>
    );
  }   
}

export default videoFunctions;
