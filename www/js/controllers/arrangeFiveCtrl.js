/**
 * Created by admin on 2018/1/10.
 */
angular.module ('starter.arrangeFiveCtrl', [])

    .controller ('arrangeFiveCtrl', function ($scope, $ionicModal, $util, getWareIssueService, BettingService) {
        $scope.sessionJsonWarp = [];
        var imgClass = ['./img/completeInfoSucceed.png', './img/completeInf.png'];
        $scope.successOrFaild = '您的余额不足,无法投注';
        $scope.imgagesUrl = imgClass[1];
        $scope.multiple = '1';
        $scope.totalMoney = '0';
        $scope.isDisabled = true;
        //空状态
        $scope.dummyStatus = '././img/dummyStatus.png';
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
            $scope.totalMoney = $scope.sessionJsonWarp.length * 2 * $scope.multiple;
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
            $scope.totalMoney = $scope.sessionJsonWarp.length * 2 * $scope.multiple;
        };

        //清空
        $scope.emptyAll = function () {
            $scope.sessionJsonWarp = [];
            $scope.isDisabled = $util.forbidWhetherEmpty ($scope.sessionJsonWarp, $scope.isDisabled);
            $scope.multiple = '1';
            $scope.totalMoney = $scope.sessionJsonWarp.length * 2 * $scope.multiple;
        };

        //倍数的变化
        $scope.multipleChange = function  () {
            if($scope.multiple > 1000){
                $scope.multiple = '1';
            }
            $scope.totalMoney = $scope.sessionJsonWarp.length * 2 * $scope.multiple;
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
                console.info(response);
                if(response.error === '0'){
                    $scope.wareIssue = response.data.wareIssue;
                    var end_sale_time = $util.countTime(response.data.end_sale_time);
                    $scope.endTime = end_sale_time.hours + '时' + end_sale_time.minute + '分' + end_sale_time.second + '秒';
                    console.info(end_sale_time);
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
                getpl5add ();
            }
            else {
                $scope.successOrFaild = '获取期号失败!';
                $scope.imgagesUrl = imgClass[1];
                $scope.integral.show();
            }
            // 大乐透投注接口信息
            function getpl5add () {
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
                        data : dataArrayBig
                    },
                    params : {}
                };

                console.log (data);
                BettingService.pl5BetAdd (data, userInfo.token)
                    .then (function (response) {
                        console.info(response);
                        if (response.error === '0') {
                            $scope.successOrFaild = '投注成功!';
                            $scope.imgagesUrl = imgClass[0];
                            $scope.sessionJsonWarp = [];
                            $scope.isDisabled = true;
                            $scope.totalMoney = $scope.sessionJsonWarp.length * 2 * $scope.multiple;
                            $scope.integral.show();
                        }
                        else {
                            $scope.successOrFaild = response.info;
                            $scope.integral.show();
                        }
                    }, function (error) {
                        alert('获取投注信息失败，请检查网络');
                    });
            }
        };
        
        //积分判断弹框
        $ionicModal.fromTemplateUrl ('templates/getOneBetModal.html', {
            scope : $scope,
            backdropClickToClose : true
        })
            .then (function (modal) {
                $scope.integral = modal;
            });

        $scope.cancelPop = function () {
            $scope.integral.hide ();
        };
    });