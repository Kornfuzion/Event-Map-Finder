"use strict";

//I use a separate model for descriptions because this is a nested data structure
//This allows me to do some convenient error checking when constructing the event model
APP.DescriptionModel = Backbone.Model.extend({
    defaults:{
        text: "no description available"
    },

    parse: function(options) {
        if(options == null || options.text == null || options.text == "") {
            return this.defaults;
        }
        return options;
    }
}); 

//similar to description model, parse function used to validate/set default data
APP.LogoModel = Backbone.Model.extend({
    defaults:{
        url: "img/calendar_icon_long.png"
    },

    parse: function(options) {
        if(options == null || options.url == null || options.url == "") {
            return this.defaults;
        }
        return options;
    }
});  

//contains the data for an event object returned from the eventbrite API
//we are guaranteed that this event has a name, so I can have a static nested data type for this
//logo and description, however, aren't guaranteed, so I need to parse and set models for these
APP.EventModel = Backbone.Model.extend({
    defaults:{
        name: {
            text: ""
        },
        url: "",
        venue_id: "",
        logo: {
            url: ""
        }
    },

    parse: function(response) {
        response.description = new APP.DescriptionModel(APP.DescriptionModel.prototype.parse(response.description));
        response.logo = new APP.LogoModel(APP.LogoModel.prototype.parse(response.logo));
        return response;
    }
});

//collection for events
APP.EventCollection = Backbone.Collection.extend({
    model: APP.EventModel,
    url: "",

     parse: function(response) {
        return response.events;
    }
});
