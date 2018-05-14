/**
 * Created by admin on 2018/2/24.
 */
angular.module ('starter.openOrderCtrl', [])

    .controller ('openOrderCtrl', function ($scope, $state, $rootScope, $stateParams, $util, $allOrdersdService, $allOrdersFactory, $errorPopupFactory, $timeout) {
        $rootScope.nowModule = {index : 3,  listIndex: 6 };
        $scope.imgagesUrl = './img/completeInf.png';
        var status = $stateParams.status;
        var userInfo = $util.getUserInfo ();
        var vm = $scope.vm = {
            moredata : true,
            orderEach : [],
            data : {
                data : {},
                params : {
                    pageNum : 1,
                    pageSize : 8,
                    status : status
                }
            },
            loadMore : function () {
                $allOrdersdService.allOrders (vm.data, userInfo.token)
                    .then (function (response) {
                        console.info ('Orders', response);
                        if (response.error === '0' ) {
                            if(response.data.length !== 0){
                                vm.orderEach = vm.orderEach.concat(response.data);
                                $scope.vm.allOrders = $allOrdersFactory.allOrders (vm.orderEach, status);
                                vm.data.params.pageNum++;
                                console.info (' allOrders/', $scope.vm.allOrders);
                            }
                            else {
                                vm.moredata = false;
                            }
                        }
                        else if(response.error === '1110'){
                            $scope.successOrFaild = response.info;
                            $errorPopupFactory.errorInfo ($scope, $state ,'login');
                            vm.moredata = false;
                        }
                        else {
                            $scope.successOrFaild = '服务请求失败.请重新登录';
                            $errorPopupFactory.errorInfo ($scope, $scope.successOrFaild);
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
            }
        };

        $scope.goToCheckOrders = function (order) {
            $state.go('mine.orderInquiry.orderDetails',{order : order});
        }

    });
