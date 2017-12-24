angular.module('logding.helper')
.factory('messageBox', ["$rootScope", "$ionicPopup", function($rootScope, $ionicPopup)
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
		return $ionicPopup.alert(params);
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
		return boxConfirm;
	};

	function show(config, $scope)
	{
		var params = {
			template: $scope.tmpl || config.message || "Display Data",
			title: $scope.ttl || config.title || "Display Data",
			scope: $scope,
		};
		if(config.subTitle != undefined){
			params.subTitle = config.subTitle;
		}
		if( config.buttons != undefined ){
			params.buttons = config.buttons;
		}
		return $ionicPopup.show(params);
	}

	return {
		alert: alert,
		show: show,
		confirm: confirm
	};
}]);