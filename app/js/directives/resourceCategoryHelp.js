'use strict';

angular.module('ddsApp').directive('resourceCategoryHelp', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/resource-category-help.html',
        scope: {
            resourceTypes: '='
        },
        link: function(scope) {
            scope.examples = scope.resourceTypes.slice(0, 2).map(function(resourceType) {
                return resourceType.label;
            });
        }
    };
});
