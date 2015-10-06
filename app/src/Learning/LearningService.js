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
        var categories = [
            {
                id: 'svg-1',
                title: 'Lia Lugo'
            },
            {
                id: 'svg-2',
                title: 'George Duke'
            },
            {
                id: 'svg-3',
                title: 'Gener Delosreyes'
            },
            {
                id: 'svg-4',
                title: 'Lawrence Ray'
            },
            {
                id: 'svg-5',
                title: 'Ernesto Urbina'
            },
            {
                id: 'svg-6',
                title: 'Gani Ferrer'
            }
        ];

        // Promise-based API
        return {
            loadAllCategories : function() {
                // Simulate async nature of real remote calls

                var def = $q.defer();

                $http.get("http://to52.julienpetit.fr/api/v1/quiz/questions")
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
