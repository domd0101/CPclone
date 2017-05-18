cpapp.controller('penCtrl',['$scope','mainService','$stateParams','$http','userService',function($scope,mainService,$stateParams,$http,userService){

  $("#off").click(function(){
      $(".editor").toggleClass("editor2");
  });

  // editor1.markClean();
  // editor2.markClean();
  // editor3.markClean();


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

  $scope.ed=true;

  $scope.toggleed = function(para){
    if(para === 'on'){
      $scope.ed=true;
      console.log('on');
    }
    else if(para === 'off'){
      $scope.ed=false;
      console.log('off');
    }
  }


  var title = $stateParams.title;


$scope.picked2 = function(){
  if($stateParams.title==='pen'){
    var promise = mainService.picked();
  }
  else if ($stateParams.title==='search'){
    var g = localStorage.array;
    var promise = mainService.searching(g);
  }

  return promise.then(function(res){
    console.log(res);
    $scope.pickpage = [];
    for (var i = 0; i < 12; i++) {
      $scope.pickpage.push(res.data.data[i]);
    }
    $scope.onePen = $scope.pickpage.filter(function(data) {
      return data.id === $stateParams.id
    })
    console.log($scope.onePen[0])
    $http.get($scope.onePen[0].link+'.html')
    .then(function(details){
      $scope.penHTML = details.data;
      editor1.replaceSelection($scope.penHTML);
    });

    $http.get($scope.onePen[0].link+'.css')
    .then(function(details){
      $scope.penCSS = details.data;
      editor2.replaceSelection($scope.penCSS);
    });

    $http.get($scope.onePen[0].link+'.js')
    .then(function(details){
      $scope.penJS = details.data;
      editor3.replaceSelection($scope.penJS);
    });
    return $scope.onePen, $scope.penHTML, $scope.penCSS, $scope.penJS
  })
}
  if($stateParams.title==='pen'|| $stateParams.title==='search'){
    $scope.picked2();
  }
  else{
    var penname = $stateParams.title
    var g = $stateParams.id
    userService.getPens(g).then(function(res){
      console.log(res);
      $scope.pickpage = [];
      for (var i = 0; i < res.length; i++) {
        $scope.pickpage.push(res[i]);
      }
      $scope.onePen = $scope.pickpage.filter(function(data) {
        console.log(data);
        return data.penname === $stateParams.title
      })
      console.log($scope.onePen);
      editor1.replaceSelection($scope.onePen[0].html);
      editor2.replaceSelection($scope.onePen[0].css);
      editor3.replaceSelection($scope.onePen[0].js);
      return $scope.onePen
    })
  }
//
// Object
// css:"h1{color: green;}"
// html:"<h1>hello</h1>"
// id:8
// js:""
// penname:"demo pen"
// users_id:13

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
        editor1.markClean();
        editor2.markClean();
        editor3.markClean();

    var updateOutput = function() {
    $("iframe").contents().find("html").html("<html><style>"+editor2.getValue()+
    "</style><body>"+editor1.getValue()+"</body></html>");
    document.getElementById("out").contentWindow.eval(editor3.getValue());
    }

    // var billy = function(){
    //   setInterval(function(){ updateOutput(); }, 7000);
    // }

    setTimeout(function(){ updateOutput(); }, 3500);


}])
