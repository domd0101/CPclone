cpapp.controller('searchctrl',['$scope','mainService','$state',function($scope,mainService,$state){

$scope.show = true;

  $scope.save2 = function(search){
    localStorage.setItem('array', search);
    var g = localStorage.array;
    $scope.searching(g);
  }

  $scope.searching = function(a){
    var a = localStorage.array;
    var promise = mainService.searching(a);
    return promise.then(function(res){
      $scope.searchstuff = [];
      for (var i = 0; i < 12; i++) {
        $scope.searchstuff.push(res.data.data[i]);
      }
      console.log($scope.searchstuff);
      // setTimeout(function(){  }, 2000);
      // localStorage.setItem('array',)
      return $scope.searchstuff
    })
  }
  $scope.searching();

}])
