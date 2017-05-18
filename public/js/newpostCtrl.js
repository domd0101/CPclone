cpapp.controller('newpostCtrl',['$scope','userService',function($scope,userService){

  $scope.postPost = function() {
    console.log('in it');
    userService.getUser().then(function(user) {
      // console.log(user);
      if (user) {$scope.userid = user.id;}
        var postValues = {
          title : $scope.postTitle,
          users_id : $scope.userid,
          url : $scope.url,
          editor : quill.getText(),
          css : $scope.css
        }
        console.log(postValues);
      userService.postPost(postValues)
    })
  }

  $scope.publish = function() {
    var publishValues = {
      title : $scope.postTitle,
      users_id : $scope.userid,
      url : $scope.url,
      editor : quill.getContents(),
      css : $scope.css
    }
    userService.publish(publishValues)
  }



}])
