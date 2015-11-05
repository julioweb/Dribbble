var app = angular.module("dribbbleShots", []).value('version', '0.1');

app.controller("dribbbleShotsCtrl",
    function($scope, $http, $sce) {
        $scope.page = 0;
        $scope.per_page = 40;
        $scope.shotList = [];

        $scope.title = "Dribbble";

        var loadShots = function(page, per_page) {
            $scope.loading = true;
            $scope.page++;
            $http.get(UrlShots(page, per_page)).success(function(data, status) {
                for (var i in data)
                    $scope.shotList.push(data[i]);
                
                $scope.loading = false;
            }).error(function(data, status) {
                console.error = "Erro";
            });
        };
    
        loadShots($scope.page, $scope.per_page);

        $scope.GetMoreShots = function() {
            $scope.page++;
            loadShots($scope.page, $scope.per_page);
        };
    
        $scope.GetDetailShot = function(id) {
            $scope.loading = true;
            $http.get(UrlShots(null, null, id)).success(function(data, status) {                
                $scope.shotDetail = data;
                $scope.loading = false;
            }).error(function(data, status) {
                console.error = "Erro";
            });
        };
    
        $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
    }
);

var UrlShots = function(page, per_page, id) {
    var token = '58b50c0c73fc1e8b53db324be2bf1f3b85dcc75d5bd223b3e62d5ccfb6511d10';
    var domain = 'https://api.dribbble.com/v1/shots';
    var params;
    if (id == undefined)
        params = '?access_token=' + token + '&page=' + page + '&per_page=' + per_page;
    else
        params = '/' + id + '?access_token=' + token;

    var url = domain + params;

    return url;
};