angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope) {

})

.controller('PlaylistsCtrl', function($scope, Tweet) {
  $scope.playlists = Tweet.query();
})

.controller('PlaylistCtrl', function($scope, $stateParams, Tweet, $ionicHistory, $ionicNavBarDelegate) {
    $scope.playlist = Tweet.get({tweetId: $stateParams.tweetId});

    $scope.myGoBack = function() {
      console.log('back');
      $ionicHistory.goBack();
    };

    $scope.save = function() {
        var tweet = new Tweet();
        tweet.content = "wawawawa";
        tweet.$save();
        //$scope.playlist.$save({tweetId: $stateParams.tweetId});
      console.log('save')
    };

    $scope.updateCounter = function() {
      console.log($scope.playlist.content.length);
      $ionicNavBarDelegate.title(140 - $scope.playlist.content.length)
    }
});
