(function(){
    'use strict';

    angular.module('mainApp')
        .service('quizService', ['$q', '$http', LearningService]);

    /**
     * Users DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadTags: Function}}
     * @constructor
     */
    function LearningService($q, $http){

        // Promise-based API
        return {
            loadTags : function() {
                // Simulate async nature of real remote calls

                var def = $q.defer();

                $http.get("http://to52.julienpetit.fr/api/v1/quiz/tags")
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
