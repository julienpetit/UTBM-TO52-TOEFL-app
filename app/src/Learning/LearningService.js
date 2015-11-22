(function(){
    'use strict';

    angular.module('mainApp')
        .service('learningService', ['$q', '$http', 'appConfig', LearningService]);

    /**
     * Users DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function LearningService($q, $http, appConfig){

        // Promise-based API
        return {
            loadCards : function( categoryId ) {

                // Simulate async nature of real remote calls
                var def = $q.defer();

                $http.get( appConfig.backend + "/learning/cards/category/" + categoryId)
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
