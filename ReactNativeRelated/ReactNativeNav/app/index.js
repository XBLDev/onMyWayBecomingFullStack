import React, { Component } from 'react';
import { Root, Tabs } from './config/router';

import Meteor, {createContainer, connectMeteor} from 'react-native-meteor';
import SignIn from './SignIn';

const SERVER_URL = 'ws://reactjsmeteortestxbldev.meteorapp.com/websocket';

@connectMeteor
class App extends Component {
  constructor(props)
  {
    super(props);
    this.data = {};

  }

  componentWillMount() {
    // const url = 'http://localhost:3000/websocket';
    const url = SERVER_URL;

    Meteor.connect(url);
  }

  getMeteorData() {
    return {
      user: Meteor.user(),
    };
  }

  render() {

    if (this.data.user) {
      return <Root />;
    }
    return <SignIn />;

    // return <Root />;
  }
}

export default App;
