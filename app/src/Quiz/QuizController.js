(function(){

    angular
        .module('mainApp')
        .controller('TrainingMenuController', [
            'quizService', '$scope', '$location',
            TrainingMenuController
        ])
        .controller('TrainingQuestionController', [
            'quizService', '$scope', '$routeParams',
            TrainingQuestionController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @constructor
     */
    function TrainingMenuController( quizService, $scope, $location ) {

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


        $scope.questionsCountSelection = [ 5, 10, 15, 20, 30 ];

        // *********************************
        // Internal methods
        // *********************************

        $scope.startTraining = function() {

            // Check if more one tag is selected
            var tags = [];
            $scope.tags.forEach(function(tag){
                if( tag.checked === true )
                    tags.push(tag.id);
            });

            // Otherwie display error
            if( tags.length == 0 ){

                return;
            }

            // Check the number of questions

            // Start training
            $location.path('/training/questions').search({
                tags: tags,
                limit: $scope.questionsCount
            });


        }
    }

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @constructor
     */
    function TrainingQuestionController( quizService, $scope, $routeParams ) {

        console.log("yo");
        console.log($routeParams.limit);

        // Keeping reference on this (scope js)
        var self = this;
        var questions = [];
        var questionIndex = 0;
        var tags = angular.isArray($routeParams.tags) ? $routeParams.tags : [$routeParams.tags];
        $scope.question = null;

        reset();

        // Displaying spinner
        $scope.isOnLoad = true;

        // *********************************
        // Attributes
        // *********************************


        // Load all categories
        quizService
            .loadQuestions( tags, $routeParams.limit )
            .then( function( dataQuestions ) {
                questions = [].concat(dataQuestions);

                $scope.question = questions[questionIndex];

                console.log($scope.question);
                // Hiding spinner
                $scope.isOnLoad = false;
            });


        // *********************************
        // Internal methods
        // *********************************
        function reset() {
            $scope.answered = false;
        }

        $scope.showAnswer = function() {
            $scope.answered = true;
        };

        $scope.nextQuestion = function() {
            reset();

            questionIndex++;

            if( questionIndex >= questions.length ) {
                console.log("show results");
            } else {
                $scope.question = questions[questionIndex];
            }
        }

    }

})();
