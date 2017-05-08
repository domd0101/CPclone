cpapp.controller('profileCtrl',['$scope','userService',function($scope,userService){

  function getUser() {
    userService.getUser().then(function(user) {
      if (user) {
        console.log('ctrl -->',user);
        $scope.userid = user.id;
        $scope.name = user.name;
        $scope.nickname = user.nickname;
        $scope.pic = user.pic;
      }
      else   {
        $scope.nickname = 'NOT LOGGED IN'
        $scope.name = 'Try Logging in';
        $scope.pic = 'http://www.clipartbest.com/cliparts/7ia/o8d/7iao8dx5T.png';
      }

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



}])
