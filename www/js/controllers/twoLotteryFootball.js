angular.module('starter.twoLotteryFootball', [])
    .controller('twoLotteryFootballCtrl', function ($scope, $state, $util, $interval,$stateParams) {

        $scope.activityData = $stateParams.resdata;  //活动期间数据
        console.log("2串1数据",$scope.activityData);
        $scope.headwin = 999999999; //第一场压赢的
        $scope.headlose = 99 ; //第一场压输的
        $scope.twoheadwin =1 ; //第二场压赢的
        $scope.twoheadlose = 9999 ; //第二场压输的
        $scope.betnum = [false, false , false, false];
        $scope.oneMaxMoeny = 0; //第一场最大奖金
        $scope.twoMaxMoeny = 0; //第二场最大奖金
        $scope.noteOne = 200; //一注的龙币数
        $scope.multiple = 1; //倍数
        $scope.noteNum = 0 ;//注数
        $scope.bonus = 0; //奖金
        $scope.money = 0;//支付龙币数
        $scope.teamState = []

        $scope.commonality = function () {
            $scope.money = $scope.noteOne * $scope.begNum * $scope.multiple;
            $scope.bonus = ($scope.begMoney*$scope.multiple).toFixed(2);
            $scope.noteNum = $scope.multiple * $scope.begNum;
        };

    //三元运算符为了解决值太小出现浮点数;
        $scope.headcount = $scope.headwin + $scope.headlose;
        $scope.winpercent = parseInt($scope.headwin/$scope.headcount*100);
        $scope.winpercent <=0? $scope.winpercent =1:'';
        $scope.losepercent = 100- $scope.winpercent;


        $scope.twoheadcount = $scope.twoheadwin + $scope.twoheadlose;
        $scope.twowinpercent = parseInt($scope.twoheadwin/$scope.twoheadcount*100);
        $scope.twowinpercent <=0? $scope.twowinpercent =1:'';
        $scope.twolosepercent = 100- $scope.twowinpercent;


        $scope.multSmall=function(){ //减少倍数
            $scope.multiple <=1? $scope.multiple = 1:$scope.multiple--;
            $scope.commonality();
        };
        $scope.multBig=function(){ //增加倍数
            $scope.multiple >= 999 ? $scope.multiple = 999 : $scope.multiple++;
            $scope.commonality();
        };

        $scope.begNum =0;
        $scope.begMoney =0;  //计算一倍最高奖金
        $scope.bunkoBtn = function (num) { //选输赢
            $scope.betnum[num] = !$scope.betnum[num];
            $scope.begNum =0;
            var begState =[]; //一倍的选中状态龙币数
            //第一场
            var win = $scope.noteOne*$scope.activityData[0].v3;
            var lose = $scope.noteOne*$scope.activityData[0].v0;
            //第二场
            var twowin = $scope.noteOne*$scope.activityData[1].v3;
            var twolose = $scope.noteOne*$scope.activityData[1].v0;
            begState.push(win,lose,twowin,twolose);
            $scope.betnum.forEach(function (value,index) {
                value ? $scope.begNum ++: begState[index] = 0;
            });
            begState[0]>begState[1]?$scope.oneMaxMoeny = begState[0] : $scope.oneMaxMoeny = begState[1];
            begState[2]>begState[3]?$scope.twoMaxMoeny = begState[2] : $scope.twoMaxMoeny = begState[3];
            $scope.begMoney =($scope.oneMaxMoeny + $scope.twoMaxMoeny)/100;
            $scope.commonality();
        };
        $scope.multipleChange = function () {
            $scope.commonality();
        };

        $scope.emptyAll = function () {
            $scope.betnum = [false, false, false, false];
            $scope.multiple = 1;
            $scope.money = 0;
            $scope.bonus = 0;
            $scope.noteNum = 0;
            $scope.begMoney =0;
            $scope.begNum = 0
        };
        // $interval(function () {
        //     $scope.endTime = $util.countTime($scope.activityData[0].endTime);
        // },1000);

        // $scope.endT= $scope.activityData[0].endTime.split(' ',2);//赛事截止时间

    });
