/**
 * Created by admin on 2018/2/28.
 */
angular.module ('starter.orderDetailsCtrl', [])

    .controller ('orderDetailsCtrl', function ($scope, $state, $ionicHistory, $ionicViewSwitcher, $stateParams,$activityDiscount,$util) {
        $scope.orderInfos = $stateParams.order;
        console.log("dsdsdsd",$scope.orderInfos)

        if( $scope.orderInfos.lotteryKind === 0){
            $activityDiscount.footBall('',userInfo.token,$scope.orderInfos.ballPlanId)
                .then(function (response) {
                    if(response.error === "0"){
                        var footMessage = response.data[0];
                        for(var i=0; len = $scope.orderInfos.footBallMessage.length, i<len; i++){
                            var Data ={
                                week:'',
                                changci:'',
                                teamone:'',
                                teamtwo:'',
                                winTeam:'',
                                resultNum:'',
                                amidithion:'',
                                betRes:[]
                            };
                            var bet = $scope.orderInfos.footBallMessage[i].split('|');
                            var resData = bet[bet.length-1];
                            for(var j=0; j<resData.length; j++){
                                var result = {
                                    betrs :'',
                                    betNum:''
                                };
                                if(!footMessage[i].result){
                                    Data.resultNum = "VS";
                                    Data.amidithion = "待开奖";
                                }else {
                                    Data.resultNum =footMessage[i].result;
                                    var  resnum = footMessage[i].result.split(":");
                                    if(resnum[0] > resnum[1]){
                                        Data.amidithion = "主胜";
                                    }else if(resnum[1] > resnum[0]){
                                        Data.amidithion = "客胜";
                                    }else {
                                        Data.amidithion = "平局";
                                    }
                                }

                                if(resData[j] === '3'){  //用户投注的场次
                                    result.betrs = "主胜";
                                    result.betNum = footMessage[i].v3;
                                }else if(resData[j] === '0'){
                                    result.betrs = "客胜";
                                    result.betNum = footMessage[i].v0;
                                }else if(resData[j] === '1'){
                                    result.betrs = "平局";
                                    result.betNum = footMessage[i].v1;
                                }
                                Data.betRes.push(result);
                            }
                            Data.week = $util.getWeek(footMessage[i].week);
                            Data.changci = footMessage[i].playId;
                            Data.teamone = footMessage[i].hostTeam;
                            Data.teamtwo= footMessage[i].visitTeam;
                            $scope.orderInfos.lotteryList.push(Data);
                        }
                    }else {
                        $scope.successOrFaild = response.info;
                        $errorPopupFactory.errorInfo($scope, $state, 'login', false, false);
                    }

                })

        }

        console.info('order+++++++',$scope.orderInfos.lotteryList);
        $scope.goback = function () {
            $ionicHistory.goBack();//返回上一个页面
            $ionicViewSwitcher.nextDirection("back");
        }
    });

