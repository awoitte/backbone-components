define(function() {
    return {
        "paths": {
            "underscore": "libs/underscore",
            "backbone": "libs/backbone",
            "requireLib": "libs/require",
            "text": "libs/text",
            "mustache": "libs/mustache",
            "jquery": "libs/jquery",
        },
        "shim": {
            "underscore": {
                "exports": "_"
            },
            "backbone": {
                "deps": [
                    "underscore",
                    "jquery"
                ],
                "exports": "Backbone"
            },
            "jquery": {
                "exports": "$"
            }
        },
        urlArgs: "bust=" + (new Date()).getTime()
    };
});