angular.module('starter.controllers', ['starter.services', 'ngCordova'])

.controller('AppCtrl', function() {
})

.controller('TweetsCtrl', function($scope, Tweet, $state, $cordovaClipboard, $ionicListDelegate) {
  $scope.listCanSwipe = true;
  $scope.tweets = Tweet.query();

  $scope.newTweet = function() {
    $state.go('app.single', {tweetId: 'new'})
  };

  $scope.delete = function(tweet, $index) {
    tweet.$delete({tweetId: tweet.id},function(){
      $scope.tweets.splice($index, 1)
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

.controller('TweetCtrl', function($scope, $stateParams, Tweet, $ionicHistory, $ionicNavBarDelegate, $state, $window) {
    if ($stateParams.tweetId == "new") {
      $scope.tweet = new Tweet;
    }else{
      $scope.tweet = Tweet.get({tweetId: $stateParams.tweetId},function(tweet){
        $ionicNavBarDelegate.title(140 - tweet.content.length)
      })
    }

    $scope.goBack = function() {
      $state.go('app.tweets')
    };

    $scope.save = function() {
      if ($stateParams.tweetId == "new") {
        $scope.tweet.$save(function(){
          $window.location.reload(true)
        });
      }else{
        $scope.tweet.$update({tweetId: $stateParams.tweetId},function(){
          $window.location.reload(true)
        });
      }
      $state.go('app.tweets', {}, {reload: true});
    };

    $scope.updateCounter = function() {
      $ionicNavBarDelegate.title(140 - $scope.tweet.content.length)
    }
});
