/**
 * Created by admin on 2018/2/24.
 */
angular.module ('starter.myBonusCtrl', [])

    .controller ('myBonusCtrl', function ($scope, $state, $rootScope, $util, $getUserInfoService, $errorPopupFactory) {
        $rootScope.nowModule = {index : 0};
        $scope.imgagesUrl = './img/completeInf.png';
        var userInfo = $util.getUserInfo ();
        console.info (userInfo.token);
        var data = {
            data : {},
            params : {}
        };
        $getUserInfoService.getUserInfo (data, userInfo.token)
            .then (function (response) {
                console.info (response);
                if (response.error === '0' ) {
                    $rootScope.realName = response.data.realName;
                    $scope.moneyInfoObj = {
                        bonusBalance : response.data.money + response.data.freeze,
                        usableMoney: response.data.money,
                        freeze : response.data.freeze
                    };
                }
                else if(response.error === '1110'){
                    $scope.successOrFaild = response.info;
                    alert(response.info);
                    $errorPopupFactory.errorInfo ($scope, $state ,'login');
                }
                else {
                    $scope.successOrFaild = '服务请求失败.请重新登录';
                    $errorPopupFactory.errorInfo ($scope, $scope.successOrFaild);
                }

            });
    });