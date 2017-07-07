import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


import videoMerging from '../screens/videoMerging';
import videoBrowsing from '../screens/videoBrowsing';
import videoListUIDesign from '../screens/videoListUIDesign';

import videoFunctions from '../screens/videoFunctions';

// import Meteor, {createContainer, connectMeteor} from 'react-native-meteor';

// export const videoFunctionsStack= StackNavigator({
//   videofunctionsMain: {
//     screen: videoFunctions,
//     navigationOptions: {
//       title: 'videoFunc',
//     },
//   }, 
//   videoRecording: {
//     screen: BadInstagramClone,
//     navigationOptions: {
//       title: 'videoRecording',
//     },
//   },

//   videoMerging: {
//     screen: videoMerging,
//     navigationOptions: {
//       title: 'VideoMerging',
//     },
//   },  
// });



export const videoFunctionsStack= StackNavigator({
  // videofunctionsMain: {
  //   screen: videoFunctions,
  //   navigationOptions: {
  //     title: 'videoFunc',
  //   },
  // }, 
  videofunctionsMain: {
    screen: videoFunctions,
    navigationOptions: {
      title: 'videoFunc',
    },
  }, 
  videoMerging: {
    screen: videoMerging,
    navigationOptions: {
      title: 'VideoMerging',
    },
  },
  videoBrowsing: {
    screen: videoBrowsing,
    navigationOptions: {
      title: 'VideoBrowsing',
    },
  },    
  videoMerging: {
    screen: videoMerging,
    navigationOptions: {
      title: 'VideoMerging',
    },
  },
  videoUIDesign: {
    screen: videoListUIDesign,
    navigationOptions: {
      title: 'VideoListUIDesign',
    },
  },    
});



export const Tabs = TabNavigator({

  videofunctionsTab: {
    screen: videoFunctionsStack,
    navigationOptions: {
      title: 'Video',

      tabBarLabel: 'Video',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={10} color={tintColor} />
    },
  },



});



// export const Root = StackNavigator({
//   Tabs: {
//     screen: Tabs,
//   },
//   Settings: {
//     screen: SettingsStack,
//   },
// }, {
//   mode: 'modal',
//   headerMode: 'none',
// });

export const Root = StackNavigator({
  Tabs: {
    //screen: Tabs,
    screen: Tabs,

  },

}, {
  mode: 'modal',
  headerMode: 'none',
});