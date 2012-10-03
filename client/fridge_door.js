Fridges = new Meteor.Collection('fridges');
Posts = new Meteor.Collection('posts');

if (Meteor.is_client) {

  Meteor.startup(function () {
    $('#freezer').hide();
  });

  Template.kitchen.fridges = function(){
    return Fridges.find({})
  };

  Template.kitchen.latest_fridges = function(){
    var fridges = Fridges.find({}).fetch();
    return fridges.reverse().slice(0,5);
  };

  Template.new_fridge.events = {
    'click button.add': function () {
      var new_fridge = document.getElementById("new_fridge_name").value;
      var exists = Fridges.findOne({name: new_fridge});
      if (exists){
        alert('The fridge already exists');
      } else {
        Fridges.insert({name: new_fridge});
        Session.set("selected_fridge", new_fridge);
        location.hash = "#" + new_fridge;
      };
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

  Template.fridge.video_type = function(){
    return this.content.match(/youtube/) ? 'youtube' : 'vimeo'
  }

  Template.fridge.posts = function () {
    var fridge = Session.get("selected_fridge");
    return Posts.find({fridgeName: fridge})
  }
  Template.fridge.selected_fridge = function () {
    var fridge_domain = location.hash.substr(1);
    var fridge = Session.get("selected_fridge");

    $('#main').hide();
    $('#freezer').show();

    return Fridges.findOne({name: fridge_domain});

  };

  Template.fridge.events = {
    'click a.backto' : function(){
      $('#main').show();
      $('.video_player').mediaelementplayer();
      $('#freezer').hide();
    }
  }

  Template.new_post.events = {
    'click input.add': function () {

      var new_post = document.getElementById("new_post_content").value;
      var fridge = Session.get("selected_fridge");
      var radio = document.getElementsByName("post_type");
      var post_type;
      var exists = Fridges.findOne({name: fridge});
      for (i=0; i < radio.length;i++){
        if(radio[i].checked==true){
          post_type = radio[i].value;
      }};

      Posts.insert({content: new_post, fridgeName: fridge, type: post_type });
    }
  };

}

