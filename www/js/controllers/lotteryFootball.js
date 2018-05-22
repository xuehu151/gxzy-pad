angular.module('starter.lotteryFootball', [])
    .controller('lotteryFootballCtrl', function ($scope, $state, $util,$interval, $stateParams) {

        $scope.activityData = $stateParams.resdata;  //活动期间数据
        console.log("单关数据", $scope.activityData);
        $scope.headwin = 555; //压赢的
        $scope.headdraw = 178; //压平局的
        $scope.headlose = 844; //压输的
        $scope.noteOne = 200; //一注的龙币数
        $scope.multiple = 1; //倍数
        $scope.noteNum = 0 ;//注数
        $scope.money = 0;//支付龙币数
        $scope.bonus = 0; //奖金
        $scope.betnum = [false, false, false]; //选中没选中
        $scope.footOneData = '';
        $scope.headcount = $scope.headwin + $scope.headdraw + $scope.headlose;

        $scope.winpercent = ($scope.headwin / $scope.headcount * 100).toFixed(3);
        $scope.drawpercent = ($scope.headdraw / $scope.headcount * 100).toFixed(3);
        $scope.losepercent = ($scope.headlose / $scope.headcount * 100).toFixed(3);

        $scope.commonality = function () {
            $scope.money = $scope.noteOne * $scope.begNum * $scope.multiple;
            $scope.bonus = ($scope.begMoney*$scope.multiple).toFixed(2);
            $scope.noteNum = $scope.multiple * $scope.begNum;
        };
        $scope.begNum =0;
        $scope.begMoney =0;  //全选中一倍的总钱数
        $scope.bunkoBtn = function (num) { //选输赢
            $scope.betnum[num] = !$scope.betnum[num];
            $scope.begNum =0;
            var begState =[]; //一倍的选中状态
            var win = $scope.noteOne*$scope.activityData[0].v3;
            var draw = $scope.noteOne*$scope.activityData[0].v1;
            var lose = $scope.noteOne*$scope.activityData[0].v0;
            begState.push(win,draw,lose);
            $scope.betnum.forEach(function (value,index) {
                value ? $scope.begNum ++: begState[index] = 0;
            });
            $scope.begMoney=Math.max.apply(null, begState)/100; //取出最大值,算最高奖金
            // $scope.begMoney = (eval(begState.join("+")))/100;
            $scope.commonality();
        };

        $scope.multSmall = function () { //减少倍数
            $scope.multiple <= 1 ? $scope.multiple = 1 : $scope.multiple--;
            $scope.commonality();
        };
        $scope.multBig = function () { //增加倍数
            $scope.multiple >= 999 ? $scope.multiple = 999 : $scope.multiple++;
            $scope.commonality();
        };
        $scope.multipleChange = function () {
            $scope.commonality();
        };

        $scope.emptyAll = function () {
            $scope.betnum = [false, false, false];
            $scope.multiple = 1;
            $scope.money = 0;
            $scope.bonus = 0;
            $scope.noteNum = 0;
            $scope.begMoney =0;
            $scope.begNum = 0
        };
        $interval(function () {
            $scope.endTime = $util.countTime($scope.activityData[0].endTime);
        },1000);

        $scope.endT= $scope.activityData[0].endTime.split(' ',2);//赛事截止时间
        console.log( $scope.endT);
        var userInfo = $util.getUserInfo();
        console.log(userInfo.token)

    });
