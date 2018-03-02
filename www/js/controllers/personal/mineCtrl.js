/**
 * Created by admin on 2018/2/23.
 */
angular.module ('starter.mineCtrl', [])

    .controller ('mineCtrl', function ($scope, $state) {
        $scope.activeTab = function (index, status) {
            switch (index) {
                case 0:
                    $state.go ('mine.orderInquiry.allOrder', {status : status});
                    break;
                case 1:
                    $state.go ('mine.orderInquiry.outstandingOrder', {status : status});
                    break;
                case 2:
                    $state.go ('mine.orderInquiry.openOrder', {status : status});
                    break;
                case 3:
                    $state.go ('mine.orderInquiry.awardedOrder', {status : status});
                    break;
            }
        };

        $scope.goToTickets = function () {
            $state.go('home');
        }



    });