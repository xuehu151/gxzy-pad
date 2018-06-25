angular.module('starter.lotteryFootball', [])
    .controller('lotteryFootballCtrl', function ($scope, $state, $util,$interval, $stateParams,BettingService, $rootScope,$errorPopupFactory) {
        var imgClass = ['./img/completeInfoSucceed.png', './img/completeInf.png'];
        $scope.successOrFaild = '您的余额不足,无法投注';
        $scope.imgagesUrl = imgClass[1];
        $scope.activityData = $stateParams.resdata;  //活动期间数据
        console.log("单关数据", $scope.activityData);
        var userId=$rootScope.userId;
        console.log(userId);
        $scope.scheme = $scope.activityData[1];
        // console.log( $scope.scheme.id);
        $scope.weekNow =''; //比赛周
        $scope.headwin = $scope.scheme.ballOneWinCount; //胜支持
        $scope.headdraw = $scope.scheme.ballOneTieCount; //平支持
        $scope.headlose = $scope.scheme.ballOneLossCount; //负支持
        $scope.noteOne = 150; //一注的龙币数
        $scope.multiple = 1; //倍数
        $scope.noteNum = 0 ;//注数
        $scope.money = 0;//支付龙币数
        $scope.bonus = 0; //奖金
        $scope.betnum = [false, false, false]; //选中没选中
        $scope.footOneData = '';
        $scope.headcount = $scope.headwin + $scope.headdraw + $scope.headlose;
        if($scope.headcount === 0){
            $scope.winpercent = 0 ;
            $scope.drawpercent = 0;
            $scope.losepercent = 0;
        }else {
            $scope.winpercent = ($scope.headwin / $scope.headcount * 100).toFixed(3);
            $scope.drawpercent = ($scope.headdraw / $scope.headcount * 100).toFixed(3);
            $scope.losepercent = ($scope.headlose / $scope.headcount * 100).toFixed(3);
        }


        $scope.weekNow = $util.getWeek($scope.activityData[0].week); //得到比赛在周几

        $scope.commonality = function () {
            $scope.money = $scope.noteOne * $scope.begNum * $scope.multiple;
            $scope.bonus = ($scope.begMoney*$scope.multiple).toFixed(2);
            $scope.noteNum = $scope.multiple * $scope.begNum;
        };
        $scope.begNum =0;
        $scope.begMoney =0;  //计算一倍最高奖金
        $scope.bunkoBtn = function (num) { //选输赢
            $scope.betnum[num] = !$scope.betnum[num];
            $scope.begNum =0;
            var begState =[]; //一倍的选中状态龙币数
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

        $scope.endT= $scope.activityData[0].endTime.split(' ',2)[1];//赛事截止时间
        var userInfo = $util.getUserInfo();
        console.log(userInfo.token)

        $scope.showOrderAlertCms = function () {
            if($scope.begNum<=0){
                alert("请至少选择一种赛果");
            }else {
                var resultDate = '';
                var teamArrey = ['3','1','0'];

                $scope.betnum.forEach(function (value,index,array) {
                    value ? resultDate+=teamArrey[index]:'';
                });

                var dataArrayBig = [];

                var investCode  =$scope.activityData[0].date+'|'+$scope.activityData[0].week+'|'+$scope.activityData[0].playId+'|'+resultDate+'^';

                console.log(investCode);
                var dataObj ={
                    investCode:investCode,
                    multiple:$scope.multiple,
                    betWay:"500",
                    planId: $scope.scheme.id
                };
                dataArrayBig.push(dataObj);
                var data ={
                    data:{
                        lotteryID:"20201",
                        payType:2,
                        businessmanId:userId,
                        vid:"20170518173820565014",
                        addFlag:"0",
                        data:dataArrayBig
                    }
                }
                BettingService.footBallAdd(data, userInfo.token)
                    .then(function (response) {
                        console.log(response);
                        if (response.error === '0') {
                            $scope.emptyAll();
                            $scope.successOrFaild = '投注成功!';
                            $scope.imgagesUrl = imgClass[0];
                            $errorPopupFactory.errorInfo($scope, $state, 'mine.myBonus', true, true, '继续投注', '个人中心');
                        } else if (response.error === '1110') {
                            $scope.successOrFaild = response.info;
                            $errorPopupFactory.errorInfo($scope, $state, 'login', false, false);
                        } else {
                            $scope.successOrFaild = response.info;
                            $errorPopupFactory.errorInfo($scope, $state, 'login', false, false);
                        }

                    })
            }


        };

    });


