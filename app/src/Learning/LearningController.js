(function(){

    angular
        .module('mainApp')
        .controller('LearningController', [
            'learningService', '$scope', '$routeParams',
            LearningController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @constructor
     */
    function LearningController( learningService, $scope, $routeParams ) {

        // Keeping reference on this (scope js)
        var self = this;
        var categoryId = $routeParams.categoryId;

        // Displaying spinner
        $scope.isOnLoad = true;

        $scope.cards = [];
        // *********************************
        // Attributes
        // *********************************

        // Load all categories
        learningService
            .loadCards( categoryId )
            .then( function( cards ) {
                $scope.cards = [].concat(cards);
                console.log(cards);

                // Hiding spinner
                $scope.isOnLoad = false;
            })
        ;

        // *********************************
        // Internal methods
        // *********************************


    }

})();
