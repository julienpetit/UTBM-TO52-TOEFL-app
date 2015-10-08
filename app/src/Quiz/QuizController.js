(function(){

    angular
        .module('mainApp')
        .controller('TrainingMenuController', [
            'quizService', '$scope', '$location', '$mdDialog',
            TrainingMenuController
        ])
        .controller('TrainingQuestionController', [
            'quizService', '$scope', '$routeParams',
            TrainingQuestionController
        ]);

    /**
     *
     * @param quizService
     * @param $scope
     * @param $location
     * @param $mdDialog
     * @constructor
     */
    function TrainingMenuController( quizService, $scope, $location, $mdDialog ) {

        // *********************************
        // View Attributes
        // *********************************

        // Displaying spinner
        $scope.isOnLoad = true;
        $scope.questionsCount = 5;
        $scope.questionsCountSelection = [ 5, 10, 15, 20, 30 ];

        // *********************************
        // View methods
        // *********************************

        $scope.startTraining = function() {

            // Check if more one tag is selected
            var tags = [];
            $scope.tags.forEach(function(tag){
                if( tag.checked === true )
                    tags.push(tag.id);
            });

            // Otherwise display error
            if( tags.length == 0 ){
                showAlert(
                    $mdDialog,
                    "Impossible de commencer",
                    "Vous devez choisir au moins un thème pour commencer l'entrainenement",
                    "Fermer"
                );
                return;
            }

            // Check the number of questions

            // Start training
            $location.path('/training/questions').search({
                tags: tags,
                limit: $scope.questionsCount
            });
        };

        // *********************************
        // Loading data
        // *********************************
        quizService
            .loadTags()
            .then( function( tags ) {
                $scope.tags = [].concat(tags);

                // Hiding spinner
                $scope.isOnLoad = false;
            });

    }

    /**
     *
     * @param quizService
     * @param $scope
     * @param $routeParams
     * @constructor
     */
    function TrainingQuestionController( quizService, $scope, $routeParams ) {


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

    /**
     *
     * @param $mdDialog
     * @param title
     * @param content
     * @param btnLabel
     */
    function showAlert( $mdDialog , title, content, btnLabel ) {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('body')))
                .clickOutsideToClose(true)
                .title(title)
                .content(content)
                .ok(btnLabel)
        );
    }

})();
