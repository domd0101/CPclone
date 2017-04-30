cpapp.controller('mainCtrl',['$scope','mainService',function($scope,mainService){

$scope.test = 'test';

  $scope.picked = function(){
    var promise = mainService.picked();
    return promise.then(function(res){
      $scope.pick = [];
      for (var i = 0; i < 6; i++) {
        $scope.pick.push(res.data.data[i]);
      }
      return $scope.pick
    })
  }
  $scope.picked();

  $scope.posted = function(){
    var promise = mainService.posted();
    return promise.then(function(res){
      $scope.post = [];
      for (var i = 0; i < 3; i++) {
        $scope.post.push(res.data.data[i]);
      }
      return $scope.post
    })
  }
  $scope.posted();

  $scope.collections = function(){
    var promise = mainService.collections();
    return promise.then(function(res){
      $scope.collection = [];
      for (var i = 0; i < 3; i++) {
        $scope.collection.push(res.data.data[i]);
      }
      return $scope.collection
    })
  }
  $scope.collections();



}])
