cpapp.controller('mainCtrl',['$scope','mainService','$state','$stateParams','userService',function($scope,mainService,$state,$stateParams,userService){


  function getUser() {
    userService.getUser().then(function(user) {
      if (user) {
        $scope.pic2 = user.pic;
        $scope.userid = user.id;
        console.log($scope.userid);
      }
      else {
        $scope.pic2 = 'https://i2.wp.com/codepen.io/assets/avatars/user-avatar-512x512-6e240cf350d2f1cc07c2bed234c3a3bb5f1b237023c204c782622e80d6b212ba.png?ssl=1';
      }
      userService.getPens(user.id).then(function(pen){
        console.log(pen[0].penname);
        if(pen){
          $scope.penname1 = pen[0].penname
          $scope.penname2 = pen[1].penname
        }
        return $scope.penname1, $scope.penname2
      })
      userService.getPosts(user.id).then(function(pen){
        console.log(pen[0].title);
        if(pen){
          $scope.postname1 = pen[0].title
          $scope.postname2 = pen[1].title
        }
        return $scope.penname1, $scope.penname2, $scope.userid
      })
    })
  }
  getUser();

  $scope.loginLocal = function(username, password) {
    console.log('Logging in with', username, password);
    userService.loginLocal({
      username: username,
      password: password
    })
    .then(function(res) {
      getUser();
    })
  }
  $scope.logout = userService.logout;
  userService.getUser()



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
      return $scope.pick,$scope.pickpage
    })
  }
  $scope.picked();


  $scope.posted = function(){
    var promise = mainService.posted();
    return promise.then(function(res){
      $scope.post = [];
      $scope.post2 = [];
      for (var i = 0; i < 3; i++) {
        $scope.post.push(res[i]);
      }
      for (var i = 0; i < 12; i++) {
        $scope.post2.push(res[i]);
      }
      return $scope.post,$scope.post2
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
      $scope.collection2 = [];
      for (var i = 0; i < 3; i++) {
        $scope.collection.push(res[i]);
      }
      for (var i = 0; i < 18; i++) {
        $scope.collection2.push(res[i]);
      }
      return $scope.collection,$scope.collection2
    })
  }
  $scope.collections();

    $scope.save = function(search){
      $state.go('searchpage');
      localStorage.setItem('array', search);
      var g = localStorage.array;
    }

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
