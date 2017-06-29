import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Feed from '../screens/Feed';
import Settings from '../screens/Settings';
import UserDetail from '../screens/UserDetail';
import Me from '../screens/Me';
import myTasks from '../screens/myTasks';

// import Meteor, {createContainer, connectMeteor} from 'react-native-meteor';


export const FeedStack = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Feed',
    },
  },
  Details: {
    screen: UserDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),
  },
});

export const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={10} color={tintColor} />,
    },
  },
  mytasks: {
    screen: myTasks,
    navigationOptions: {
      title: 'My Tasks',

      tabBarLabel: 'Tasks',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={10} color={tintColor} />,
    },
  },
  Me: {
    screen: Me,
    navigationOptions: {
      title: 'My Information',

      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={10} color={tintColor} />
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      
      title: 'Settings',
    },
  },  
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
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
    screen: Tabs,
  },

}, {
  mode: 'modal',
  headerMode: 'none',
});