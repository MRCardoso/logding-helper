angular.module('logding.helper')
.directive('mousewheel', function($rootScope){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.bind('mousewheel', function(event){
                scope.width += event.wheelDeltaX;
                scope.height += event.wheelDeltaY;
                scope.$digest();
            })
        }
    }
})
