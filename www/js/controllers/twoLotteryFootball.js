angular.module('starter.twoLotteryFootball', [])
    .controller('twoLotteryFootballCtrl', function ($scope, $state, $util, $interval,$stateParams) {

        $scope.activityData = $stateParams.resdata;  //活动期间数据
        console.log("2串1数据",$scope.activityData);
        $scope.headwin = 999999999; //第一场压赢的
        $scope.headlose = 99 ; //第一场压输的

        $scope.twoheadwin =1 ; //第二场压赢的
        $scope.twoheadlose = 9999 ; //第二场压输的

        $scope.betnum = 1;
        $scope.twobetnum = 1;
        $scope.multiple = 1;

    //三元运算符为了解决值太小出现浮点数;
        $scope.headcount = $scope.headwin + $scope.headlose;
        $scope.winpercent = parseInt($scope.headwin/$scope.headcount*100);
        $scope.winpercent <=0? $scope.winpercent =1:'';
        $scope.losepercent = 100- $scope.winpercent;


        $scope.twoheadcount = $scope.twoheadwin + $scope.twoheadlose;
        $scope.twowinpercent = parseInt($scope.twoheadwin/$scope.twoheadcount*100);
        $scope.twowinpercent <=0? $scope.twowinpercent =1:'';
        $scope.twolosepercent = 100- $scope.twowinpercent;


        $scope.multSmall=function(){ //减少倍数
            $scope.multiple <=1? $scope.multiple = 1:$scope.multiple--;
        };
        $scope.multBig=function(){ //增加倍数
            $scope.multiple++;
        };

        $scope.bunkoBtn = function (num) { //选输赢
            $scope.betnum = num;
        };
        $scope.bunkoBtnTwo = function (num) { //选输赢
            $scope.twobetnum = num;
        };

        // $interval(function () {
        //     $scope.endTime = $util.countTime($scope.activityData[0].endTime);
        // },1000);

        $scope.endT= $scope.activityData[0].endTime.split(' ',2);//赛事截止时间

    });
