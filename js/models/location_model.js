"use strict";

//model for addresses - allows input parsing/defaults for our location model
APP.AddressModel = Backbone.Model.extend({
    defaults:{
        address_1: "999 Spadina Avenue",
        city: "Toronto",
        country: "Canada"
    },

    parse: function(response) {
        if(response == null) {
            return this.defaults;
        }
        return response;
    }
});

//stores the venue object returned from query,
//uses an address mode to validate input/set defaults
APP.LocationModel = Backbone.Model.extend({
    defaults:{
        name:"",
        longitude: "",
        latitude: ""
    },

    //Parse the response
	parse: function (response) {
        response.address = new APP.AddressModel(APP.AddressModel.prototype.parse(response.address));
        return response;
	}
});

//location collection
APP.LocationCollection = Backbone.Collection.extend({
    model: APP.LocationModel,
    url: ""
});
