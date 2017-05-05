cpapp.directive('newpenBar',function(){
  return{
    restrict: 'E',
    templateUrl:'./html/newpenBar.html',
    scope: {
      penName: '@',
      penUser: '@'
    },
    controller: 'newpenCtrl'
  }
})
