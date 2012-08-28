Fridges = new Meteor.Collection('fridges');
Posts = new Meteor.Collection('posts');

if (Meteor.is_client) {

  Template.kitchen.fridges = function(){
    return Fridges.find({})
  };

  Template.new_fridge.events = {
    'click input.add': function () {
      var new_fridge = document.getElementById("new_fridge_name").value;
      Fridges.insert({name: new_fridge});
    }
  };


  Template.fridge_info.maybe_selected = function () {
    return Session.equals("selected_fridge", this._id) ? "selected" : '';
  };

  Template.fridge_info.events = {
    'click': function () {
      Session.set("selected_fridge", this._id);
    }
  };

  Template.fridge.posts = function () {
    var fridge = Session.get("selected_fridge");      
    return Posts.find({fridgeId: fridge})
  }
  Template.fridge.selected_fridge = function () {
    var fridge = Session.get("selected_fridge");
    return Fridges.findOne({_id: fridge});
  };

  Template.new_post.events = {
    'click input.add': function () {
      var new_post = document.getElementById("new_post_content").value;
      var fridge = Session.get("selected_fridge");      
      Posts.insert({content: new_post, fridgeId: fridge });
    }
  };

}

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