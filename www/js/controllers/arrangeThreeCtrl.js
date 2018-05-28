/**
 * Created by admin on 2018/1/10.
 */
angular.module ('starter.arrangeThreeCtrl', [])

    .controller ('arrangeThreeCtrl', function ($scope, $state,$ionicModal, $util,$interval, BettingService, getWareIssueService,$errorPopupFactory,$getActivityData,$stateParams) {
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
        $scope.imgurl = {
            "background-image" : 'url(' + activityImg +')',
            // "background-size": "100% 100%"
        }
        $scope.saleNum = 1;
        console.log(Date.parse(new Date(activityData.startTime)));
        console.log(Date.parse(new Date()));
        console.log(Date.parse(new Date(activityData.endTime)));

        $getActivityData.ActivityData( $scope,activityData.startTime,activityData.endTime,activityData.discount);

        //设置排列3球百位号码
        $scope.numDataBit100 = [];
        $scope.filterBit100 = [];
        //设置排列3球十位号码
        $scope.numDataBit10 = [];
        $scope.filterBit10 = [];
        //设置排列3球个位号码
        $scope.numDataBit1 = [];
        $scope.filterBit1 = [];
        // Create the ball items   百位
        for (var j = 0; j < 10; j++) {
            var itemsBit = {
                num: j,
                check: false
            };
            $scope.numDataBit100.push (itemsBit);
        }
        //给百位添加点击事件
        filterBit100 = [];
        $scope.addBit100Click = function (item) {
            $scope.numDataBit100 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit = {
                        num: j,
                        check: true
                    };
                    $scope.filterBit100[0] = item;
                    console.log($scope.filterBit100.length)
                    $scope.numDataBit100.push (itemsBit);
                }
                else {
                    var itemsBit1 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit100.push (itemsBit1);
                }
            }
        };
        // Create the ball items   十位
        for (var j = 0; j < 10; j++) {
            var itemsBit10 = {
                num: j,
                check: false
            };
            $scope.numDataBit10.push (itemsBit10);
        }
        //给十位添加点击事件
        filterBit10 = [];
        $scope.addBit10Click = function (item) {
            $scope.numDataBit10 = [];
            for (var i = 0; i < 10; i++) {
                if (item.num == i) {
                    var itemsBit10 = {
                        num: i,
                        check: true
                    };
                    $scope.filterBit10[0] = item;
                    console.log($scope.filterBit10.length)
                    $scope.numDataBit10.push (itemsBit10);
                }
                else {
                    var itemsBit10 = {
                        num: i,
                        check: false
                    };
                    $scope.numDataBit10.push (itemsBit10);
                }
            }
        };
        // Create the ball items   个位
        for (var j = 0; j < 10; j++) {
            var itemsBit1 = {
                num: j,
                check: false
            };
            $scope.numDataBit1.push (itemsBit1);
        }
        //给个位添加点击事件
        filterBit1 = [];
        $scope.addBit1Click = function (item) {
            $scope.numDataBit1 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit1 = {
                        num: j,
                        check: true
                    };
                    $scope.filterBit1[0] = item;
                    console.log(filterBit1.length);
                    $scope.numDataBit1.push (itemsBit1);
                }
                else {
                    var itemsBit1 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit1.push (itemsBit1);
                }
            }
        };
        $scope.$watch("filterBit100+filterBit10+filterBit1",function(){
            $scope.numData=
                {
                    red:[]
                };
            if($scope.filterBit100.length>0 && $scope.filterBit10.length>0 && $scope.filterBit1.length>0){
                    $scope.numData.red.push($scope.filterBit100[0]);
                    $scope.numData.red.push($scope.filterBit10[0]);
                    $scope.numData.red.push($scope.filterBit1[0]);
                console.log( $scope.numData);
                $scope.sessionJsonWarp.push($scope.numData);
                console.log("6464564",$scope.sessionJsonWarp);
                $scope.totalMoney = $scope.sessionJsonWarp.length * $scope.multiple * (parseInt($scope.noteOne* $scope.saleNum));
                // for(var i=0; i<$scope.numDataBit100.length; i++){
                //     $scope.numDataBit100[i].check = false;
                // }
                // for(var i=0; i<$scope.numDataBit10.length; i++){
                //     $scope.numDataBit10[i].check = false;
                // }
                // for(var i=0; i<$scope.numDataBit1.length; i++){
                //     $scope.numDataBit1[i].check = false;
                // }
                var n = ['','0','00'];
                for(var i=0;i<n.length;i++){
                    for(var j=0; j<eval("$scope.numDataBit1"+n[i]).length; j++){
                        eval("$scope.numDataBit1"+n[i])[j].check = false;
                    }
                }
                $scope.filterBit100 = [];
                $scope.filterBit10=[];
                $scope.filterBit1=[];

                if($scope.sessionJsonWarp.length>0){
                    $scope.isDisabled = false;
                }
            }

        },true);

        //店家点击机选，添加机选一注
        $scope.autoAddOneNote = function () {
            $scope.arrRed = [];
            addJson = {
                red : $scope.arrRed
            };
            //店主点击随机产生3个红号
            var randomRed = []; //原数组
            for (var i = 0; i < 10; i++) {
                randomRed[i] = i;
            }
            randomRed.sort (function () { //排序
                return 0.5 - Math.random ();
            });
            //随机打撒
            for (var j = 0; j < 3; j++) {
                var itemsRed = {
                    num : randomRed[j],
                    check : false
                };
                itemsRed.num = randomRed[j];
                $scope.arrRed.push (itemsRed);
            }
            $scope.sessionJsonWarp.push (addJson);
            $scope.isDisabled = $util.forbidWhetherEmpty ($scope.sessionJsonWarp, $scope.isDisabled);
            $scope.totalMoney = $scope.sessionJsonWarp.length * $scope.multiple * (parseInt($scope.noteOne* $scope.saleNum));
        };
        //机选五注
        $scope.autoAddFiveNote = function () {
            for(var i = 0; i  < 5; i++){
                $scope.autoAddOneNote();
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
            $scope.multiple = '1';
            $scope.isDisabled = $util.forbidWhetherEmpty ($scope.sessionJsonWarp, $scope.isDisabled);
            $scope.totalMoney = $scope.sessionJsonWarp.length * $scope.multiple * (parseInt($scope.noteOne* $scope.saleNum));
        };

        //倍数的变化
        $scope.multipleChange = function  () {
            if($scope.multiple > 1000){
                $scope.multiple = '1';
            }
            $scope.totalMoney = $scope.sessionJsonWarp.length * $scope.multiple * (parseInt($scope.noteOne* $scope.saleNum));
        };

        var userInfo = $util.getUserInfo ();
        console.log("token",userInfo.token);
        var data = {
            data : {},
            params : {
                lotteryID : 31
            }
        };
        getWareIssueService.getWareIssue (data, userInfo.token)
            .then (function (response) {
                console.info(response);
                if(response.error === '0'){
                    $scope.wareIssue = response.data.wareIssue;
                    $interval(function() {
                        var end_sale_time = $util.countTime(response.data.end_sale_time);
                        if (end_sale_time !== '0') {
                            $scope.endTime = end_sale_time.hours + '时' + end_sale_time.minute + '分' + end_sale_time.second + '秒';
                        }
                        else {
                            $scope.endTime = '0 分';
                        }
                    },1000)
                }
                else {
                    $scope.successOrFaild = response.info;
                    $scope.imgagesUrl = imgClass[1];
                    $scope.integral.show();
                }
            },function (error) {
                //...
            });

        // 确认提交按钮
        $scope.showOrderAlertCms = function () {
            if ($scope.multiple * 1 <= 0 || $scope.multiple * 1 === '') { //投注倍数限制
                alert('倍数不能为0或为空');
                return
            }
            //获取大乐透期号
            if($scope.wareIssue !== undefined){
                pl3BetAdd ();
            }
            else {
                $scope.successOrFaild = '获取期号失败!';
                $scope.imgagesUrl = imgClass[1];
                $scope.integral.show();
            }
            // 大乐透投注接口信息
            function pl3BetAdd () {
                var dataArrayBig = [];
                console.info($scope.sessionJsonWarp);
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

                console.log ('data',data);
                BettingService.pl3BetAdd (data, userInfo.token)
                    .then (function (response) {
                        console.info(response);
                        if (response.error === '0') {
                            $scope.successOrFaild = '投注成功!';
                            $scope.imgagesUrl = imgClass[0];
                            $scope.sessionJsonWarp = [];
                            $scope.isDisabled = true;
                            $scope.totalMoney = $scope.sessionJsonWarp.length * $scope.multiple * (parseInt($scope.noteOne* $scope.saleNum));
                            $errorPopupFactory.errorInfo ($scope, $state, 'mine.myBonus',true,true,'继续投注','个人中心');
                        }
                        else if(response.error === '1110'){
                            $scope.successOrFaild = response.info;
                            $errorPopupFactory.errorInfo ($scope, $state ,'login',false,false);
                        }
                        else {
                            $scope.successOrFaild = response.info;
                            $errorPopupFactory.errorInfo ($scope, $state ,'login',false,false);
                        }
                    }, function (error) {
                        alert('获取投注信息失败，请检查网络');
                    });
            }
        };
    });
