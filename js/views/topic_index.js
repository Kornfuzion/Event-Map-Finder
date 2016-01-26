"use strict";

//this is the container for eventbrite event topics/categories
APP.TopicIndexView = Backbone.View.extend({
  // the constructor
  initialize: function (options) {
    // model is passed through
    this.topics = options.topics;
    this.topics.bind('reset', this.addAll, this);
  },

  // populate the html to the dom
  render: function () {
    console.log("called render");
    this.$el.html($('#TopicTemplate').html());
    this.addAll();
    return this;
  },

  addAll: function () {
    // clear out the container each time you render index
    this.$el.find('tbody').children().remove();
    _.each(this.topics.models, $.proxy(this, 'addOne'));
  },

  addOne: function (topic) {
    var view = new APP.TopicRowView({
      topics: this.topics, 
      topic: topic
    });
    this.$el.find("tbody").append(view.render().el);
  }
});
