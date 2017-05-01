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
      .state('pens',{
        url: '/pens',
        templateUrl: './html/pens.html',
        controller: 'mainCtrl'
      })
}])
