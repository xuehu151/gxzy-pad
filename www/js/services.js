angular.module ('starter.services', [])

    .factory ('locals', ['$window', function ($window) {
        return {
            //存储单个属性
            set : function (key, value) {
                $window.localStorage[key] = value;
            },
            //读取单个属性
            get : function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            //存储对象，以JSON格式存储
            setObject : function (key, value) {
                $window.localStorage[key] = JSON.stringify (value);
            },
            //读取对象
            getObject : function (key) {
                return JSON.parse ($window.localStorage[key] || '{}');
            }
        }

    }])
    //初始化接口
    .factory('$loginService', function($http, $util) {
        return {
            login: function(data, token) {
                token = token || '';
                return $util.httpPostRequest($util.getHttpURL().loginUrl, data, token);
            }

        };
    })

    //排列三投注
    .factory('BettingService', function($http, $util) {
        return {
            pl3BetAdd: function(data, token) {
                return $util.httpPostRequest($util.getHttpURL().pl3AddUrl, data, token);
            },
            pl5BetAdd: function(data, token) {
                return $util.httpPostRequest($util.getHttpURL().pl5AddUrl, data, token);
            },
            dltBetAdd: function(data, token) {
                return $util.httpPostRequest($util.getHttpURL().dltAddUrl, data, token);
            },
            pl3addAuto: function(data, token) {
                return $util.httpPostRequest($util.getHttpURL().pl3addAutoUrl + '?token=' + token, data);
            }

        };
    })

    //获取期号
    .factory('getWareIssueService', function($http, $util) {
        return {
            getWareIssue: function(data, token) {
                console.info(token);
                return $util.httpPostRequest($util.getHttpURL().getWareIssueUrl, data, token);
            }
        };
    });
