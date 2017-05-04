cpapp.controller('penCtrl',['$scope','mainService','$state','$stateParams','$http',function($scope,mainService,$state,$stateParams,$http){


$scope.picked2 = function(){
  var promise = mainService.picked();
  return promise.then(function(res){
    $scope.pickpage = [];
    for (var i = 0; i < 12; i++) {
      $scope.pickpage.push(res.data.data[i]);
    }
    $scope.onePen = $scope.pickpage.filter(function(data) {
      return data.id === $stateParams.id
    })
    console.log($scope.onePen[0].title)
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
      console.log($scope.penJS);
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
    $("#out").contents().find("html").html("<html><style>"+editor2.getValue()+
    "</style><body>"+editor1.getValue()+"</body></html>");
    document.getElementById("out").contentWindow.eval(editor3.getValue());
    }

    // setInterval(function(){ updateOutput(); }, 30000);
    setTimeout(function(){ updateOutput(); }, 3000);


}])
