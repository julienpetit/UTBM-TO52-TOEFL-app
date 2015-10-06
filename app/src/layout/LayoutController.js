(function(){

    angular
        .module('mainApp')
        .controller('LayoutController', [
            'learningService', 'menuService', '$scope', '$rootScope', '$timeout', '$mdSidenav', '$location',
            LayoutController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @constructor
     */
    function LayoutController( learningService, menuService, $scope, $rootScope, $timeout, $mdSidenav, $location ) {

        // Keeping reference on this (scope js)
        var self = this;

        // *********************************
        // Attributes
        // *********************************
        self.menuItems = [ ];
        $scope.menu = menuService;

        $scope.path = path;
        $scope.goHome = goHome;
        $scope.openMenu = openMenu;
        $scope.closeMenu = closeMenu;
        $scope.isSectionSelected = isSectionSelected;

        $rootScope.$on('$locationChangeSuccess', openPage);
        $scope.focusMainContent = focusMainContent;

        // Methods used by menuLink and menuToggle directives
        this.isOpen = isOpen;
        this.isSelected = isSelected;
        this.toggleOpen = toggleOpen;
        this.autoFocusContent = false;

        var mainContentArea = document.querySelector("[role='main']");

        // *********************************
        // Internal methods
        // *********************************

        function closeMenu() {
            $timeout(function() { $mdSidenav('left').close(); });
        }

        function openMenu() {
            $timeout(function() { $mdSidenav('left').open(); });
        }

        function path() {
            return $location.path();
        }

        function goHome($event) {
            menuService.selectPage(null, null);
            $location.path( '/' );
        }

        function openPage() {
            $scope.closeMenu();

            if (self.autoFocusContent) {
                focusMainContent();
                self.autoFocusContent = false;
            }
        }

        function focusMainContent($event) {
            // prevent skip link from redirecting
            if ($event) { $event.preventDefault(); }

            $timeout(function(){
                mainContentArea.focus();
            },90);

        }

        function isSelected(page) {
            return menuService.isPageSelected(page);
        }

        function isSectionSelected(section) {
            var selected = false;
            var openedSection = menuService.openedSection;
            if(openedSection === section){
                selected = true;
            }
            else if(section.children) {
                section.children.forEach(function(childSection) {
                    if(childSection === openedSection){
                        selected = true;
                    }
                });
            }
            return selected;
        }

        function isOpen(section) {
            return menuService.isSectionSelected(section);
        }

        function toggleOpen(section) {
            menuService.toggleSelectSection(section);
        }
    }

})();
