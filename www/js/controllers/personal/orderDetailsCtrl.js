/**
 * Created by admin on 2018/2/28.
 */
angular.module ('starter.orderDetailsCtrl', [])

    .controller ('orderDetailsCtrl', function ($scope, $state, $ionicHistory, $ionicViewSwitcher, $stateParams) {
        $scope.orderInfos = $stateParams.order;
        console.info('order+++++++',$scope.orderInfos);
        $scope.goback = function () {
            $ionicHistory.goBack();//返回上一个页面
            $ionicViewSwitcher.nextDirection("back");
        }
    });