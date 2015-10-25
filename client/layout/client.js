// Songs = new Mongo.Collection('songs');

// METEOR THINGS
Template.layout.helpers({
  results: function () {
    return Session.get('results');
  }
});

Template.body.events({
  "submit .new-search": function (event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    var text = event.target.text.value;
    // Take "text" and use that to search YT
    Meteor.call('checkYT', text, function(error, results) {
      var yt = JSON.parse(results.content);
      var x = [];
      // console.log('JSON', yt.items);
      yt.items.forEach(function(e){
        x.push({text: e.snippet.title,
                id: e.id.videoId,
                pic: e.snippet.thumbnails.default.url
        });
      });
      // console.log('X',x);
      Session.set('results', x);

    });
    // Clear the form
    event.target.text.value = '';
  }
});

// JQUERY things
Meteor.startup(function () {
  // Allows the element to be dropped into a different div
  allowDrop = function (ev) {
    ev.preventDefault();
  };

  // Allows the 'id' text to be dragged
  drag = function (ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  // This event gets triggered when dropped. Puts the dragged item into the new div.
  drop = function (ev) {
    console.log(ev);
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    ev.target.appendChild(document.getElementById(data));
  };
});





  // $("#search li a").draggable ();
  //
  // $(".playlist").droppable({activeClass: ".playlist li"});
