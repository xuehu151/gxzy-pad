angular.module('starter.lotteryFootball', [])
    .controller('lotteryFootballCtrl', function ($scope, $state,$util,$stateParams) {

        $scope.activityData = $stateParams.resdata;  //活动期间数据
        console.log("单关数据",$scope.activityData);
        $scope.headwin = 555; //压赢的
        $scope.headdraw = 178; //压平局的
        $scope.headlose = 844 ; //压输的
        $scope.noteOne = 200;

        $scope.multiple = 1; //倍数
        $scope.money = 200;//支付龙币数
        $scope. bonus = 0; //奖金
        $scope.betnum = [false,false,false];
        $scope.footOneData ='';
        $scope.headcount = $scope.headwin + $scope.headdraw + $scope.headlose;

        $scope.winpercent = ($scope.headwin/$scope.headcount*100).toFixed(3);
        $scope.drawpercent = ($scope.headdraw/$scope.headcount*100).toFixed(3);
        $scope.losepercent = ($scope.headlose/$scope.headcount*100).toFixed(3);

        $scope.multSmall=function(){ //减少倍数
            $scope.multiple <=1? $scope.multiple = 1:$scope.multiple--;
        };
        $scope.multBig=function(){ //增加倍数
            $scope.multiple++;
        };

        $scope.bunkoBtn = function (num) { //选输赢
            $scope.betnum[num] = !$scope.betnum[num];
            console.log( $scope.betnum);
        };

        $scope.betnum.forEach(function (value,index,array) {

            array[index]? $scope.bonus+= $scope.noteOne*$scope.multiple*$scope.activityData[0].v3:'';
        });

        var userInfo = $util.getUserInfo();
        console.log(userInfo.token)

    });
