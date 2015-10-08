(function(){

    angular
        .module('mainApp')
        .controller('TrainingMenuController', [
            'quizService', '$scope', '$location', '$mdDialog',
            TrainingMenuController
        ])
        .controller('TrainingQuestionController', [
            'quizService', '$scope', '$routeParams',
            QuestionController
        ])
        .controller('ExaminationQuestionController', [
            'quizService', '$scope', '$routeParams',
            QuestionController
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
    function QuestionController( quizService, $scope, $routeParams ) {

        // *********************************
        // Attributes
        // *********************************

        var questions = [];
        var questionIndex = 0;
        var tags = $routeParams.tags !== undefined ? [].concat($routeParams.tags) : [];
        var isExamination = $routeParams.isExamination == 1;

        console.log(tags);

        console.log(isExamination);
        // *********************************
        // View Attributes
        // *********************************

        // Displaying spinner
        $scope.isOnLoad = true;
        $scope.question = null;
        $scope.isExamination = isExamination;

        // *********************************
        // View methods
        // *********************************

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
        };

        // *********************************
        // Internal methods
        // *********************************
        function reset() {
            $scope.answered = false;
        }

        // *********************************
        // Loading Data
        // *********************************
        quizService
            .loadQuestions( tags, $routeParams.limit )
            .then( function( dataQuestions ) {
                questions = [].concat(dataQuestions);

                $scope.question = questions[questionIndex];

                console.log($scope.question);
                // Hiding spinner
                $scope.isOnLoad = false;
            });

        reset();
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
