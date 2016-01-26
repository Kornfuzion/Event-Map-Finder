"use strict";

//stores the topic/event category info
APP.TopicModel = Backbone.Model.extend({
  defaults: {
    resource_uri: "",
    name: "",
    name_localized: "",
    short_name: "",
    short_name_localized: ""
  }
});

//collection of eventbrite cateogories
//initially, this fetched from the url using the eventbrite API,
//but since this data is mostly static and I need only the name and category_id
//i populate this collection manually in app.js at boot
APP.TopicCollection = Backbone.Collection.extend({
				
    model: APP.TopicModel,

	//Specify REST URL
	url: 'https://www.eventbriteapi.com/v3/categories/?token=B5FDTCH6BYNYYXOAHALC',
	
	//Parse the response
	parse: function (response) {
        return response.categories;
	},

	initialize: function () {
		this.bind("reset", function (model, options) {
			console.log("Inside event");
			console.log(model);
			
		});
	}	
});
