// RNMeteorDemo/imports/api/items.js

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor'; // ADD THIS
import { FilesCollection } from 'meteor/ostrio:files';

const Items = new Mongo.Collection('itemsRN');
const droneVideoURLS = new Mongo.Collection('dronevideourls');
// console.log("items.js running...")

// const Images = new FilesCollection({
//   debug: true,
//   collectionName: 'Images',
//   // onBeforeUpload() {
//   //   // Disallow uploads from client
//   //   return false;
//   // }
// });

// const Sounds = new FilesCollection({
//   debug: true,
//   collectionName: 'Sounds',
//   // onBeforeUpload() {
//   //   // Disallow uploads from client
//   //   return false;
//   // }
// });

// ADD THIS
if (Meteor.isServer) {
  // Images.denyClient();
  // Sounds.denyClient();

  // Images.collection.attachSchema(Images.schema);

  if (!droneVideoURLS.find().count()) {
      // console.log("Nothing in Images collection, adding one!")
      // Images.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
      //   fileName: 'logo.png',
      //   meta: {}
      // });
      droneVideoURLS.insert({ 
            videoURL: 'https://s3-ap-southeast-2.amazonaws.com/dronevideoflyabove/RealRawDroneFPS30_2_27.mp4', 
            
      });
      droneVideoURLS.insert({ 
            videoURL: 'https://s3-ap-southeast-2.amazonaws.com/dronevideoflyabove/RealRawUserFPS30.mp4', 
            
      });      
  }

  // if (!Images.find().count()) {
  //     console.log("Nothing in Images collection, adding one!")
  //     Images.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
  //       fileName: 'logo.png',
  //       meta: {}
  //     });
  // }

  // if (!Sounds.findOne()) {
  //     console.log("Nothing in Sounds collection, adding one!")
  //     Sounds.load('http://www.openmusicarchive.org/audio/Deep_Blue_Sea_Blues.mp3', {
  //       fileName: 'Deep_Blue_Sea_Blues.mp3'
  //     });
  //     Sounds.load('http://www.openmusicarchive.org/audio/Struggling.mp3', {
  //       fileName: 'Struggling.mp3'
  //     });
  // }

  // Meteor.publish('files.images.all', function firstImagePublication() {
  //   return Images.find();
  // });
  // Meteor.publish('files.images.all', () => Images.find().cursor);
  // Meteor.publish('files.sounds.all', () => Sounds.find().cursor);
  // Meteor.publish('files.images.all', () => Images.find());
  // Meteor.publish('files.sounds.all', () => Sounds.find());
  
  // Meteor.publish('files.images.all',function imagesPublication()  {
  //     return Images.find().cursor;
  // });

  // Meteor.publish('files.sounds.all',function soundsPublication()  {
  //     return Sounds.find().cursor;
  // });

  Meteor.publish('itemsRN',function tasksPublication()  {
      return Items.find();
  });

  Meteor.publish('droneurls',function droneurlPublication()  {
      return droneVideoURLS.find();
  });
}

// ADD THIS

Meteor.methods({
  'Items.addOne': ({ name, num }) => {
    console.log("Items.addOne running...")
        // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }



    return Items.insert({ 
      name: name, 
      number: num,
      // addedTime: new Date().toString(),
      // owner: Meteor.userId(),
      // username: Meteor.user().username,   
    });
  },

  'Items.refresh': ({ name }) => {
    // console.log("Items.addOne running...")
        // Make sure the user is logged in before inserting a task
    if (! this.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Meteor.publish('itemsRN',function tasksPublication()  {
      return Items.find();
    });

  },

});

export { Items, droneVideoURLS };


// export default Items;