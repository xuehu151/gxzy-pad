/**
 * Created by admin on 2018/1/19.
 */
angular.module ('starter.homeCtrl', [])

    .controller ('homeCtrl', function ($scope, $state, $errorPopupFactory) {
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
            else if(num === 1){
                $state.go ('mine.myBonus');
            }
            else{
                $scope.successOrFaild = '暂未开放';
                $scope.imgagesUrl = imgClass[1];
                $errorPopupFactory.errorInfo ($scope, $state, null);
            }
        };

    });
