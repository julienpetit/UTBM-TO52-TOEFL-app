(function(){
    'use strict';

    angular.module('mainApp')
        .service('learningService', ['$q', '$http', LearningService]);

    /**
     * Users DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function LearningService($q, $http){

        // Promise-based API
        return {
            loadCards : function( categoryId ) {
                // Simulate async nature of real remote calls

                var def = $q.defer();

                $http.get("http://to52.julienpetit.fr/api/v1/learning/cards/category/" + categoryId)
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
