(function(){
    'use strict';

    angular.module('mainApp')
        .service('menuService', ['$q', '$http', '$rootScope', '$location', 'appConfig', MenuService]);

    /**
     * Users DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function MenuService($q, $http, $rootScope, $location, appConfig){

        var version = {};

        var sections = [];

        var learningSection = {
            name: 'Cours',
            type: 'heading',
            children: []
        };

        $http.get( appConfig.backend + '/learning/categories')
            .success(function(data) {

                // Transerve all category tree
                data.forEach(function(category) {

                    var pages = [];

                    category.children.forEach(function(subCategory) {

                        var page = {
                            name: subCategory.name,
                            url: '/learning/categorie/' + subCategory.id,
                            type: 'link'
                        };

                        pages.push(page);
                    });

                    var section = {
                        name: category.name,
                        type: 'toggle',
                        pages: pages
                    };

                    learningSection.children.push(section);

                });

                sections.push(learningSection);

                sections.push({
                    name: 'Exercices',
                    type: 'heading',
                    children: [
                        {
                            name: 'Entrainement par thème',
                            type: 'link',
                            url: '/training'
                        },
                        {
                            name: 'Évaluation',
                            type: 'link',
                            url: '/examination?isExamination=1'
                        }
                    ]
                });

                onLocationChange();
            })
            .error(function() {

            });

        var self;

        $rootScope.$on('$locationChangeSuccess', onLocationChange);

        return self = {
            version:  version,
            sections: sections,

            selectSection: function(section) {
                self.openedSection = section;
            },
            toggleSelectSection: function(section) {
                self.openedSection = (self.openedSection === section ? null : section);
            },
            isSectionSelected: function(section) {
                return self.openedSection === section;
            },

            selectPage: function(section, page) {
                self.currentSection = section;
                self.currentPage = page;
            },
            isPageSelected: function(page) {
                return self.currentPage === page;
            }
        };

        function sortByHumanName(a,b) {
            return (a.humanName < b.humanName) ? -1 :
                (a.humanName > b.humanName) ? 1 : 0;
        }

        function onLocationChange() {

            var path = $location.path();

            var introLink = {
                name: "Introduction",
                url:  "/",
                type: "link"
            };

            if (path == '/') {
                self.selectSection(introLink);
                self.selectPage(introLink, introLink);
                return;
            }

            var matchPage = function(section, page) {

                if (path === page.url) {

                    self.selectSection(section);
                    self.selectPage(section, page);
                }
            };

            sections.forEach(function(section) {
                if(section.children) {
                    // matches nested section toggles, such as API or Customization
                    section.children.forEach(function(childSection){

                        if (childSection.type === 'link') {
                            matchPage(childSection, childSection);
                        }

                        if(childSection.pages){
                            childSection.pages.forEach(function(page){
                                matchPage(childSection, page);
                            });
                        }
                    });
                }
                else if(section.pages) {
                    // matches top-level section toggles, such as Demos
                    section.pages.forEach(function(page) {
                        matchPage(section, page);
                    });
                }
                else if (section.type === 'link') {
                    // matches top-level links, such as "Getting Started"
                    matchPage(section, section);
                }
            });
        }

    }




})();
