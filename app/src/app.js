/**
 *
 */
angular
    // Importing modules to mainAp
    .module('mainApp', ['ngMaterial', 'ngRoute', 'btford.markdown', 'ngMdIcons'])

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


        $mdThemingProvider.definePalette('utbm-blue', $mdThemingProvider.extendPalette('blue', {
            '500': '008ECB'
        }));

        // Setting color theme
        $mdThemingProvider.theme('default')
            .primaryPalette('utbm-blue')
            .accentPalette('deep-orange');

        // available color : red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey


        // Routing
        $routeProvider
            .when('/getting-started', {
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
            .when('/training/results', {
                templateUrl: 'src/Quiz/views/training-results.html',
                controller: 'TrainingResultsController'
            })
            .when('/examination', {
                templateUrl: 'src/Quiz/views/training-question.html',
                controller: 'ExaminationQuestionController'
            })
            .when('/learning/categorie/:categoryId', {
                templateUrl: 'src/Learning/views/cards.html',
                controller: 'LearningController'
            })

            .otherwise("/training");



    })
    .constant('appConfig', {
        'backend': 'http://to52.julienpetit.fr/api/v1',
        'version': 0.1
    })
;


