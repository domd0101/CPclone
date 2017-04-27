var cpapp = angular.module('cpapp',['ui.router']);

  cpapp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.when('','/home');
    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: './html/home.html',
        controller: 'mainCtrl'
      })
      .state('newpen',{
        url: '/newpen',
        templateUrl: './html/newpen.html',
        controller: 'mainCtrl'
      })
      // .state('roster',{
      //   url: '/roster',
      //   templateUrl: 'view/roster.html',
      //   controller: 'rosterCtrl'
      // })
      // .state('player',{
      //   url:'/player/:id',
      //   templateUrl: 'view/player.html',
      //   controller: 'playerCtrl'
      // })
}])
