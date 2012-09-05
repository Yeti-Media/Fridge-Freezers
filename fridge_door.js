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


      // var new_post = document.getElementById("new_post_content").value,
      //     fridge = Session.get("selected_fridge"),
      //     file = document.getElementById("file_select").value,
      //     url = "http://www.upscrn.com/screenshots.json",
      //     auth_token = "HzLAa1SsZqs4FZKqa1pF";

  
     //  var fd = new FormData();
     //  fd.append("image", file); // Append the file
     //  fd.append("key", "2801fba6816339b659a2be140fe7460a"); // Get your own key: http://api.imgur.com/

     //  var xhr = new XMLHttpRequest();
     //  xhr.open("POST", "http://api.imgur.com/2/upload.json"); // Boooom!
     //  xhr.onload = function() {
     //     // The URL of the image is:
     //     JSON.parse(xhr.responseText);
     //  }

     // xhr.send(fd);    
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

