cpapp.directive('penBar',function(){
  return{
    restrict: 'E',
    templateUrl:'html/penbar.html',
    scope: {
      penName: '@',
      penUser: '@'
    },
    controller: 'penCtrl'
  }
})
