cpapp.service('mainService',['$http',function($http){

  this.picked = ()=>{
    var promise = $http.get('http://cpv2api.com/pens/picks');
    return promise.then((res)=>res)
  }
  this.posted = ()=>{
    var promise = $http.get('http://cpv2api.com/posts/picks');
    return promise.then((res)=>res)
  }
  this.popular = ()=>{
    var promise = $http.get('http://cpv2api.com/posts/popular');
    return promise.then((res)=>res)
  }
  this.collections = ()=>{
    var promise = $http.get('http://cpv2api.com/collections/picks');
    return promise.then((res)=>res)
  }
  this.searching = (para)=>{
    var promise = $http.get('http://cpv2api.com/search/pens?q='+para+'');
    return promise.then((res)=>res)
  }

}])
