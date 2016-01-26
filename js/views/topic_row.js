"use strict";
APP.TopicRowView = Backbone.View.extend({
  tagName: "tr",
  // functions to fire on events
  events: {
    "click a.search": "highlight"
  },

  // the constructor
  initialize: function (options) {
    // model is passed through
    this.topic  = options.topic;
    this.topics = options.topics;
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#TopicRowTemplate').html(), this.topic.toJSON()));
    return this;
  },

  //if we click on this category's 'search' link
  //highlight this row and un-highlight all other rows
  highlight: function (event) {
    var selected = this.$el.hasClass("highlight");
    if(!selected) {
            this.$el.addClass('highlight').siblings().removeClass('highlight');
    }
  }
});
