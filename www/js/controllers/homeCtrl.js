/**
 * Created by admin on 2018/1/19.
 */
angular.module ('starter.homeCtrl', [])

    .controller ('homeCtrl', function ($scope, $state, $ionicModal) {
        var imgClass = ['./img/completeInfoSucceed.png', './img/completeInf.png'];

        $scope.clickPlFn = function (num) {
            if(num === 2){
                $state.go('superLotto');
            }
            else if(num === 31){
                $state.go ('arrangeThree');
            }
            else if(num === 40){
                $state.go ('arrangeFive');
            }
            else{
                $scope.successOrFaild = '暂未开放';
                $scope.imgagesUrl = imgClass[1];
                $scope.integral.show ();
            }
        };

        //金额判断弹框
        $ionicModal.fromTemplateUrl ('templates/getOneBetModal.html', {
            scope : $scope,
            backdropClickToClose : true
        })
            .then (function (modal) {
                $scope.integral = modal;
            });

        $scope.cancelPop2 = function () {
            $scope.integral.hide ();
            //timeout3 (response);
        };

    });