"use strict";

//the event index view is a container for event row views
//this stores the fetched list of events in the area, of the selected category and price
APP.EventIndexView = Backbone.View.extend({

  initialize: function (options) {
    this.events = options.events;
    this.events.bind('reset', this.addAll, this);
  },

  // populate the html to the dom
  render: function () {
    this.$el.html($('#EventTemplate').html());
    this.addAll();    
    return this;
  },

  addAll: function () {
    // clear out the container each time you render index
    this.$el.find('tbody').children().remove();
    _.each(this.events.models, $.proxy(this, 'addOne'));
  },

  addOne: function (event) {
    var view = new APP.EventRowView({
      events: this.events, 
      event: event
    });
    this.$el.find("tbody").append(view.render().el);
  }
});
