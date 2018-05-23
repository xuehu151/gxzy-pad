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

        $scope.week = []; //比赛周几
        $scope.noteOne = 200; //一注的龙币数
        $scope.multiple = 1; //倍数
        $scope.noteNum = 0 ;//注数
        $scope.money = 0;//支付龙币数
        $scope.bonus = 0; //奖金

        $scope.oneBetnum = [false, false]; //第一场比赛结果
        $scope.twoBetnum = [false, false]; //第二场比赛结果

        $scope.oneOdds = [0,0]; //第一场胜/负赔率
        $scope.twoOdds = [0,0]; //第二场胜/负赔率

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

        //判断比赛规则 根据'-1','+1'得到赔率
        if(Number($scope.oneTeamData.rqspfRateCount) === -1){
            $scope.oneTeamState =['主胜','客不败'];
            $scope.oneOdds = [$scope.oneTeamData.v3, $scope.oneTeamData.letv0];
        }else{
            $scope.oneTeamState =['主不败','客胜'];
            $scope.oneOdds = [$scope.oneTeamData.letv3, $scope.oneTeamData.v0];
        }
        if(Number($scope.twoTeamData.rqspfRateCount) === -1){
            $scope.twoTeamState =['主胜','客不败'];
            $scope.twoOdds = [$scope.twoTeamData.v3, $scope.twoTeamData.letv0];
        }else {
            $scope.twoTeamState =['主不败','客胜'];
            $scope.twoOdds = [$scope.twoTeamData.letv3, $scope.twoTeamData.v0];
        }


        //每场比赛在周几
        $scope.week.push($util.getWeek($scope.oneTeamData.week),$util.getWeek($scope.twoTeamData.week));

        $scope.closeWeek = '' ;//最先结束比赛周几
        var closeTime = ''; //两场比赛最先结束的时间
        var oneEndTime = new Date($scope.oneTeamData.endTime).getTime(); //第一场结束时间毫秒数
        var twoEndTime = new Date($scope.twoTeamData.endTime).getTime(); //第二场结束时间毫秒数

        if(oneEndTime>twoEndTime){
            closeTime = $scope.twoTeamData.endTime;
            $scope.closeWeek = $scope.week[1];
        }else{
            closeTime = $scope.oneTeamData.endTime;
            $scope.closeWeek = $scope.week[0];
        }

        $interval(function () {
            $scope.endTime = $util.countTime(closeTime);
        },1000);
        $scope.endT= closeTime.split(' ',2)[1];//赛事截止时间

        //选择结果
        var stateCheck = [0,0];
        $scope.oneBunkoBtn = function (num) {
            $scope.oneBetnum = [false, false];
            $scope.oneBetnum[num] = !$scope.oneBetnum[num];
            stateCheck[0] = 1;
            eval(stateCheck.join('+')) > 1? $scope.bonus=$scope.aaa():$scope.bonus = 0;

        };

        $scope.twoBunkoBtn = function (num) {
            $scope.twoBetnum = [false, false];
            $scope.twoBetnum[num] = !$scope.twoBetnum[num];
            stateCheck[1] = 1;
            eval(stateCheck.join('+')) > 1? $scope.bonus=$scope.aaa():$scope.bonus = 0;
            };



        $scope.emptyAll = function () {

        };

        $scope.aaa = function () {  //第一场结果 && 第二场结果
            // 1-1 * 2-1
            if($scope.oneBetnum[0] && $scope.twoBetnum[0]){
                return $scope.bonusCount(1);
            }
            // 1-1 * 2-2
            if($scope.oneBetnum[0] && $scope.twoBetnum[1]){
                return $scope.bonusCount(2);
            }
            // 1-2 * 2-1
            if($scope.oneBetnum[1] && $scope.twoBetnum[0]){
                return $scope.bonusCount(3);
            }
            // 1-2 * 2-2
            if($scope.oneBetnum[1] && $scope.twoBetnum[1]){
                return $scope.bonusCount(4);
            }
        }

        $scope.bonusCount = function (num) {
            switch(num){
                // 1-1 * 2-1
                case 1: return ($scope.oneOdds[0]*$scope.twoOdds[0]*$scope.noteOne*$scope.multiple/100).toFixed(2);
                // 1-1 * 2-2
                case 2: return ($scope.oneOdds[0]*$scope.twoOdds[1]*$scope.noteOne*$scope.multiple/100).toFixed(2);
                // 1-2 * 2-1
                case 3: return ($scope.oneOdds[1]*$scope.twoOdds[0]*$scope.noteOne*$scope.multiple/100).toFixed(2);
                // 1-2 * 2-2
                case 4: return ($scope.oneOdds[1]*$scope.twoOdds[1]*$scope.noteOne*$scope.multiple/100).toFixed(2);

                default :
            }

        }


    });




