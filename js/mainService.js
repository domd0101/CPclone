cpapp.service('mainService',['$http',function($http){


  this.picked = function(){
    var promise = $http.get('http://cpv2api.com/pens/picks');
    return promise.then(function(results){
      return results;
    })
  }
  this.posted = function(){
    var promise = $http.get('http://cpv2api.com/posts/picks');
    return promise.then(function(results){
      return results;
    })
  }
  this.popular = function(){
    var promise = $http.get('http://cpv2api.com/posts/popular');
    return promise.then(function(results){
      return results;
    })
  }
  this.collections = function(){
    var promise = $http.get('http://cpv2api.com/collections/picks');
    return promise.then(function(results){
      return results;
    })
  }



}])
