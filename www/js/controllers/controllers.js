angular.module('starter.controllers', [])

    .controller('loginCtrl', function ($scope, $state, $loginService, $util, $cordovaToast, $timeout, $ionicLoading, $ionicModal, $errorPopupFactory, $activityDiscount,$rootScope) {
        var imgClass = ['./img/completeInfoSucceed.png', './img/completeInf.png'];
        var splitUrl = param.split('?')[1];
        var loginArgument = splitUrl.split('&');
        var lotteryId = loginArgument[0].split('=')[1];
        var openId = loginArgument[1].split('=')[1];
        var userId = loginArgument[2].split('=')[1];
        $rootScope.userId = userId;
        var KEY = "a1b2c3d4e5f6g7";
        var sign = md5(openId + KEY);
        var data = {
            data: {},
            params: {
                sign: sign,
                uid: openId
            }
        };
        console.info('data', data);
        console.info('userId', userId);
        console.info('openId', openId);
        console.info('lotteryId', lotteryId);
        var reques = '';

        $loginService.login(data)
            .then(function (response) {
                reques = response.info;
                console.info('response',response);
                if (response.error === '0') {
                    $util.setUserInfo(response.data);

                    if (openId !== 'null' && lotteryId === 'null') {
                        // $timeout(function () {
                        $state.go('home');
                        // },1000);
                    }
                    else {
                        // $timeout (function () {
                        var userInfo = $util.getUserInfo();
                        $activityDiscount.activityDiscount(data, userInfo.token)
                            .then(function (response) {
                                console.info('+++++++', response);
                                return {
                                    activityDiscount: response.data.activityDiscount,
                                    activityPicture: response.data.activityPicture
                                }

                            })
                            .then(function (res) {
                                if (lotteryId === '2') {
                                    $state.go('superLotto', { resdata: res.activityDiscount[2], resimg: res.activityPicture[6].img , userId:userId});
                                }
                                else if (lotteryId === '31') {
                                    $state.go('arrangeThree', { resdata: res.activityDiscount[0], resimg: res.activityPicture[4].img, userId:userId });
                                }
                                else if (lotteryId === '40') {
                                    $state.go('arrangeFive', { resdata: res.activityDiscount[1], resimg: res.activityPicture[5].img , userId:userId});
                                }
                                else if (lotteryId === '0') {
                                    // $scope.successOrFaild = '暂未开放';
                                    // $scope.imgagesUrl = imgClass[1];
                                    // $errorPopupFactory.errorInfo($scope, $state, 'home');
                                    $state.go("lotteryFootball")
                                }
                                else if (lotteryId === '1') {
                                    // $scope.successOrFaild = '暂未开放';
                                    // $scope.imgagesUrl = imgClass[1];
                                    // $errorPopupFactory.errorInfo($scope, $state, 'home');
                                    $state.go("twoLotteryFootball")
                                }
                            })


                        // }, 1000 * 2);
                    }
                }
                else {
                    $timeout(function () {
                        $scope.successOrFaild = response.info;
                        $scope.imgagesUrl = imgClass[1];
                        $errorPopupFactory.errorInfo($scope, $state, 'login');
                    }, 1000 * 3);
                }
            });


    });
