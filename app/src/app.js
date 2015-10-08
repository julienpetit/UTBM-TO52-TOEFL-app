/**
 *
 */
angular
    // Importing modules to mainAp
    .module('mainApp', ['ngMaterial', 'ngRoute', 'btford.markdown'])

    // mainApp configuration
    .config(function($mdThemingProvider, $mdIconProvider, $routeProvider){

        // Setting icons
        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu"       , "./assets/svg/menu.svg"        , 24)
            .icon("share"      , "./assets/svg/share.svg"       , 24)
            .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
            .icon("phone"      , "./assets/svg/phone.svg"       , 512);


        //$mdThemingProvider.definePalette('utbm-blue', $mdThemingProvider.extendPalette('gren', {
        //
        //}));

        // Setting color theme
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('deep-orange');

        // available color : red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey


        // Routing
        $routeProvider
            .when('/', {
                templateUrl: 'src/Layout/views/home.html'
            })
            .when('/training', {
                templateUrl: 'src/Quiz/views/training-theme-selector.html',
                controller: 'TrainingMenuController'
            })
            .when('/training/questions', {
                templateUrl: 'src/Quiz/views/training-question.html',
                controller: 'TrainingQuestionController'
            })
            .when('/examination', {
                templateUrl: 'src/Quiz/views/training-question.html',
                controller: 'TrainingQuestionController'
            })
            .when('/learning/categorie/:categoryId', {
                templateUrl: 'src/Learning/views/cards.html',
                controller: 'LearningController'
            });
            //.when('/layout/:tmpl', {
            //    templateUrl: function(params){
            //        return 'partials/layout-' + params.tmpl + '.tmpl.html';
            //    }
            //})
            //.when('/layout/', {
            //    redirectTo: function() {
            //        return "/layout/container";
            //    }
            //})
            //.when('/demo/', {
            //    redirectTo: function() {
            //        return DEMOS[0].url;
            //    }
            //})
            //.when('/api/', {
            //    redirectTo: function() {
            //        return COMPONENTS[0].docs[0].url;
            //    }
            //})
            //.when('/getting-started', {
            //    templateUrl: 'partials/getting-started.tmpl.html'
            //});

    })
    .constant('appConfig', {
        'backend': 'http://to52.julienpetit.fr/api/v1',
        'version': 0.1
    });


