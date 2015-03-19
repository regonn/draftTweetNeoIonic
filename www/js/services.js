angular.module('starter.services', ['ngResource'])

  .factory('Tweet', function ($resource) {
    return $resource('http://draft-tweet-ionic.herokuapp.com/tweets/:tweetId', null, {
      'update': {method:'PUT'},
      'delete': {method:'DELETE'}
    });
  });