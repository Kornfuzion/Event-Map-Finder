"use strict";
window.APP = window.APP || {};
APP.EventMapRouter = Backbone.Router.extend({
    
  //various routes depending on user intention
  //but since this is a single page app, these simply
  //call certain functions and control high-level user-interface interaction
  routes: {
    "topics/index": "index",
    "topic/:id/search": "search",
    "events/setFree": "setFree",
    "events/setAll": "setAll",
    "events/:v_id/locate": "fetch"
  },

  $topic_list: null,
  $toggle_price_btn: null,
  $map_canvas: null,
  $events_list: null,
  $loader:null,

  //initialize important elements, such as the topic list, the event list, and the google map
  initialize: function (options) {
    this.topics = options.topics;
    this.events = options.events;
    this.event_prices = "All Events";    

    this.$toggle_price_btn = $('#toggle_price');

    this.$topic_list = $('#topic_list');
    this.$map_canvas = $('#map_canvas');
    this.$loader = $('#loader_image');
    this.$events_list = $('#eventlist');
    // initialize map
    this.initialize_map();
    this.index();
  },
  
  //construct a GET query using the venue ID of the clicked event
  //this will call setmarker to drop a marker of where the event is located once fetched
  fetch: function(v_id) {
    this.v_id = v_id;
    this.location = new APP.LocationCollection();
    this.location.bind('reset', this.setMarker, this);
    this.location.url = 'https://www.eventbriteapi.com/v3/venues/' + v_id + '/?token=D5J6WFWNJNBCFEGXZH3Z';
    this.location.fetch({reset:true});
  },

  //we are guaranteed that this venue exists, since its venue id was retrieved from an existing, valid event
  setMarker: function() {
    var events_found = this.events.where({venue_id: this.v_id});
    var current_event = events_found[0];
    var address = this.location.at(0);
    var marker_view = new APP.EventMarkerView({ event: current_event, map: this.map, location: address});
  },

  //toggle the event query to not search by any price
  setAll: function () {
    this.event_prices = "all";
    this.$toggle_price_btn.attr("href", "#events/setFree")
    this.$toggle_price_btn.html("All Events");
  },    

  //toggle the event query to search for free events only
  setFree: function () {
    this.event_prices = "free";
    this.$toggle_price_btn.attr("href", "#events/setAll")
    this.$toggle_price_btn.html("Free Events Only");
  },

  //construct the GET query for events within the current map bounds, that have the given criteria and pricing
  search: function (id) {
    var bounds = this.map.getBounds();
    var NE = bounds.getNorthEast();
    var SW = bounds.getSouthWest();

    this.$loader.css("display","block");

    var view = new APP.EventIndexView({events: this.events, map: this.map});
    var NE_query = '&location.viewport.northeast.latitude=' + NE.lat() + '&location.viewport.northeast.longitude=' + NE.lng();
    var SW_query = '&location.viewport.southwest.latitude=' + SW.lat() + '&location.viewport.southwest.longitude=' + SW.lng();
    var price_query = '&price=' + this.event_prices;
    var category_query = '&categories=' + id;
    
    if(id == 0) {
        category_query = '&popular=true';
    }
    
    if(this.event_prices == "all") {
        price_query = "";
    }

    var event_query = 'https://www.eventbriteapi.com/v3/events/search/?token=D5J6WFWNJNBCFEGXZH3Z';

    view.events.url = event_query + category_query + NE_query + SW_query + price_query;
    view.events.fetch({reset:true, 
                       success: function (collection, response, options) {
                                  $('#loader_image').css("display","none");
                                }
                     });

    this.$events_list.html(view.render().el);
  },

  //initialize the google map to point to Toronto as the default
  //there's a ton of fun stuff to do here, so why not?
  initialize_map : function() {
    var center = new google.maps.LatLng(43.7, -79.4);

    var mapOptions = {
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: center
    };

    this.map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
  },

  index: function () {
    var view = new APP.TopicIndexView({topics: this.topics});
    this.$topic_list.html(view.render().el);
  }
});
