"use strict";

APP.EventRowView = Backbone.View.extend({
  tagName: "tr",
  // functions to fire on events
  events: {
  },

  // the constructor
  initialize: function (options) {
    // model is passed through
    this._event  = options.event;
    this._events = options.events;
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#EventRowTemplate').html(), this._event.toJSON()));
    return this;
  }
});
