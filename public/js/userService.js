cpapp.service('userService', function($http) {

  this.loginLocal = function(credentials) {
    return $http({
      method: "POST",
      url: '/auth/local',
      data: credentials
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log('ERROR LOGGING IN!', err);
    })
  }

  this.getUser = function() {
    return $http({
      method: 'GET',
      url: '/auth/me'
    })
    .then(function(res) {
      // console.log('userservice data',res.data);
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  this.logout = function() {
    return $http({
      method: 'GET',
      url: '/auth/logout'
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  this.postPen = function(penValues){
    return $http({
      method: 'POST',
      url: '/postPen',
      data: penValues
    })
  }

  this.postPost = function(postValues){
    return $http({
      method: 'POST',
      url: '/postPost',
      data: postValues
    })
  }

  this.getPens = function(id){
    return $http({
      method: 'POST',
      url: '/getPens',
      data: { id }
    })
    .then(function(res) {
      return res.data;
    })
  }
  this.getPosts = function(id){
    return $http({
      method: 'POST',
      url: '/getPosts',
      data: { id }
    })
    .then(function(res) {
      return res.data;
    })
  }






})
