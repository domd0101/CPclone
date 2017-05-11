cpapp.controller('profileCtrl',['$scope','userService',function($scope,userService){

  $scope.pen=true;
  $scope.post=true;

  function getUser() {
    userService.getUser().then(function(user) {
      if (user) {
        console.log('ctrl -->',user);
        $scope.userid = user.id;
        $scope.name = user.name;
        $scope.nickname = user.nickname;
        $scope.pic = user.pic;
        $scope.login = '/#!/profile';
        $scope.logout_href = '/auth/logout';
        $scope.notname = 'Not '+$scope.name+'?';
        $scope.logout = 'Click to Logout';
      }
      else   {
        $scope.nickname = 'NOT LOGGED IN'
        $scope.name = 'Click Red X to Login';
        $scope.pic = 'http://www.clipartbest.com/cliparts/7ia/o8d/7iao8dx5T.png';
        $scope.login = '/auth';
        $scope.logout = ' ';
      }
      return $scope.userid
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


  function getPens(){
    userService.getUser().then(function(user){
      if(user){
      var id = $scope.userid;
    userService.getPens(id).then(function(pens) {
        if (pens) {
          console.log('ctrl pens --> lokk',pens);
          console.log(pens[0].users_id);
          $scope.userpens = [];
          for(var i=0;i<pens.length;i++){
          $scope.userpens.push(pens[i]);
          }
          console.log($scope.userpens);
          return $scope.userpens
        }
        else  {
          $scope.penname = 'untitled';
        }
      })
      .then(userService.getPosts(id).then(function(posts){
        if (posts) {
          console.log('ctrl post --> lokk',posts);
          console.log(posts[0].users_id);
          $scope.userposts = [];
          for(var i=0;i<posts.length;i++){
          $scope.userposts.push(posts[i]);
          }
          console.log($scope.userposts);
          return $scope.userposts
        }
      }))
    }
   })
  }
  getPens();


}])
