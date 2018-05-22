angular.module('starter.twoLotteryFootball', [])
    .controller('twoLotteryFootballCtrl', function ($scope, $state, $util, $interval,$stateParams) {

        $scope.activityData = $stateParams.resdata;  //活动期间数据
        console.log("2串1数据",$scope.activityData);
        $scope.oneTeamData =  $scope.activityData[0]; //第一场数据
        $scope.twoTeamData =  $scope.activityData[1]; //第二场数据
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
        $scope.oneTeamState = []; //第一场比赛方式
        $scope.twoTeamState = []; //第二场比赛方式

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

        //判断比赛规则
        $scope.oneTeamData.rqspfRateCount == -1?$scope.oneTeamState =['主胜','客不败']:['主不败','客胜'];
        $scope.twoTeamData.rqspfRateCount == -1?$scope.twoTeamState =['主胜','客不败']:['主不败','客胜'];

        var closeTime = ''; //两场比赛最先结束的时间
        var oneEndTime = new Date($scope.oneTeamData.endTime).getTime(); //第一场结束时间毫秒数
        var twoEndTime = new Date($scope.twoTeamData.endTime).getTime(); //第二场结束时间毫秒数
        oneEndTime>twoEndTime?closeTime = $scope.twoTeamData.endTime  : closeTime = $scope.oneTeamData.endTime

        $interval(function () {
            $scope.endTime = $util.countTime(closeTime);
        },1000);
        console.log('sdsdsdsd',closeTime);
        $scope.endT= closeTime.split(' ',2)[1];//赛事截止时间

        $scope.begNum =0; //选中几场
        $scope.begMoney =0;  //计算一倍最高奖金
        $scope.bunkoBtn = function (num) { //选输赢
            $scope.betnum[num] = !$scope.betnum[num];
            $scope.begNum =0;
            var begState =[]; //一倍的选中状态龙币数
            //第一场
            var win = $scope.noteOne*$scope.oneTeamData.v3;
            var lose = $scope.noteOne*$scope.oneTeamData.v0;
            //第二场
            var twowin = $scope.noteOne*$scope.twoTeamData.v3;
            var twolose = $scope.noteOne*$scope.twoTeamData.v0;
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

    });
