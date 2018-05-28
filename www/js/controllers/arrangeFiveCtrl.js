/**
 * Created by admin on 2018/1/10.
 */
angular.module ('starter.arrangeFiveCtrl', [])

    .controller ('arrangeFiveCtrl', function ($scope, $state, $ionicModal, $util, $interval, getWareIssueService, BettingService, $errorPopupFactory,$getActivityData,$stateParams) {
        $scope.sessionJsonWarp = [];
        var imgClass = ['./img/completeInfoSucceed.png', './img/completeInf.png'];
        $scope.successOrFaild = '您的余额不足,无法投注';
        $scope.imgagesUrl = imgClass[1];
        $scope.multiple = '1';
        $scope.totalMoney = '0';
        $scope.isDisabled = true;
        $scope.noteOne = 150; //一注的龙币数
        //空状态
        $scope.dummyStatus = '././img/dummyStatus.png';

         //活动期间数据处理
         var activityData = $stateParams.resdata;
         var activityImg = $stateParams.resimg;
         var userId = $stateParams.userId;
         $scope.saleNum = 1;
         $scope.imgurl = {
            "background-image" : 'url(' + activityImg +')',
            "background-size": "100% 100%"
        }

         console.log('activityData',activityData);
         console.log('activityImg',activityImg);


         $getActivityData.ActivityData( $scope,activityData.startTime,activityData.endTime,activityData.discount);

        //设置排列3球万位号码
        $scope.numDataBit10000 = [];
        $scope.filterBit10000 = [];
        //设置排列3球千位号码
        $scope.numDataBit1000 = [];
        $scope.filterBit1000 = [];
        //设置排列3球百位号码
        $scope.numDataBit100 = [];
        $scope.filterBit100 = [];
        //设置排列3球十位号码
        $scope.numDataBit10 = [];
        $scope.filterBit10 = [];
        //设置排列3球个位号码
        $scope.numDataBit1 = [];
        $scope.filterBit1 = [];
        // Create the ball items   万位
        for (var j = 0; j < 10; j++) {
            var itemsBit10000 = {
                num : j,
                check : false
            };
            $scope.numDataBit10000.push (itemsBit10000);
        }
        //给万位添加点击事件
        $scope.addBit10000Click = function (item) {
            $scope.numDataBit10000 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit10000 = {
                        num : j,
                        check : true
                    };
                    $scope.filterBit10000[0] = item;
                    $scope.numDataBit10000.push (itemsBit10000);
                }
                else {
                    var itemsBit10000 = {
                        num : j,
                        check : false
                    };
                    $scope.numDataBit10000.push (itemsBit10000);
                }
            }
        };
        // Create the ball items   千位
        for (var j = 0; j < 10; j++) {
            var itemsBit1000 = {
                num : j,
                check : false
            };
            $scope.numDataBit1000.push (itemsBit1000);
        }
        //给千位添加点击事件
        $scope.addBit1000Click = function (item) {
            $scope.numDataBit1000 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit1000 = {
                        num : j,
                        check : true
                    };
                    $scope.filterBit1000[0] = item;
                    $scope.numDataBit1000.push (itemsBit1000);
                }
                else {
                    var itemsBit1000 = {
                        num : j,
                        check : false
                    };
                    $scope.numDataBit1000.push (itemsBit1000);
                }
            }
        };
        // Create the ball items   百位
        for (var j = 0; j < 10; j++) {
            var itemsBit100 = {
                num : j,
                check : false
            };
            $scope.numDataBit100.push (itemsBit100);
        }
        //给百位添加点击事件
        $scope.addBit100Click = function (item) {
            $scope.numDataBit100 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit100 = {
                        num : j,
                        check : true
                    };
                    $scope.filterBit100[0] = item;
                    $scope.numDataBit100.push (itemsBit100);
                }
                else {
                    var itemsBit100 = {
                        num : j,
                        check : false
                    };
                    $scope.numDataBit100.push (itemsBit100);
                }
            }
        };
        // Create the ball items   十位
        for (var j = 0; j < 10; j++) {
            var itemsBit10 = {
                num : j,
                check : false
            };
            $scope.numDataBit10.push (itemsBit10);
        }
        //给十位添加点击事件
        $scope.addBit10Click = function (item) {
            $scope.numDataBit10 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit10 = {
                        num : j,
                        check : true
                    };
                    $scope.filterBit10[0] = item;
                    $scope.numDataBit10.push (itemsBit10);
                }
                else {
                    var itemsBit10 = {
                        num : j,
                        check : false
                    };
                    $scope.numDataBit10.push (itemsBit10);
                }
            }
        };
        // Create the ball items   个位
        for (var j = 0; j < 10; j++) {
            var itemsBit1 = {
                num : j,
                check : false
            };
            $scope.numDataBit1.push (itemsBit1);
        }
        //给个位添加点击事件
        $scope.addBit1Click = function (item) {
            $scope.numDataBit1 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit1 = {
                        num : j,
                        check : true
                    };
                    $scope.filterBit1[0] = item;
                    $scope.numDataBit1.push (itemsBit1);
                }
                else {
                    var itemsBit1 = {
                        num : j,
                        check : false
                    };
                    $scope.numDataBit1.push (itemsBit1);
                }
            }
        };
        $scope.$watch ("filterBit10000+filterBit1000+filterBit100+filterBit10+filterBit1", function () {
            $scope.numData =
                {
                    red : []
                };
            if ($scope.filterBit10000.length > 0 && $scope.filterBit1000.length > 0 && $scope.filterBit100.length > 0 && $scope.filterBit10.length > 0 && $scope.filterBit1.length > 0) {
                $scope.numData.red.push ($scope.filterBit10000[0]);
                $scope.numData.red.push ($scope.filterBit1000[0]);
                $scope.numData.red.push ($scope.filterBit100[0]);
                $scope.numData.red.push ($scope.filterBit10[0]);
                $scope.numData.red.push ($scope.filterBit1[0]);
                console.log ($scope.numData);
                $scope.sessionJsonWarp.push ($scope.numData);
                console.log ("6464564", $scope.sessionJsonWarp);
                console.log("$scope.saleNum",$scope.saleNum)
                $scope.totalMoney = $scope.sessionJsonWarp.length * $scope.multiple * (parseInt($scope.noteOne* $scope.saleNum));
                // for(var i=0; i<$scope.numDataBit10000.length; i++){
                //     $scope.numDataBit10000[i].check = false;
                // }
                // for(var i=0; i<$scope.numDataBit100.length; i++){
                //     $scope.numDataBit1000[i].check = false;
                // }
                // for(var i=0; i<$scope.numDataBit100.length; i++){
                //     $scope.numDataBit100[i].check = false;
                // }
                // for(var i=0; i<$scope.numDataBit10.length; i++){
                //     $scope.numDataBit10[i].check = false;
                // }
                // for(var i=0; i<$scope.numDataBit1.length; i++){
                //     $scope.numDataBit1[i].check = false;
                // }
                var n = ['', '0', '00', '000', '0000'];
                for (var i = 0; i < n.length; i++) {
                    for (var j = 0; j < eval ("$scope.numDataBit1" + n[i]).length; j++) {
                        eval ("$scope.numDataBit1" + n[i])[j].check = false;
                    }
                }
                $scope.filterBit10000 = [];
                $scope.filterBit1000 = [];
                $scope.filterBit100 = [];
                $scope.filterBit10 = [];
                $scope.filterBit1 = [];

                if ($scope.sessionJsonWarp.length > 0) {
                    $scope.isDisabled = false;
                }
            }

        }, true);
        //店家点击机选，添加机选一注
        $scope.autoAddOneNote = function () {
            $scope.arrRed = [];
            addJson = {
                red : $scope.arrRed
            };
            //店主点击随机产生5个红号
            var randomRed = []; //原数组
            for (var i = 0; i < 10; i++) {
                randomRed[i] = i;
            }
            randomRed.sort (function () { //排序
                return 0.5 - Math.random ();
            });
            //随机打撒
            for (var j = 0; j < 5; j++) {
                var itemsRed = {
                    num : randomRed[j],
                    check : false
                };
                itemsRed.num = randomRed[j];
                $scope.arrRed.push (itemsRed);
            }

            //由于路由的切换,需本地保存session
            $scope.sessionJsonWarp.push (addJson);
            $scope.isDisabled = $util.forbidWhetherEmpty ($scope.sessionJsonWarp);

            $scope.totalMoney = $scope.sessionJsonWarp.length * $scope.multiple * (parseInt($scope.noteOne* $scope.saleNum));
        };
        //机选五注
        $scope.autoAddFiveNote = function () {
            for (var i = 0; i < 5; i++) {
                $scope.autoAddOneNote ();
            }
        };

        //点击删除一组
        $scope.deleteRow = function ($index) {
            $scope.sessionJsonWarp.splice ($index, 1); //点击删除本行
            $scope.isDisabled = $util.forbidWhetherEmpty ($scope.sessionJsonWarp, $scope.isDisabled);
            $scope.totalMoney = $scope.sessionJsonWarp.length * $scope.multiple * (parseInt($scope.noteOne* $scope.saleNum));
        };

        //清空
        $scope.emptyAll = function () {
            $scope.sessionJsonWarp = [];
            $scope.isDisabled = $util.forbidWhetherEmpty ($scope.sessionJsonWarp, $scope.isDisabled);
            $scope.multiple = '1';
            $scope.totalMoney = $scope.sessionJsonWarp.length * $scope.multiple * (parseInt($scope.noteOne* $scope.saleNum));
        };

        //倍数的变化
        $scope.multipleChange = function () {
            if ($scope.multiple > 1000) {
                $scope.multiple = '1';
            }
            $scope.totalMoney = $scope.sessionJsonWarp.length * $scope.multiple * (parseInt($scope.noteOne* $scope.saleNum));
        };

        var userInfo = $util.getUserInfo ();
        var data = {
            data : {},
            params : {
                lotteryID : 40
            }
        };
        getWareIssueService.getWareIssue (data, userInfo.token)
            .then (function (response) {
                console.info (response);
                if (response.error === '0') {
                    $scope.wareIssue = response.data.wareIssue;
                    $interval (function () {
                        var end_sale_time = $util.countTime (response.data.end_sale_time);
                        if (end_sale_time !== '0') {
                            $scope.endTime = end_sale_time.hours + '时' + end_sale_time.minute + '分' + end_sale_time.second + '秒';
                        }
                        else {
                            $scope.endTime = '0 分';
                        }
                    }, 1000)
                }
                else {
                    $scope.successOrFaild = response.info;
                    $scope.imgagesUrl = imgClass[1];
                    $errorPopupFactory.errorInfo ($scope, $state, 'login');
                }
            }, function (error) {
                //...
            });

        // 确认提交按钮
        $scope.showOrderAlertCms = function () {
            if ($scope.multiple * 1 <= 0 || $scope.multiple * 1 === '') { //投注倍数限制
                alert ('倍数不能为0或为空');
                return
            }
            //获取大乐透期号
            if ($scope.wareIssue !== undefined) {
                getpl5add ();
            }
            else {
                $scope.successOrFaild = '获取期号失败!';
                $scope.imgagesUrl = imgClass[1];
                $errorPopupFactory.errorInfo ($scope, $state, 'login');
            }
            // 大乐透投注接口信息
            function getpl5add () {
                var dataArrayBig = [];
                console.info ($scope.sessionJsonWarp);
                for (var i = 0; i < $scope.sessionJsonWarp.length; i++) {
                    var dataObj = {
                        investCode : "", //"investCode":"01,03,05,07,09*06,08"
                        multiple : $scope.multiple
                    };
                    var investCode = '';
                    for (var j = 0; j < $scope.sessionJsonWarp[i].red.length; j++) {
                        investCode += '*' + $scope.sessionJsonWarp[i].red[j].num;
                        if (investCode.substr (0, 1) === '*') investCode = investCode.substr (1); //截取第一位  *
                    }
                    dataObj.investCode = investCode;
                    dataArrayBig.push (dataObj);
                    console.log (dataArrayBig);
                }
                var data = {
                    data : {
                        wareIssue : $scope.wareIssue,
                        payType : 2,
                        vid : '',
                        data : dataArrayBig,
                        businessmanId : userId
                    },
                    params : {}
                };

                console.log (data);
                BettingService.pl5BetAdd (data, userInfo.token)
                    .then (function (response) {
                        console.info (response);
                        if (response.error === '0') {
                            $scope.successOrFaild = '投注成功!';
                            $scope.imgagesUrl = imgClass[0];
                            $scope.sessionJsonWarp = [];
                            $scope.isDisabled = true;
                            // $scope.totalMoney = parseInt($scope.sessionJsonWarp.length * $scope.noteOne * $scope.multiple* $scope.saleNum);

                            $scope.totalMoney = $scope.sessionJsonWarp.length * $scope.multiple * (parseInt($scope.noteOne* $scope.saleNum));
                            $errorPopupFactory.errorInfo ($scope, $state, 'mine.myBonus',true,true,'继续投注','个人中心');
                        }
                        else if (response.error === '1110') {
                            $scope.successOrFaild = response.info;
                            $errorPopupFactory.errorInfo ($scope, $state, 'login',false,false);
                        }
                        else {
                            $scope.successOrFaild = response.info;
                            $errorPopupFactory.errorInfo ($scope, $state, 'login',false,false);
                        }
                    }, function (error) {
                        alert ('获取投注信息失败，请检查网络');
                    });
            }
        };

    });
