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
        controller: 'newpenCtrl'
      })
      .state('pens',{
        url: '/pens',
        templateUrl: './html/pens.html',
        controller: 'mainCtrl'
      })
      .state('posts',{
        url: '/posts',
        templateUrl: './html/posts.html',
        controller: 'mainCtrl'
      })
      .state('collections',{
        url: '/collections',
        templateUrl: './html/collections.html',
        controller: 'mainCtrl'
      })
      .state('blog',{
        url: '/blog',
        templateUrl: './html/blog.html',
        controller: 'mainCtrl'
      })
      .state('newpost',{
        url: '/newpost',
        templateUrl: './html/newpost.html',
        controller: 'mainCtrl'
      })
      .state('searchpage',{
        url: '/searchpage',
        templateUrl: './html/searchpage.html',
        controller: 'searchctrl'
      })
      .state('viewpen',{
        url: '/viewpen/:title/:id',
        templateUrl: './html/viewpen.html',
        controller: 'penCtrl'
      })
}])
