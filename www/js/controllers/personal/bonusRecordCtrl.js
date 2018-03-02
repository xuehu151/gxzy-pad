/**
 * Created by admin on 2018/2/24.
 */
angular.module ('starter.bonusRecordCtrl', [])

    .controller ('bonusRecordCtrl', function ($scope, $state, $rootScope, $util, $BonusRecordFactory, $BonusRecordService, $errorPopupFactory) {
        $rootScope.nowModule = {index : 1};
        $scope.imgagesUrl = './img/completeInf.png';
        var userInfo = $util.getUserInfo ();
        var bonus = $scope.bonus = {
            moredata : true,
            bonusRecord : [],
            data : {
                data : {},
                params : {
                    pageNum : 1,
                    pageSize : 8
                }
            },
            loadMore : function () {
                $BonusRecordService.getUserInfo (bonus.data, userInfo.token)
                    .then (function (response) {
                        if (response.error === '0') {
                            if(response.data.length !== 0){
                                bonus.bonusRecord = bonus.bonusRecord.concat(response.data);
                                $scope.bonus.bonusInfoList = $BonusRecordFactory.bonusRecord (bonus.bonusRecord);
                                bonus.data.params.pageNum++;
                            }else {
                                bonus.moredata = false;
                            }
                        }
                        else if(response.error === '1110'){
                            $scope.successOrFaild = response.info;
                            $errorPopupFactory.errorInfo ($scope, $state ,'login');
                            bonus.moredata = false;
                        }
                        else {
                            $scope.successOrFaild = '服务请求失败.请重新登录';
                            $errorPopupFactory.errorInfo ($scope, $scope.successOrFaild);
                        }

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
            }
        };

        $scope.goToCheckOrders = function () {
            $state.go('mine.orderInquiry.orderDetails');
        }
    });