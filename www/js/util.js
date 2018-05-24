/*
 * 创建人：
 * 类描述：服务器地址访问类
 */
angular.module ('starter.util', [])
    .factory ('$util', function ($http, $q, $ionicLoading) {
        /* 接口地址  */
        var ipUrl = 'http://47.104.29.94:8090';      //本地ip地址或者域名
        // var ipUrl = 'http://103.235.237.134';      //本地ip地址或者域名
        // var ipUrl = 'http://192.168.1.109:8080';    //刘一星

        var httpURL = {
            loginUrl : ipUrl + '/service/common/sign', //登录
            pl3AddUrl : ipUrl + '/service/lottery/pl3add', //排列3投注
            pl5AddUrl : ipUrl + '/service/lottery/pl5add', //排列5投注
            dltAddUrl : ipUrl + '/service/lottery/dltadd', //大乐透投注
            footBallAddUrl : ipUrl + '/service/lottery/footBallAdd', //足彩投注
            getWareIssueUrl : ipUrl + '/service/lottery/getWareIssue',   //获取期号
            pl3addAutoUrl : ipUrl + '/service/lottery/pl3addAuto',   //排列三自动投注
            getUserUrl : ipUrl + '/service/customer/getUser',   //用户信息
            getListUrl : ipUrl + '/service/bonus/getList',   //奖金纪录
            withdrawGetListUrl : ipUrl + '/service/cash/getList',   //提现纪录
            ordersGetListUrl : ipUrl + '/service/lottery/getList',   //全部订单
            activityDiscountUrl : ipUrl + '/service/lottery/activityDiscount', //折扣信息
            homeImageUrl : ipUrl +  '/service/common/image', // 入口图片
            zcAddUrl: ipUrl + '/service/ball/getPlan', //足彩投注

        };
        return {
            /* 返回httpURL  */
            getHttpURL : function () {
                return httpURL;
            },

            /* 清除用户信息  */
            removeUserInfo : function () {
                userInfo = null;
                window.localStorage.removeItem ("userInfo");
            },

            /* 保存用户信息  */
            setUserInfo : function (userInfo) {
                window.localStorage.setItem ("userInfo", JSON.stringify (userInfo));
            },

            /* 获取用户信息  */
            getUserInfo : function () {
                var localUserInfo = window.localStorage.getItem ("userInfo");
                try {
                    userInfo = JSON.parse (localUserInfo);
                } catch (error) {
                    userInfo = null;
                }
                return userInfo;
            },

            /* 格式化日期  */
            formatDate : function (date) {
                var y = date.getFullYear ();
                var m = date.getMonth () + 1;
                m = m < 10 ? '0' + m : m;
                var d = date.getDate ();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },

            /* 判定数组为空时禁止点击效果 */
            forbidWhetherEmpty : function (arr, isDisabled) {
                if (arr.length !== 0) {
                    isDisabled = false;
                }
                else {
                    isDisabled = true;
                }
                return isDisabled
            },

            /*距离某一时间还有多少长时间*/
            countTime : function (setTime) {
                var date = new Date ();//获取当前时间
                var now = date.getTime ();

                var endDate = new Date (setTime); //设置截止时间
                var end = endDate.getTime ();

                var leftTime = end - now;//计算时间差
                var d, h, m, s;
                if (leftTime >= 0) {//定义变量 d,h,m,s保存倒计时的时间
                    d = Math.floor (leftTime / 1000 / 60 / 60 / 24);
                    h = Math.floor (leftTime / 1000 / 60 / 60 % 24);
                    m = Math.floor (leftTime / 1000 / 60 % 60);
                    s = Math.floor (leftTime / 1000 % 60);
                    return {
                        /*hours:checkTime (d*24 + h),
                         minute:checkTime (m),
                         second:checkTime (s)*/
                        hours : checkTime((d * 24 + h)),
                        minute : checkTime(m),
                        second : checkTime(s)
                    }
                }
                else {
                    return '0'
                }
                function checkTime (i) { //将0-9的数字前面加上0，例1变为01
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                }
                //return hours, minute, second;
            },
            /* HTTP请求 post */
            httpPostRequest : function (url, data, token) {
                $ionicLoading.show ({
                    template: 'Loading...'
                });
                var deferred = $q.defer ();
                var promise = deferred.promise;
                $http ({
                    method : 'POST',
                    url : url,
                    data : data.data,
                    params : data.params,
                    headers : {
                        "content-type" : "application/json;multipart/form-data;charset=UTF-8",
                        "Auth-Token" : token
                    },
                    timeout : 1000 * 10
                    /*transformRequest: function (obj) {
                     var str = [];
                     for (var s in obj) {
                     str.push (encodeURIComponent (s) + "=" + encodeURIComponent (obj[s]));
                     }
                     return str.join ("&");
                     },
                     timeout: 3000*/
                }).success (function (response) {
                    //return success
                    $ionicLoading.hide ();
                    deferred.resolve (response);
                }).error (function (response) {
                    //return error
                    $ionicLoading.hide ();
                    deferred.reject (response);
                    //$cordovaToast.showLongBottom ('网络访问超时');
                });
                return promise;
            },
            /* 根据数字判断今天周几 */
            getWeek: function (week) {
                var week = Number(week);
                switch(week)
                {
                    case 1: return '周一';
                    case 2: return '周二';
                    case 3: return '周三';
                    case 4: return '周四';
                    case 5: return '周五';
                    case 6: return '周六';
                    case 7: return '周天';
                    default:
                }

            },



            getDate:function () {
                return data = [
                    {
                        addFlag: 0,
                        channelName: "扫码兑换",
                        channelNotice: 0,
                        createDate: "2018-05-09 17:00:19",
                        customer_phone: "15596827206",
                        customer_realName: "柳树",
                        dcurrencyAmount: 150,
                        delFlag: "0",
                        drawTime: "2018-05-09 20:30:00",
                        id: 8264,
                        lotteryID: "0",
                        lotteryList:
                            [
                                {

                                    addFlag: 0,
                                    betAmount: 1,
                                    betWay: "10051051",
                                    createDate: "2018-05-09 17:00:19",
                                    customer_phone: "15596827206",
                                    customer_realName: "柳树",
                                    delFlag: "0",
                                    drawTime: "2018-05-09 20:30:00",
                                    id: 8410,
                                    investCode: [
                                        {
                                            changci: "021",
                                            week: '周五',
                                            teamone: '莱恩',
                                            teamtwo: '瓦哈卡',
                                            num: '3:2',
                                            end: '0'
                                        }
                                    ],
                                    lotteryID: "0",
                                    money: 2600,
                                    multiple: 1,
                                    payType: 2,
                                    printTime: "2018-05-09 17:00:20",
                                    status: 3,
                                    ticketID: "20180509170019356182",
                                    updateDate: "2018-05-09 21:36:47",
                                    wareIssue: "2018122",
                                    winamt: 0
                                }
                            ],
                        money: 2,
                        notice: 0,
                        orderNo: "20180509165844246000",
                        payType: 2,
                        status:4  ,
                        updateDate: "2018-05-09 21:36:48",
                        wareIssue: "2018122"
                    }
                ];

            }

        };
    });
