angular.module('starter.controllers', ['starter.services', 'ngCordova'])

.controller('AppCtrl', function($scope, $rootScope, Tweet) {
    $scope.syncTweets = function(){
      $rootScope.tweets = Tweet.query();
    }
})

.controller('TweetsCtrl', function($scope, Tweet, $state, $cordovaClipboard, $ionicListDelegate) {
  $scope.listCanSwipe = true;
  $scope.syncTweets();

  $scope.newTweet = function() {
    $state.go('app.single', {tweetId: 'new'})
  };

  $scope.delete = function(tweet, $index) {
    tweet.$delete({tweetId: tweet.id},function(){
      $scope.tweets.splice($index, 1);
      $ionicListDelegate.closeOptionButtons()
    })
  };

  $scope.copy = function(tweet) {
    console.log("copy" + tweet.content);
    $cordovaClipboard.copy(tweet.content).then(function (){
        alert("Copied!");
      }, function() {
        alert("Sorry Failed!");
      });
  };
})

.controller('TweetCtrl', function($scope, $stateParams, Tweet, $ionicHistory, $ionicNavBarDelegate, $state, $rootScope) {
    if ($stateParams.tweetId == "new") {
      $scope.tweet = new Tweet;
    }else{
      $scope.tweet = Tweet.get({tweetId: $stateParams.tweetId},function(tweet){
        $ionicNavBarDelegate.title(140 - tweet.content.length)
      })
    }

    $scope.save = function() {
      if ($stateParams.tweetId == "new") {
        $scope.tweet.$save(function(){
          $scope.goTweets();
        });
      }else{
        $scope.tweet.$update({tweetId: $stateParams.tweetId},function(){
          $scope.goTweets();
        });
      }

    };

    $scope.goTweets = function(){
      $scope.syncTweets();
      $state.go('app.tweets');
    };

    $scope.updateCounter = function() {
      $ionicNavBarDelegate.title(140 - $scope.tweet.content.length)
    }
});
