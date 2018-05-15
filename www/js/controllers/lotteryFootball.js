angular.module('starter.lotteryFootball', [])
    .controller('lotteryFootballCtrl', function ($scope, $state) {
        $scope.headwin = 555; //压赢的
        $scope.headdraw = 178; //压平局的
        $scope.headlose = 844 ; //压输的
        $scope.multiple = 1;
        $scope.betnum = 2;

        $scope.headcount = $scope.headwin + $scope.headdraw + $scope.headlose;

        $scope.winpercent = ($scope.headwin/$scope.headcount*100).toFixed(3);
        console.log($scope.winpercent);
        $scope.drawpercent = ($scope.headdraw/$scope.headcount*100).toFixed(3);
        console.log($scope.drawpercent)
        $scope.losepercent = ($scope.headlose/$scope.headcount*100).toFixed(3);
        console.log($scope.losepercent);

        $scope.multSmall=function(){ //减少倍数
            $scope.multiple <=1? $scope.multiple = 1:$scope.multiple--;
        }
        $scope.multBig=function(){ //增加倍数
            $scope.multiple++;
        }

        $scope.bunkoBtn = function (num) { //选输赢
            $scope.betnum = num;
        }
    });
