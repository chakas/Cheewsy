var app=angular.module("chewsy",['ngMaterial']);

app.factory('searchService', function(){
  return {
    data: {
      query: '',
      order: ''
    }
    // Other methods or objects can go here
  };
});

app.controller('apiVendorDataCtrl', apiVendorDataCtrl);
app.controller('AppCtrl', AppCtrl);
app.controller('LeftCtrl', LeftCtrl);
app.controller('RightCtrl', RightCtrl);
app.controller('QueryCtrl', QueryCtrl);
//Controllers
function apiVendorDataCtrl($scope,$http,$log,searchService)
{
	$scope.data = searchService.data;
	$http.get("https://api.mongolab.com/api/1/databases/foodie/collections/foodie-collection?apiKey=WgTkFBwSW4OaYpTJTXh_teWtJNwIZVHR")
	.success(function(response) {
		$scope.names = response;
		$scope.numColumns = 3;
	    $scope.rows = [];
	    $scope.rows.length = Math.ceil($scope.names.length / $scope.numColumns);
	    $scope.cols = [];
	    $scope.cols.length = $scope.numColumns;
	    $scope.divsRep = chunk(response,4);
	});
}
function AppCtrl($scope, $timeout, $mdSidenav, $log) 
{
	  $scope.toggleLeft = function() {
	    $mdSidenav('left').toggle()
	                      .then(function(){
	                          $log.debug("toggle left is done");
	                      });
	  };
	  $scope.toggleRight = function() {
	    $mdSidenav('right').toggle()
	                        .then(function(){
	                          $log.debug("toggle RIGHT is done");
	                        });
	  };
}
function LeftCtrl($scope, $timeout, $mdSidenav, $log,searchService) 
{
	  $scope.close = function() {
	    $mdSidenav('left').close()
	                      .then(function(){
	                        $log.debug("close LEFT is done");
	                      });
	  };
}
function RightCtrl($scope, $timeout, $mdSidenav, $log) 
{
	  $scope.close = function() {
	    $mdSidenav('right').close()
	                        .then(function(){
	                          $log.debug("close RIGHT is done");
	                        });
	  };
}

function QueryCtrl($scope,searchService){
	$scope.data = searchService.data;
}

function chunk(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr
}