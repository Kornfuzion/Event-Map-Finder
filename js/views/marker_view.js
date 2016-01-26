"use strict";

APP.EventMarkerView = Backbone.View.extend({

  //a lot is happening in this initialize
  //initialize the marker icon, description, info window parameters
  //create the marker
  initialize: function(options) {

    this.event_info = options.event;
    this.map = options.map;
    this.pos = options.location;
    this.event_name = this.event_info.get('name');
    this.event_descr = this.event_info.get('description');
    this.logo = this.event_info.get('logo');

    var image = {
      url: this.logo.get('url'),
      scaledSize: new google.maps.Size(40, 20), 
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0)
    };


    this.marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(this.pos.get('latitude'), this.pos.get('longitude')),
      animation: google.maps.Animation.DROP,
      icon : image,
      title: this.event_name.text,
    });

    var title_string = this.event_name.text;
    var description_string = this.event_descr.get('text');
    description_string = description_string.substr(0,100) + "...";

    var content_string = "<div><p><b>" + title_string + "</b></b><br><p>" + description_string + "</p></div>";

    this.marker.infowindow = new google.maps.InfoWindow({
      disableAutoPan : true,
      content: content_string
    });

    //open the info window on click
    google.maps.event.addListener(this.marker, 'click', this.show_company_info);
  },

  get_marker: function() {
      return this.marker;
  },  
    
  //---------------------------------------
  // Event handlers for marker events

  show_company_info : function() {
    this.infowindow.open(this.map, this);
  },

  // END Events and event handlers
  //----------------------------------
});
