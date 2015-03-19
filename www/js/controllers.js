angular.module('starter.controllers', ['starter.services', 'ngCordova'])

.controller('AppCtrl', function() {
})

.controller('PlaylistsCtrl', function($scope, Tweet, $state, $cordovaClipboard, $ionicListDelegate) {
  $scope.playlists = Tweet.query();
  $scope.newTweet = function() {
    $state.go('app.single', {tweetId: 'new'})
  };
  $scope.listCanSwipe = true;

  $scope.delete = function(tweet, $index) {
    console.log("delete" + tweet.content);
    tweet.$delete({tweetId: tweet.id},function(){
      console.log('delete');
      $scope.playlists.splice($index, 1)
      $ionicListDelegate.closeOptionButtons()
    })
  };

  $scope.copy = function(tweet) {
    console.log("copy" + tweet.content);
    $cordovaClipboard.copy(tweet.content).then(function (){
        alert("Copied!")
      }, function() {
      });
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams, Tweet, $ionicHistory, $ionicNavBarDelegate, $state, $window) {
    if ($stateParams.tweetId != "new") {
      $scope.playlist = Tweet.get({tweetId: $stateParams.tweetId},function(tweet){
        console.log("get tweet");
        $ionicNavBarDelegate.title(140 - tweet.content.length)
      })
    }else{
      $scope.playlist = new Tweet
    }

    $scope.myGoBack = function() {
      console.log('back');
      $state.go('app.playlists')
    };

    $scope.save = function() {
      if ($stateParams.tweetId != "new") {
        $scope.playlist.$update({tweetId: $stateParams.tweetId},function(){
          console.log('update')
          $window.location.reload(true)
        });
      }else {
        $scope.playlist.$save(function(){
          console.log('create')
          $window.location.reload(true)
        });
      }
      $state.go('app.playlists', {}, {reload: true});


    };

    $scope.updateCounter = function() {
      console.log($scope.playlist.content.length);
      $ionicNavBarDelegate.title(140 - $scope.playlist.content.length)
    }
});
