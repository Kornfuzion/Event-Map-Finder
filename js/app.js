"use strict";

//start off the app, initialize the router
var router = new APP.EventMapRouter({
      topics: new APP.TopicCollection(),
      events: new APP.EventCollection()
});

//set default info for topics
//we could do a fetch, but there aren't many of these
router.topics.reset([
      {
        "resource_uri": "Example Note 1",
        "id": "0",
        "name": "Popular!",
        "name_localized": "",
        "short_name": "",
        "short_name_localized": ""
      },
      {
        "resource_uri": "Example Note 1",
        "id": "103",
        "name": "Music",
        "name_localized": "",
        "short_name": "",
        "short_name_localized": ""
      },
      {
        "resource_uri": "Example Note 1",
        "id": "110",
        "name": "Food and Drink",
        "name_localized": "",
        "short_name": "",
        "short_name_localized": ""
      },
      {
        "resource_uri": "Example Note 1",
        "id": "105",
        "name": "Performing and Visual Arts",
        "name_localized": "",
        "short_name": "",
        "short_name_localized": ""
      },
      {
        "resource_uri": "Example Note 1",
        "id": "104",
        "name": "Film, Media and Entertainment",
        "name_localized": "",
        "short_name": "",
        "short_name_localized": ""
      },
      {
        "resource_uri": "Example Note 1",
        "id": "102",
        "name": "Science and Technology",
        "name_localized": "",
        "short_name": "",
        "short_name_localized": ""
      },
      {
        "resource_uri": "Example Note 1",
        "id": "106",
        "name": "Fashion and Beauty",
        "name_localized": "",
        "short_name": "",
        "short_name_localized": ""
      },
      {
        "resource_uri": "Example Note 1",
        "id": "109",
        "name": "Travel and Outdoor",
        "name_localized": "",
        "short_name": "",
        "short_name_localized": ""
      },
      {
        "resource_uri": "Example Note 1",
        "id": "114",
        "name": "Religion and Spirituality",
        "name_localized": "",
        "short_name": "",
        "short_name_localized": ""
      },
      {
        "resource_uri": "Example Note 1",
        "id": "112",
        "name": "Government and Politics",
        "name_localized": "",
        "short_name": "",
        "short_name_localized": ""
      },
      {
        "resource_uri": "Example Note 1",
        "id": "119",
        "name": "Special Interests and Hobbies",
        "name_localized": "",
        "short_name": "",
        "short_name_localized": ""
      },
]);

Backbone.history.start();
