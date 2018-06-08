angular.module('starter.twoLotteryFootball', [])
    .controller('twoLotteryFootballCtrl', function ($scope, $state, $util, $rootScope, $interval, $stateParams, BettingService, $errorPopupFactory) {
        var imgClass = ['./img/completeInfoSucceed.png', './img/completeInf.png'];
        $scope.successOrFaild = '您的余额不足,无法投注';
        $scope.imgagesUrl = imgClass[1];
        $scope.activityData = $stateParams.resdata;  //活动期间数据
        console.log("2串1数据", $scope.activityData);
        var userId = $rootScope.userId;
        console.log("userId", userId);
        $scope.oneTeamData = $scope.activityData[0]; //第一场数据
        $scope.twoTeamData = $scope.activityData[1]; //第二场数据
        $scope.twoScheme = $scope.activityData[2]; //2串1方案
        console.log('2串1', $scope.twoScheme);
        $scope.headwin = 0; //第一场压赢的
        $scope.headlose = 0; //第一场压输的
        $scope.twoheadwin = 0; //第二场压赢的
        $scope.twoheadlose = 0; //第二场压输的

        $scope.week = []; //比赛周几
        $scope.noteOne = 150; //一注的龙币数
        $scope.multiple = 1; //倍数
        $scope.noteNum = 0;//注数
        $scope.money = 0;//支付龙币数
        $scope.bonus = 0; //奖金

        $scope.oneBetnum = [false, false]; //第一场选中比赛结果
        $scope.twoBetnum = [false, false]; //第二场选中比赛结果

        $scope.oneOdds = [0, 0]; //第一场胜/负赔率
        $scope.twoOdds = [0, 0]; //第二场胜/负赔率

        $scope.oneTeamState = []; //第一场比赛方式
        $scope.twoTeamState = []; //第二场比赛方式

        $scope.commonality = function () {
            $scope.money = $scope.noteOne * $scope.begNum * $scope.multiple;
            $scope.bonus = ($scope.begMoney * $scope.multiple).toFixed(2);
            $scope.noteNum = $scope.multiple * $scope.begNum;
        };


        //判断比赛规则 根据'-1','+1'得到赔率
        if ($scope.oneTeamData.rqspfRateCount === "-1") {
            $scope.oneTeamState = ['主胜', '客不败'];
            $scope.oneOdds = [$scope.oneTeamData.v3, $scope.oneTeamData.letv0];
            $scope.headwin = $scope.twoScheme.ballOneHostWinCount;
            $scope.headlose = $scope.twoScheme.ballOneHostLossCount;

        } else {
            $scope.oneTeamState = ['主不败', '客胜'];
            $scope.oneOdds = [$scope.oneTeamData.letv3, $scope.oneTeamData.v0];
            $scope.headwin = $scope.twoScheme.ballOneHostWinCountOr;
            $scope.headlose = $scope.twoScheme.ballOneHostLossCountOr;
        }
        if ($scope.twoTeamData.rqspfRateCount === "-1") {
            $scope.twoTeamState = ['主胜', '客不败'];
            $scope.twoOdds = [$scope.twoTeamData.v3, $scope.twoTeamData.letv0];
            $scope.twoheadwin = $scope.twoScheme.ballTwoHostWinCount;
            $scope.twoheadlose = $scope.twoScheme.ballTwoHostLossCount;
        } else {
            $scope.twoTeamState = ['主不败', '客胜'];
            $scope.twoOdds = [$scope.twoTeamData.letv3, $scope.twoTeamData.v0];
            $scope.twoheadwin = $scope.twoScheme.ballTwoHostWinCountOr;
            $scope.twoheadlose = $scope.twoScheme.ballTwoHostLossCountOr;
        }

        //三元运算符为了解决值太小出现浮点数;

        $scope.headcount = $scope.headwin + $scope.headlose;
        if ($scope.headcount === 0) {
            $scope.winpercent = 0;
            $scope.losepercent = 0;

        } else {
            $scope.winpercent = parseInt($scope.headwin / $scope.headcount * 100);
            // $scope.winpercent <= 0 ? $scope.winpercent = 1 : '';
            $scope.losepercent = 100 - $scope.winpercent;
        }


        $scope.twoheadcount = $scope.twoheadwin + $scope.twoheadlose;

        if ($scope.twoheadcount === 0) {
            $scope.twowinpercent = 0;
            $scope.twolosepercent = 0;

        } else {
            $scope.twowinpercent = parseInt($scope.twoheadwin / $scope.twoheadcount * 100);
            // $scope.twowinpercent <= 0 ? $scope.twowinpercent = 1 : '';
            $scope.twolosepercent = 100 - $scope.twowinpercent;
        }


        //每场比赛在周几
        $scope.week.push($util.getWeek($scope.oneTeamData.week), $util.getWeek($scope.twoTeamData.week));

        $scope.closeWeek = '';//最先结束比赛周几
        var closeTime = ''; //两场比赛最先结束的时间
        var oneEndTime = new Date($scope.oneTeamData.endTime).getTime(); //第一场结束时间毫秒数
        var twoEndTime = new Date($scope.twoTeamData.endTime).getTime(); //第二场结束时间毫秒数

        if (oneEndTime > twoEndTime) {
            closeTime = $scope.twoTeamData.endTime;
            $scope.closeWeek = $scope.week[1];
        } else {
            closeTime = $scope.oneTeamData.endTime;
            $scope.closeWeek = $scope.week[0];
        }
        console.log(closeTime);
        $interval(function () {
            $scope.endTime = $util.countTime(closeTime);
            // console.log($scope.endTime);
        }, 1000);
        $scope.endT = closeTime.split(' ', 2)[1];//赛事截止时间

        //选择结果
        var stateCheck = [0, 0];
        $scope.oneBunkoBtn = function (num) {
            $scope.oneBetnum = [false, false];
            $scope.oneBetnum[num] = !$scope.oneBetnum[num];
            stateCheck[0] = 1;
            $scope.dataChange(stateCheck);

        };

        $scope.twoBunkoBtn = function (num) {
            $scope.twoBetnum = [false, false];
            $scope.twoBetnum[num] = !$scope.twoBetnum[num];
            stateCheck[1] = 1;
            $scope.dataChange(stateCheck);
        };

        $scope.multSmall = function () { //减少倍数
            $scope.multiple <= 1 ? $scope.multiple = 1 : $scope.multiple--;
        };
        $scope.multBig = function () { //增加倍数
            $scope.multiple >= 999 ? $scope.multiple = 999 : $scope.multiple++;

        };

        $scope.$watch('multiple', function () {
            $scope.dataChange(stateCheck);
        });

        $scope.dataChange = function (data) {
            if (eval(data.join('+')) > 1) {
                $scope.bonus = $scope.countMoney();
                $scope.noteNum = 1 * $scope.multiple;
                $scope.money = $scope.noteNum * $scope.noteOne;
            } else {
                $scope.bonus = 0;
                $scope.noteNum = 0;
                $scope.money = 0;
            }
        };

        //第一场结果 && 第二场结果()
        $scope.countMoney = function () {
            // 1-1 * 2-1
            if ($scope.oneBetnum[0] && $scope.twoBetnum[0]) {
                return $scope.bonusCount(1);
            }
            // 1-1 * 2-2
            if ($scope.oneBetnum[0] && $scope.twoBetnum[1]) {
                return $scope.bonusCount(2);
            }
            // 1-2 * 2-1
            if ($scope.oneBetnum[1] && $scope.twoBetnum[0]) {
                return $scope.bonusCount(3);
            }
            // 1-2 * 2-2
            if ($scope.oneBetnum[1] && $scope.twoBetnum[1]) {
                return $scope.bonusCount(4);
            }
        };

        //计算奖金
        $scope.bonusCount = function (num) {
            switch (num) {
                // 1-1 * 2-1
                case 1:
                    return ($scope.oneOdds[0] * $scope.twoOdds[0] * $scope.noteOne * $scope.multiple / 100).toFixed(2);
                // 1-1 * 2-2
                case 2:
                    return ($scope.oneOdds[0] * $scope.twoOdds[1] * $scope.noteOne * $scope.multiple / 100).toFixed(2);
                // 1-2 * 2-1
                case 3:
                    return ($scope.oneOdds[1] * $scope.twoOdds[0] * $scope.noteOne * $scope.multiple / 100).toFixed(2);
                // 1-2 * 2-2
                case 4:
                    return ($scope.oneOdds[1] * $scope.twoOdds[1] * $scope.noteOne * $scope.multiple / 100).toFixed(2);

                default :
            }

        };


        //清空
        $scope.emptyAll = function () {
            stateCheck = [0, 0];
            $scope.multiple = 1;
            $scope.noteNum = 0;
            $scope.money = 0;
            $scope.bonus = 0;
            $scope.oneBetnum = [false, false];
            $scope.twoBetnum = [false, false];
        };

        $scope.showOrderAlertCms = function () {

            if ($scope.oneBetnum[0] === $scope.oneBetnum[1] || $scope.twoBetnum[0] === $scope.twoBetnum[1]) {
                alert('两场比赛至少选一种结果');
            } else {

                // 20201 竞彩足球胜平负
                // 20206 竞彩足球让球胜平负
                // 20205 竞彩足球混合过关
                var lotteryID = ''; //过关类型

                var LotteryType = ['', ''];
                var resultDate = [0, 0]; //存储用户选中的结果
                $scope.oneBetnum[0] ? resultDate[0] = 3 : resultDate[0] = 0;
                $scope.twoBetnum[0] ? resultDate[1] = 3 : resultDate[1] = 0;
                console.log(resultDate);
                if ($scope.oneTeamData.rqspfRateCount === $scope.twoTeamData.rqspfRateCount) {  //都为'-1'&& '1'
                    if ($scope.oneTeamData.rqspfRateCount === "-1") {   //主队让球判断
                        if (resultDate[0] === resultDate[1]) {  //两场选中同样结果
                            if (resultDate[0] === 3) { //都选主胜
                                lotteryID = "20201";
                            } else {                   //都选客胜
                                lotteryID = "20206";
                            }

                        } else {              //两场选中不一样结果
                            lotteryID = "20205"; //混合过关
                            if (resultDate[0] === 3) {
                                LotteryType[0] = "20201" + '|';
                                LotteryType[1] = "20206" + '|';
                            } else {
                                LotteryType[0] = "20206" + '|';
                                LotteryType[1] = "20201" + '|';
                            }
                        }
                    } else {
                        if (resultDate[0] === resultDate[1]) {
                            if (resultDate[0] === 3) {
                                lotteryID = "20206" //让球胜平负
                            } else {
                                lotteryID = "20201"; //胜平负
                            }

                        } else {
                            lotteryID = "20205"; //混合过关
                            if (resultDate[0] === 3) {
                                LotteryType[0] = "20206" + '|';
                                LotteryType[1] = "20201" + '|';
                            } else {
                                LotteryType[0] = "20201" + '|';
                                LotteryType[1] = "20206" + '|';
                            }
                        }
                    }
                } else {  //一个'+1'一个'1'
                    if ($scope.oneTeamData.rqspfRateCount === "-1") {
                        if (resultDate[0] !== resultDate[1]) {
                            if (resultDate[0] === 3) {
                                lotteryID = "20201"; //胜平负
                            } else {
                                lotteryID = "20206" //让球胜平负
                            }
                        } else {
                            lotteryID = "20205"; //混合过关
                            if (resultDate[0] === 3) {
                                LotteryType[0] = "20201" + '|';
                                LotteryType[1] = "20206" + '|';
                            } else {
                                LotteryType[0] = "20206" + '|';
                                LotteryType[1] = "20201" + '|';
                            }
                        }
                    } else {
                        if (resultDate[0] !== resultDate[1]) {
                            if (resultDate[0] === 3) {
                                lotteryID = "20206"; //让球胜平负
                            } else {
                                lotteryID = "20201" //胜平负
                            }
                        } else {
                            lotteryID = "20205"; //混合过关
                            if (resultDate[0] === 3) {
                                LotteryType[0] = "20206" + '|';
                                LotteryType[1] = "20201" + '|';
                            } else {
                                LotteryType[0] = "20201" + '|';
                                LotteryType[1] = "20206" + '|';
                            }
                        }
                    }

                }
                console.log(lotteryID);
                console.log(LotteryType);

                //组合后台提交数据
                var oneData = $scope.oneTeamData.date + '|' + $scope.oneTeamData.week + '|' + $scope.oneTeamData.playId + '|' + LotteryType[0] + resultDate[0] + '^';
                var twoData = $scope.twoTeamData.date + '|' + $scope.twoTeamData.week + '|' + $scope.twoTeamData.playId + '|' + LotteryType[1] + resultDate[1] + '^';
                var dataArrayBig = [];
                var investCode = oneData + twoData;
                console.log("footdata",investCode);
                var dataObj = {
                    investCode: investCode,
                    multiple: $scope.multiple,
                    betWay: "502",
                    planId: $scope.twoScheme.id
                };
                dataArrayBig.push(dataObj);
                var data = {
                    data: {
                        lotteryID: lotteryID,
                        payType: 2,
                        businessmanId: userId,
                        vid: "20170518173820565014",
                        addFlag: "0",
                        data: dataArrayBig
                    }
                };
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
        }
    });




