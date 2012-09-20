Fridges = new Meteor.Collection('fridges');
Posts = new Meteor.Collection('posts');

if (Meteor.is_client) {

  Template.kitchen.fridges = function(){
    return Fridges.find({})
  };

  Template.new_fridge.events = {
    'click input.add': function () {
      var new_fridge = document.getElementById("new_fridge_name").value;
      Fridges.insert({name: new_fridge})
      Session.set("selected_fridge", new_fridge);
      location.hash = "#" + new_fridge;
    }
  };


  Template.fridge_info.maybe_selected = function () {
    return Session.equals("selected_fridge", this.name) ? "selected" : '';
  };

  Template.fridge_info.events = {
    'click': function () {
      Session.set("selected_fridge", this.name);
      location.hash = "#" + this.name;
    }
  };

  Template.fridge.type_is = function(type){
    return this.type === type;
  }

  Template.fridge.posts = function () {
    var fridge = Session.get("selected_fridge");
    return Posts.find({fridgeName: fridge})
  }
  Template.fridge.selected_fridge = function () {
    var fridge_domain = location.hash.substr(1);
    var fridge = Session.get("selected_fridge");

    return Fridges.findOne({name: fridge_domain});
  };

  Template.fridge.preview = function () {
  };

  Template.new_post.events = {
    'click input.add': function () {

      var new_post = document.getElementById("new_post_content").value;
      var fridge = Session.get("selected_fridge");
      var radio = document.getElementsByName("post_type");
      var post_type;

      for (i=0; i < radio.length;i++){
        if(radio[i].checked==true){
          post_type = radio[i].value;
      }};

      Posts.insert({content: new_post, fridgeName: fridge, type: post_type });

    }
  };

}

if (Meteor.is_server) {
  Meteor.startup(function () {
  });
}

