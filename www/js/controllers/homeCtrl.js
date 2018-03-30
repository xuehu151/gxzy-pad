/**
 * Created by admin on 2018/1/19.
 */
angular.module('starter.homeCtrl', [])

    .controller('homeCtrl', function ($scope, $state, $errorPopupFactory, $util, $activityDiscount) {
        var imgClass = ['./img/completeInfoSucceed.png', './img/completeInf.png'];

        var userInfo = $util.getUserInfo();
        var data = {
            data: {},
            params: {}
        };
        $activityDiscount.activityDiscount(data, userInfo.token)
            .then(function (response) {
                console.info('+++++++', response);
                // var discountData = response.data;
                return {
                    activityDiscount: response.data.activityDiscount,
                    activityPicture: response.data.activityPicture
                }

            })

            .then( function(res){
                $scope.activityPicture = res.activityPicture;
                $scope.clickPlFn = function (num) {

                    if (num === 2) {

                        $state.go('superLotto', { resdata: res.activityDiscount[2], resimg:  $scope.activityPicture[6].img });
                    }
                    else if (num === 31) {
                        $state.go('arrangeThree', { resdata: res.activityDiscount[0], resimg:  $scope.activityPicture[4].img });
                    }
                    else if (num === 40) {
                        $state.go('arrangeFive', { resdata: res.activityDiscount[1], resimg:  $scope.activityPicture[5].img });
                    }
                    else if (num === 1) {
                        $state.go('mine.myBonus', { resdata: res.activityDiscount[3], resimg:  $scope.activityPicture[7].img });
                    }
                    else {
                        $scope.successOrFaild = '暂未开放';
                        $scope.imgagesUrl = imgClass[1];
                        $errorPopupFactory.errorInfo($scope, $state, null);
                    }
                };
            })



    });
