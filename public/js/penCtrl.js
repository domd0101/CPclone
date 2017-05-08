cpapp.controller('penCtrl',['$scope','mainService','$stateParams','$http',function($scope,mainService,$stateParams,$http){

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
  $scope.picked2();


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
