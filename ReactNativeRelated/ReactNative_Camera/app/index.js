// RNDEMO/app/index.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity, // ADDED
  TouchableHighlight,
  Dimensions,

} from 'react-native';
import Meteor, {createContainer} from 'react-native-meteor';
// import Camera from 'react-native-camera';

const SERVER_URL = 'ws://reactjsmeteortestxbldev.meteorapp.com/websocket';
const SERVER_URL2 = 'ws://reactjsmeteortestxbldev.meteorapp.com/websocket';
const SERVER_URL3 = 'ws://172.16.80.1:3000/websocket';

//localhost
//172.16.80.1
//http://reactjsmeteortestxbldev.meteorapp.com/

class App extends Component {


  constructor(props) {
  super(props);
  this.handleAddItem = this.handleAddItem.bind(this);
//    this.handleClick = this.handleClick.bind(this);
}

  componentWillMount() {
    Meteor.connect(SERVER_URL2);

  }

  // ADDED
  handleAddItem() {
    // console.log("handleAddItem called");
    const name = Math.floor(Math.random() * 10); // just generate some random number
    Meteor.call('Items.addOne', { name }, (err, res) => {
        // Do whatever you want with the response
        console.log('Items.addOne', err, res);
    });      
    // console.log('TODO: Handle Add Item');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native + Meteor!
        </Text>
        <Text style={styles.instructions}>
          {/*Item Count: {Meteor.collection('itemsRN').find().length}*/}
          Item Count: {this.props.count}
        </Text>

        <TouchableOpacity style={styles.button} onPress={this.handleAddItem}>
          <Text>Add Item</Text>
        </TouchableOpacity>
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
  },


});


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});


// export default App;

export default createContainer(() => {
  Meteor.subscribe('itemsRN');
//   console.log("Meteor subscribed")
  return {
    count: Meteor.collection('itemsRN').find().length,
  };
}, App);