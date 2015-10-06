(function(){

    angular
        .module('mainApp')
        .controller('TrainingMenuController', [
            'quizService', '$scope', '$rootScope', '$timeout', '$mdSidenav',
            TrainingMenuController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @constructor
     */
    function TrainingMenuController( quizService, $scope, $rootScope, $timeout, $mdSidenav ) {

        // Keeping reference on this (scope js)
        var self = this;

        // Displaying spinner
        $scope.isOnLoad = true;

        // *********************************
        // Attributes
        // *********************************

        // Load all categories
        quizService
            .loadTags()
            .then( function( tags ) {
                $scope.tags = [].concat(tags);
                console.log(tags);

                // Hiding spinner
                $scope.isOnLoad = false;
            });


        // *********************************
        // Internal methods
        // *********************************


    }

})();
