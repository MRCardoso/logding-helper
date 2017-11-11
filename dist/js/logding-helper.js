/**
 * logding-helper - AngularJS module to store the useful features in develop mobile with ionic 1
 * 
 * Copyright 2017 Marlon R Cardoso <marlonrcardoso@yahoo.com.br>
 */
(function(){
    'use strict';
    angular.module('logding.helper',[])
        .run(["$rootScope", function($rootScope){
        }]);
}());
angular.module('logding.helper').factory('Loading', ['$ionicLoading', function($ionicLoading){
    function show(){
        return $ionicLoading.show({
            // template: '<p>Loading...</p><ion-spinner icon="dots"></ion-spinner>',
            template: '<p>Loading...</p><ion-spinner icon="bubbles"></ion-spinner>',
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
}])
angular.module('logding.helper').factory('Log', function(){
    function info(string, data, activate){
        activate = (angular.isUndefined(activate) ? true : activate);
        if( activate ){
            console.log('%c '+string, 'color: #5E8FCD;font-weight:bold', ( data || '' ));
        }
    }
    function success(string, data, activate){
        activate = (angular.isUndefined(activate) ? true : activate);
        if( activate ){
            console.log('%c '+string, 'color: #29B36E;font-weight:bold', ( data || '' ));
        }
    }
    function err(string, data, activate){
        activate = (angular.isUndefined(activate) ? true : activate);
        if( activate ){
            console.log('%c '+string, 'color: #e42112;font-weight:bold;', ( data || '' ));
        }
    }

    function DBException(e, sql, data, activate){
        activate = (angular.isUndefined(activate) ? true : activate);
        if( activate ){
            var message = ("Error({code}): {message} \nQuery {sql}")
            .replace('{message}', (e.message || ''))
            .replace('{code}', (e.code || ''))
            .replace('{sql}', sql);
            
            err(message, data, activate);
        }
    }

    return {
        err: err,
        info: info,
        success: success,
        DBException: DBException
    }
});
angular.module('logding.helper').factory('messageBox', ["$rootScope", "$ionicPopup", function($rootScope, $ionicPopup)
{
	var boxConfirm = null;
	
	function alert(title, message, $scope, buttons)
	{
		var params = {
			template: message,
			title: title,
			scope: $scope
		};
		if( buttons != undefined ){
			params.buttons = buttons;
		}
		$ionicPopup.alert(params);
	};

	function confirm(config, $scope)
	{
		if( boxConfirm == null)
		{
			boxConfirm = $ionicPopup.confirm({
				template: config.message || 'Do you really wish do this action?',
				title: config.title || 'Confirmation',
				scope: $scope,
				buttons: [
					{
						text: config.btnCancel || 'Cancel',
						type: config.classCancel || 'button-light',
						onTap: function(e){ 
							boxConfirm = null;
							
							if( config.fail != undefined )
								config.fail();
						}
					},
					{
						text: config.btnOk || 'OK',
						type: config.classOk || 'button-blue-inverse', 
						onTap: function(e){
							boxConfirm = null;
							config.success(e);
						}
					}
				]
			});
		}
	};

	return {
		alert: alert,
		confirm: confirm
	};
}])