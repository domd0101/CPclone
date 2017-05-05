cpapp.controller('newpenCtrl',['$scope',function($scope){

  $scope.Name='Untitled';
  $scope.User='User';

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
  var updateOutput = function() {
  $("iframe").contents().find("html").html("<html><style>"+editor2.getValue()+
  "</style><div>"+editor1.getValue()+"</div></html>");
  document.getElementById("out").contentWindow.eval(editor3.getValue());

 }
setInterval(function(){ updateOutput(); }, 3000);


}])
