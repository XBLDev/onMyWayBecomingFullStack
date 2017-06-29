// RNMeteorDemo/imports/api/items.js

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor'; // ADD THIS

export const Items = new Mongo.Collection('itemsRN');
// console.log("items.js running...")

// ADD THIS
if (Meteor.isServer) {
    Meteor.publish('itemsRN',function tasksPublication()  {
      return Items.find();
    });
}

// ADD THIS

Meteor.methods({
  'Items.addOne': ({ name }) => {
    console.log("Items.addOne running...")
        // Make sure the user is logged in before inserting a task
    if (! this.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    return Items.insert({ 
      name, 
      createdAt: new Date(),
      owner: Meteor.userId(),
      // username: Meteor.user().username,   
    });
  },
});



// export default Items;