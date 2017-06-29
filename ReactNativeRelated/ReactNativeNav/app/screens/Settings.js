import React, { Component } from 'react';
import { ScrollView, Alert} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Meteor from 'react-native-meteor';

class Settings extends Component {


  onPressLogOut()
  {
    // Alert.alert(
    //   'Alert Title',
    //   'My Alert Msg',
    //   [
    //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ],
    //   { cancelable: false }
    // )
    Alert.alert(
      'Log Out',
      'Log Out of your account?',
      [
        // {text: 'Ask me later'},
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK' , onPress: () => Meteor.logout()},
      ],
      { cancelable: true }
    )    
  }

  constructor(props)
  {
    super(props);
    // this.data = {};
    this.onPressLogOut = this.onPressLogOut.bind(this);
  }

  render() {
    return (
      <ScrollView>
        <List>
          <ListItem
            title="Notifications"
          />
          <ListItem
            title="Profile"
          />
          <ListItem
            title="Password"
          />
        </List>
        <List>
          <ListItem
            title="Sign Out"
            rightIcon={{ name: 'cancel' }}
            onPress={this.onPressLogOut}
          />
        </List>
      </ScrollView>
    );
  }
}

export default Settings;
