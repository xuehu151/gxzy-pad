// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in loading.js
var param = location.href;
angular.module ('starter', ['ionic', 'ngCordova', 'starter.CustomService', 'starter.controllers', 'starter.util', 'starter.services', 'starter.superLottoCtrl', 'starter.arrangeThreeCtrl', 'starter.arrangeFiveCtrl', 'starter.homeCtrl', 'starter.mineCtrl', 'starter.myBonusCtrl', 'starter.bonusRecordCtrl', 'starter.withdrawalRecordCtrl', 'starter.orderInquiryCtrl', 'starter.allOrderCtrl', 'starter.outstandingOrderCtrl', 'starter.openOrderCtrl', 'starter.awardedOrderCtrl', 'starter.orderDetailsCtrl'])

    .run (function ($ionicPlatform, $ionicHistory, $cordovaToast, $rootScope, $location) {
        $ionicPlatform.ready (function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar (true);
                cordova.plugins.Keyboard.disableScroll (true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault ();
            }

            /******************双击退出start********************/
            $ionicPlatform.registerBackButtonAction (function (e) {
                //判断处于哪个页面时双击退出
                if ($location.path () === '/home' || $location.path () === '/login') {
                    if ($rootScope.backButtonPressedOnceToExit) {
                        ionic.Platform.exitApp ();
                    }
                    else {
                        $rootScope.backButtonPressedOnceToExit = true;
                        $cordovaToast.showShortBottom ('再按一次退出系统');
                        setTimeout (function () {
                            $rootScope.backButtonPressedOnceToExit = false;
                        }, 2000);
                    }
                }
                else if ($ionicHistory.backView ()) {
                    $ionicHistory.goBack ();
                }
                else {
                    $rootScope.backButtonPressedOnceToExit = true;
                    $cordovaToast.showShortBottom ('再按一次退出系统');
                    setTimeout (function () {
                        $rootScope.backButtonPressedOnceToExit = false;
                    }, 2000);
                }
                e.preventDefault ();
                return false;
            }, 101);
            /********************双击退出end********************/

        });
    })

    .config (function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        //解决tabs在Android下局域顶部的方法
        $ionicConfigProvider.platform.ios.tabs.style ('standard');
        $ionicConfigProvider.platform.ios.tabs.position ('bottom');
        $ionicConfigProvider.platform.android.tabs.style ('standard');
        $ionicConfigProvider.platform.android.tabs.position ('bottom');
        $ionicConfigProvider.platform.ios.navBar.alignTitle ('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle ('center');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText ('').icon ('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText ('').icon ('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition ('ios');
        $ionicConfigProvider.platform.android.views.transition ('android');
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in loading.js
        $urlRouterProvider.when ('', 'login');
        $stateProvider
            .state ('login', {
                url : '/login',
                cache : 'false',
                prefetchTemplate : false,
                templateUrl : 'templates/login.html',
                controller : 'loginCtrl'
            })
            //主页
            .state ('home', {
                url : '/home',
                cache : 'false',
                prefetchTemplate : false,
                templateUrl : 'templates/home.html',
                controller : 'homeCtrl'
            })

            //个人中心status
            .state ('mine', {
                url : '/mine',
                cache : 'false',
                prefetchTemplate : false,
                templateUrl : 'templates/personal/mine.html',
                controller : 'mineCtrl'
            })

            .state ('mine.myBonus', {
                url : '/myBonus',
                cache : 'false',
                prefetchTemplate : false,
                templateUrl : 'templates/personal/myBonus.html',
                controller : 'myBonusCtrl'
            })

            .state ('mine.bonusRecord', {
                url : '/bonusRecord',
                cache : 'false',
                prefetchTemplate : false,
                templateUrl : 'templates/personal/bonusRecord.html',
                controller : 'bonusRecordCtrl'
            })

            .state ('mine.withdrawalRecord', {
                url : '/withdrawalRecord',
                cache : 'false',
                prefetchTemplate : false,
                templateUrl : 'templates/personal/withdrawalRecord.html',
                controller : 'withdrawalRecordCtrl'
            })

            .state ('mine.orderInquiry', {
                url : '/orderInquiry',
                cache : 'false',
                prefetchTemplate : false,
                templateUrl : 'templates/personal/orderInquiry.html',
                controller : 'orderInquiryCtrl'
            })

            .state ('mine.orderInquiry.allOrder', {
                url : '/allOrder',
                cache : 'false',
                prefetchTemplate : false,
                params : {'status' : null},
                templateUrl : 'templates/personal/allOrder.html',
                controller : 'allOrderCtrl'
            })

            .state ('mine.orderInquiry.outstandingOrder', {
                url : '/outstandingOrder',
                cache : 'false',
                prefetchTemplate : false,
                params : {'status' : null},
                templateUrl : 'templates/personal/outstandingOrder.html',
                controller : 'outstandingOrderCtrl'
            })

            .state ('mine.orderInquiry.openOrder', {
                url : '/openOrder',
                cache : 'false',
                prefetchTemplate : false,
                params : {'status' : null},
                templateUrl : 'templates/personal/openOrder.html',
                controller : 'openOrderCtrl'
            })

            .state ('mine.orderInquiry.awardedOrder', {
                url : '/awardedOrder',
                cache : 'false',
                prefetchTemplate : false,
                params : {'status' : null},
                templateUrl : 'templates/personal/awardedOrder.html',
                controller : 'awardedOrderCtrl'
            })

            .state ('mine.orderInquiry.orderDetails', {//订单详情
                url : '/orderDetails',
                cache : 'false',
                prefetchTemplate : false,
                params : {'order' : null},
                templateUrl : 'templates/personal/orderDetails.html',
                controller : 'orderDetailsCtrl'
            })

            //大乐透
            .state ('superLotto', {
                url : '/superLotto',
                cache : 'false',
                prefetchTemplate : false,
                templateUrl : 'templates/superLotto.html',
                controller : 'superLottoCtrl'
            })

            //排列三
            .state ('arrangeThree', {
                url : '/arrangeThree',
                cache : 'false',
                prefetchTemplate : false,
                templateUrl : 'templates/arrangeThree.html',
                controller : 'arrangeThreeCtrl'
            })

            //排列五
            .state ('arrangeFive', {
                url : '/arrangeFive',
                cache : 'false',
                prefetchTemplate : false,
                templateUrl : 'templates/arrangeFive.html',
                controller : 'arrangeFiveCtrl'
            });

    });
