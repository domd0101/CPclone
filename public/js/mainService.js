cpapp.service('mainService',['$http',function($http){

  this.picked = ()=>{
    var promise = $http.get('http://cpv2api.com/pens/picks');
    return promise.then((res)=>res)
  }
  this.posted = ()=>{
    var promise = $http.get('http://cpv2api.com/posts/picks')
      promise.then((res)=>{this.res = res; return this.res})
    var promise2 = $http.get('http://cpv2api.com/posts/picks?page=2')
      return promise2.then((res2)=>{
        let all =  this.res.data.data.concat(res2.data.data);
        return all;
      })
  }
  this.popular = ()=>{
    var promise = $http.get('http://cpv2api.com/posts/popular');
    return promise.then((res)=>res)
  }
  this.collections = ()=>{
    var promise = $http.get('http://cpv2api.com/collections/picks');
      promise.then((res)=>{this.res = res; return this.res})
    var promise2 = $http.get('http://cpv2api.com/collections/picks?page=2')
      return promise2.then((res2)=>{
        let all =  this.res.data.data.concat(res2.data.data);
        return all;
      })
  }
  this.searching = (para)=>{
    var promise = $http.get('http://cpv2api.com/search/pens?q='+para+'');
    return promise.then((res)=>res)
  }

}])
