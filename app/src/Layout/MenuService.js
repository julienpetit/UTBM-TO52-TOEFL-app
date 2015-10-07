(function(){
    'use strict';

    angular.module('mainApp')
        .service('menuService', ['$q', '$http', '$rootScope', '$location', MenuService]);

    /**
     * Users DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function MenuService($q, $http, $rootScope, $location){

        var version = {};

        var sections = [{
            name: 'Commencer',
            url: '/getting-started',
            type: 'link'
        }];

        var learningSection = {
            name: 'Cours',
            type: 'heading',
            children: []
        };

        $http.get('http://to52.julienpetit.fr/api/v1/learning/categories')
            .success(function(data) {

                console.log(data);

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
                            url: '/efe'
                        }
                    ]
                });

            })
            .error(function() {

            });



        //sections.push({
        //    name: 'Cours',
        //    type: 'heading',
        //    children: [
        //        {
        //            name: "Le développement",
        //            type: 'toggle',
        //            pages: [
        //                {
        //                    name: 'Typography',
        //                    url: '/CSS/typography',
        //                    type: 'link'
        //                },
        //                {
        //                    name : 'Button',
        //                    url: '/CSS/button',
        //                    type: 'link'
        //                },
        //                {
        //                    name : 'Checkbox',
        //                    url: '/CSS/checkbox',
        //                    type: 'link'
        //                }]
        //        },
        //        {
        //            name: 'Theming',
        //            type: 'toggle',
        //            pages: [
        //                {
        //                    name: 'Introduction and Terms',
        //                    url: '/Theming/01_introduction',
        //                    type: 'link'
        //                },
        //                {
        //                    name: 'Declarative Syntax',
        //                    url: '/Theming/02_declarative_syntax',
        //                    type: 'link'
        //                },
        //                {
        //                    name: 'Configuring a Theme',
        //                    url: '/Theming/03_configuring_a_theme',
        //                    type: 'link'
        //                },
        //                {
        //                    name: 'Multiple Themes',
        //                    url: '/Theming/04_multiple_themes',
        //                    type: 'link'
        //                }
        //            ]
        //        }
        //    ]
        //});





        function sortByName(a,b) {
            return a.name < b.name ? -1 : 1;
        }

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

            console.log('onLocationChange');

            var path = $location.path();


            console.log(path);
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




})()
