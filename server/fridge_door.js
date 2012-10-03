Fridges = new Meteor.Collection('fridges');
Posts = new Meteor.Collection('posts');

if (Meteor.is_server) {
  Meteor.startup(function () {
    // Meteor.publish('fridges', function () {
    //   return Fridges.find({});
    // });

    // Meteor.publish('posts', function(fridgeId){
    //   return Posts.find({fridge_id: fridgeId})
    // });
  });
}

