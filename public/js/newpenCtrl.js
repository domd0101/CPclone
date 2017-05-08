cpapp.controller('newpenCtrl',['$scope','userService',function($scope,userService){

  $scope.postPen = function() {
    var penValues = {
      penname : $scope.penName,
      users_id : $scope.userid,
      htmlval : editor1.getValue(),
      cssval : editor2.getValue(),
      jsval : editor3.getValue()
    }
    userService.postPen(penValues)
  }

  function getUser() {
    userService.getUser().then(function(user) {
      if (user) {
        console.log('ctrl -->',user);
        $scope.pic2 = user.pic;
        $scope.userid = user.id;
        $scope.name = user.name;
        $scope.nickname = user.nickname;
        $scope.pic = user.pic;
        $scope.penname='Untitled';
      }
      else {
        $scope.pic2 = 'https://i2.wp.com/codepen.io/assets/avatars/user-avatar-512x512-6e240cf350d2f1cc07c2bed234c3a3bb5f1b237023c204c782622e80d6b212ba.png?ssl=1';
        $scope.penname='Untitled';
        $scope.nickname='User';
      }
    })
  }
  getUser();

  var textarea1 = document.getElementById('htmlcode');
  var editor1 = CodeMirror.fromTextArea(textarea1, {
    theme: 'base16-dark',
    mode: 'html',
    lineWrapping: true,
    lineNumbers: true,
    scrollbarStyle: null
  });
  var textarea2 = document.getElementById('csscode');
  var editor2 = CodeMirror.fromTextArea(textarea2, {
    theme: 'base16-dark',
    mode: 'css',
    lineWrapping: true,
    lineNumbers: true,
    scrollbarStyle: null
  });
  var textarea3 = document.getElementById('jscode');
  var editor3 = CodeMirror.fromTextArea(textarea3, {
    theme: 'base16-dark',
    mode: "javascript",
    lineWrapping: true,
    lineNumbers: true,
    scrollbarStyle: null
  });
  var updateOutput = function() {
  $("iframe").contents().find("html").html("<html><style>"+editor2.getValue()+
  "</style><div>"+editor1.getValue()+"</div></html>");
  document.getElementById("out").contentWindow.eval(editor3.getValue());

 }
setInterval(function(){ updateOutput(); }, 3000);


}])
