(function(){
    'use strict';

    angular.module('mainApp')
        .service('quizService', ['$q', '$http', QuizService]);

    /**
     * Users DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadTags: Function}}
     * @constructor
     */
    function QuizService($q, $http){

        // Promise-based API
        return {
            loadTags : function() {

                var def = $q.defer();

                $http.get("http://to52.julienpetit.fr/api/v1/quiz/tags")
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

                var url = "http://to52.julienpetit.fr/api/v1/quiz/questions?tags=" + JSON.stringify(tags) + "&limit=" + limit;
                console.log(url);
                $http.get(url)
                    .success(function(data) {
                        def.resolve(data);
                    })
                    .error(function(){
                        def.reject("Failed to get tags")
                    });
                return def.promise;
            }
        };
    }

})();
