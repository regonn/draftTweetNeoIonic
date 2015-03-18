angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope) {

})

.controller('PlaylistsCtrl', function($scope, Tweet) {
  $scope.playlists = Tweet.query();
})

.controller('PlaylistCtrl', function($scope, $stateParams, Tweet, $ionicHistory, $ionicNavBarDelegate) {
    $scope.playlist = Tweet.get({tweetId: $stateParams.tweetId});

    $scope.tweetContent = "text";
    $scope.myGoBack = function() {
      console.log('back');
      $ionicHistory.goBack();
    };

    $scope.save = function() {

      console.log('save')
    };

    $scope.updateCounter = function() {
      console.log($scope.tweetContent);
      $ionicNavBarDelegate.title('wawa')
    }
});
