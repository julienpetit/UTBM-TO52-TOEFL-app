(function(){
    'use strict';

    angular.module('mainApp')
        .service('quizService', ['$q', '$http', 'appConfig', QuizService]);

    /**
     * Users DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadTags: Function}}
     * @constructor
     */
    function QuizService($q, $http, appConfig){

        var questions = JSON.parse('[{"id":1,"title":"Qui est le fondateur du Club de Rome ?","hint":"Le Club de Rome a été créé dans les années 70","response":"_Réponse bla bla_","answers":[{"id":1,"title":"Karim Benzema","is_true":true,"$$hashKey":"object:139"},{"id":2,"title":"Alex Ich","is_true":false,"$$hashKey":"object:140","checked":true},{"id":3,"title":"Aurelio Peccei","is_true":false,"$$hashKey":"object:141"},{"id":4,"title":"Patrick Bruel","is_true":false,"$$hashKey":"object:142","checked":true}],"tags":[{"name":"Développement durable","slug":"developpement-durable","created_at":"2015-10-01T22:51:32+0200","updated_at":"2015-10-06T22:33:07+0200","enabled":true,"context_id":"toefl","id":1,"media":{"id":8,"width":346,"height":346,"urls":[]}},{"name":"Energies renouvelables","slug":"energies-renouvelables","created_at":"2015-10-01T22:52:26+0200","updated_at":"2015-10-06T22:40:52+0200","enabled":true,"context_id":"toefl","id":4,"media":{"id":10,"width":1024,"height":768,"urls":[]}}],"$$hashKey":"object:195"},{"id":2,"title":"Chaque personne se rendant au travail produit en aque personne se rendant au travail produit en moyenne chaque année","hint":"Hint..","answers":[{"id":5,"title":"1 tonne de CO2","is_true":false,"$$hashKey":"object:167"},{"id":6,"title":"1,2 tonne de CO2","is_true":true,"$$hashKey":"object:168","checked":true},{"id":7,"title":"1,4 tonne de CO2","is_true":false,"$$hashKey":"object:169","checked":false},{"id":8,"title":"1,6 tonne de CO2","is_true":false,"$$hashKey":"object:170"}],"tags":[{"name":"Développement durable","slug":"developpement-durable","created_at":"2015-10-01T22:51:32+0200","updated_at":"2015-10-06T22:33:07+0200","enabled":true,"context_id":"toefl","id":1,"media":{"id":8,"width":346,"height":346,"urls":[]}}],"$$hashKey":"object:196"}]');

        // Promise-based API
        return {

            loadTags : function() {

                var def = $q.defer();

                $http.get( appConfig.backend + "/quiz/tags")
                    .success(function(data) {
                        def.resolve(data);
                    })
                    .error(function(){
                        def.reject("Failed to get tags")
                    });
                return def.promise;
            },

            loadQuestions : function( tags, limit) {

                limit = (limit === undefined) ? 10 : limit;

                var def = $q.defer();

                var url = appConfig.backend + "/quiz/questions?tags=" + JSON.stringify(tags) + "&limit=" + limit;

                $http.get(url)
                    .success(function(data) {
                        def.resolve(data);
                    })
                    .error(function(){
                        def.reject("Failed to get questions")
                    });
                return def.promise;
            },

            setQuestions : function ( newQuestions ) {
                questions = newQuestions;
            },

            getQuestions : function () {
                return questions;
            },

            computeErrors : function ( questions ) {

                var errors = 0;

                for( var i = 0; i < questions.length; i++ ) {
                    var boolTruthAnswer = true;
                    var boolHasBeenCheck = false;

                    for ( var j = 0; j < questions[i].answers.length; j++ ) {
                        if ( questions[i].answers[j].checked != undefined && questions[i].answers[j].is_true != questions[i].answers[j].checked ) {
                            boolTruthAnswer = false;
                        }

                        if( questions[i].answers[j].checked == true )
                            boolHasBeenCheck = true;

                    }

                    questions[i].isError = !boolTruthAnswer || !boolHasBeenCheck;

                    if ( !boolTruthAnswer || !boolHasBeenCheck )
                        errors++;

                }

                return {
                    questions : questions,
                    errors : errors
                };
            }
        };
    }

})();
