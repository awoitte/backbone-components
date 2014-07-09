require([
    'requireConfig'
], function(Config) {
    require.config(Config);
});

require(['app'], function(App) {
    window.App = new App();
});