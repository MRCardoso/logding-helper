angular.module('logding.helper')
.factory('Loading', ['$ionicLoading', function($ionicLoading){
    function show(ico){
        ico = (angular.isUndefined(ico) ? 'bubbles' : ico);
        return $ionicLoading.show({
            // template: '<p>Loading...</p><ion-spinner icon="dots"></ion-spinner>',
            template: '<p>Loading...</p><ion-spinner icon="'+ico+'"></ion-spinner>',
            showBackdrop: true,
        });
    }
    function hide(){
        return $ionicLoading.hide();
    }
    return {
        show: show,
        hide: hide
    }
}]);