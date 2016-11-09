'use strict';

/**
 * @ngdoc function
 * @name composeUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the composeUiApp
 */
angular.module('composeUiApp')
  .controller('MainCtrl', function ($scope, $resource, pageSize) {

    var Projects = $resource('api/v1/projects');

    $scope.isActive = function (id, l) {
      return l.indexOf(id.replace(/\-/g, '')) >= 0;
    };

    function reload(displayMessage) {
      Projects.get(function (data) {
        $scope.projects = data;
        if (displayMessage) {
          alertify.success(Object.keys(data.projects).length + ' projects reloaded');
        }
      });
    }

    $scope.reload = reload;

    $scope.isEmpty = function (obj) {
      return angular.equals({}, obj);
    };

    $scope.page = 0;
    $scope.pageSize = pageSize;

    $scope.size = function (x) {
      return x ? Object.keys(x).length : 0;
    };


    reload(false);

  });
