cpapp.controller('mainCtrl',['$scope','mainService',function($scope,mainService){

$scope.test = 'test';

  $scope.picked = function(){
    var promise = mainService.picked();
    return promise.then(function(res){
      $scope.pick = [];
      $scope.pickpage = [];
      for (var i = 0; i < 6; i++) {
        $scope.pick.push(res.data.data[i]);
      }
      for (var i = 0; i < 12; i++) {
        $scope.pickpage.push(res.data.data[i]);
      }
      console.log($scope.pickpage);
      return $scope.pick,$scope.pickpage
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

  $scope.popular = function(){
    var promise = mainService.popular();
    return promise.then(function(res){
      $scope.pop = [];
      for (var i = 0; i < 3; i++) {
        $scope.pop.push(res.data.data[i]);
      }
      return $scope.pop
    })
  }
  $scope.popular();

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

/// iframe shit ?????????******%%%#@$$$$$$///////
// for (var j = 0; j < $scope.pick.length; j++) {
//   $scope.api.push('https://codepen.io/api/oembed?url='+$scope.pick[j].link+'&format=json&height=500')
// }
// console.log($scope.pick);
// console.log($scope.api);
// $scope.frame = [];
// var ben;
// var jim;
// for (var w = 0; w < $scope.api.length; w++) {
//   function ben(){
//   jim = $http.get($scope.api[w])
//   return jim.then(function(so){
//     console.log(so, w);
//     $scope.frame.push(so.html)
//   })
//   }
// }
//
// console.log($scope.frame);
// 'https://codepen.io/api/oembed?url='+$scope.pick.link+'&format=json&height=500'
// https://codepen.io/api/oembed?url=''''http://codepen.io/K-T/pen/ybbzWM''''&format=json&height=500
