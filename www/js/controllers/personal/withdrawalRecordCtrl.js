/**
 * Created by admin on 2018/2/24.
 */
angular.module ('starter.withdrawalRecordCtrl', [])

    .controller ('withdrawalRecordCtrl', function ($scope, $state, $rootScope, $util, $BonusRecordService, $WithdrawalRecordFactory, $errorPopupFactory) {
        $rootScope.nowModule = { index: 2 };
        $scope.imgagesUrl = './img/completeInf.png';
        var userInfo = $util.getUserInfo ();
        console.info (userInfo.token);
        var withdrawal = $scope.withdrawal = {
            moredata : true,
            withdrawalRecord : [],
            data : {
                data : {},
                params : {
                    pageNum : 1,
                    pageSize : 3
                }
            },
            loadMore : function () {
                $BonusRecordService.withdrawGetList (withdrawal.data, userInfo.token)
                    .then (function (response) {
                        if (response.error === '0') {
                            if (response.data.length !== 0) {
                                withdrawal.withdrawalRecord = withdrawal.withdrawalRecord.concat (response.data);
                                $scope.withdrawal.withdrawInfoList = $WithdrawalRecordFactory.withdrawalRecord (withdrawal.withdrawalRecord);
                                withdrawal.data.params.pageNum++;
                            }
                            else {
                                withdrawal.moredata = false;
                            }
                        }
                        else if(response.error === '1110'){
                            $scope.successOrFaild = response.info;
                            $errorPopupFactory.errorInfo ($scope, $state ,'login');
                                withdrawal.moredata = false;
                        }
                        else {
                            $scope.successOrFaild = '服务请求失败.请重新登录';
                            $errorPopupFactory.errorInfo ($scope, $scope.successOrFaild);
                        }

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
            }
        };

    });