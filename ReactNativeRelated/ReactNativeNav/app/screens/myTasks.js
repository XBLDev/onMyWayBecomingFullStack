
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
  ScrollView
} from 'react-native';

import { List, ListItem } from 'react-native-elements';

import Meteor, {createContainer, connectMeteor} from 'react-native-meteor';

const SERVER_URL = 'ws://reactjsmeteortestxbldev.meteorapp.com/websocket';

class myTasks extends Component {


  constructor(props) {
  super(props);
//   this.handleAddItem = this.handleAddItem.bind(this);
//    this.handleClick = this.handleClick.bind(this);
}

  componentWillMount() {
    // Meteor.connect(SERVER_URL);
    // Meteor.subscribe('itemsRN', function(){
    //     this.props.count = Meteor.collection('tasks').find().length;

    // });
    // this.props.count = Meteor.collection('tasks').find().length;
  }

  // ADDED
  handleAddItem() {
    // console.log("handleAddItem called");
    const name = Math.floor(Math.random() * 10); // just generate some random number
    Meteor.call('Items.addOne', { name }, (err, res) => {
        //   Meteor.subscribe('itemsRN');
        // Do whatever you want with the response
        // console.log('Items.addOne', err, res);
    });      
    // console.log('TODO: Handle Add Item');
  }

  render() {
    // let currentCount = this.props.count;
    // let currentCount2 = Meteor.collection('itemsRN').find().length;
    return (


      <View style={{flex:1}}>  
        
        <TouchableHighlight onPress={this.handleAddItem.bind(this)}>
            <Text>Add Item</Text>     
        </TouchableHighlight>     
        
        <ScrollView>
            <List>
            {this.props.tasklist.map((task) => (
                <ListItem
                key={task.name}
                title={`${task.name}`}
                
                />
            ))}
            </List>
        </ScrollView>
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


myTasks.propTypes = {
  count: PropTypes.number.isRequired,
  
};

// export default myTasks;


export default createContainer(() => {
  Meteor.subscribe('itemsRN');
//   console.log("Meteor subscribed")
  return {
    tasklist: Meteor.collection('itemsRN').find(),      
    count: Meteor.collection('itemsRN').find().length,
  };
}, myTasks);

