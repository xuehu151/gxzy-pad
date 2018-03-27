angular.module ('starter.controllers', [])

    .controller ('loginCtrl', function ($scope, $state, $loginService, $util, $cordovaToast, $timeout, $ionicLoading, $ionicModal,$errorPopupFactory) {
        var imgClass = ['./img/completeInfoSucceed.png', './img/completeInf.png'];
        var splitUrl = param.split ('?')[1];
        var loginArgument = splitUrl.split ('&');
        var lotteryId = loginArgument[0].split ('=')[1];
        var openId = loginArgument[1].split ('=')[1];
        var KEY = "a1b2c3d4e5f6g7";
        var sign = md5 (openId + KEY);
        var data = {
            data : {},
            params : {
                sign : sign,
                uid : openId
            }
        };
        console.info ('data', data);
        console.info ('openId', openId);
        console.info ('lotteryId', lotteryId);
        var reques = '';

        $loginService.login (data)
            .then (function (response) {
                reques = response.info;
                if (response.error === '0') {
                    $util.setUserInfo (response.data);
                    if(openId !== 'null' && lotteryId === 'null'){
                        // $timeout(function () {
                            $state.go('home');
                        // },1000);
                    }
                    else {
                        // $timeout (function () {
                            if (lotteryId === '2') {
                                $state.go ('superLotto');
                            }
                            else if (lotteryId === '31') {
                                $state.go ('arrangeThree');
                            }
                            else if (lotteryId === '40') {
                                $state.go ('arrangeFive');
                            }
                            else if (lotteryId === '0') {
                                $scope.successOrFaild = '暂未开放';
                                $scope.imgagesUrl = imgClass[1];
                                $errorPopupFactory.errorInfo ($scope, $state, 'home');
                            }
                        // }, 1000 * 2);
                    }
                }
                else {
                    $timeout (function () {
                        $scope.successOrFaild = response.info;
                        $scope.imgagesUrl = imgClass[1];
                        $errorPopupFactory.errorInfo ($scope, $state ,'login');
                    }, 1000 * 3);
                }
            });


    });