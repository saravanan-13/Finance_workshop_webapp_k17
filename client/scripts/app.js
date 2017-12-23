(function(){
    'use strict';

    var states = [
        {
            name: 'header',
            state:
            {
                url:'/header',
                templateUrl: 'views/header.html',
                data: {
                    text: "header",
                    visible: false
                }
            }
        },
        {
            name: 'login',
            state:
            {
                url:'/login',
                templateUrl: 'views/login.html',
                data: {
                    text: "Login",
                    visible: false
                }
            }
        },
        {
            name: 'workshopPayment',
            state:
            {
                url:'/workshopPayment',
                templateUrl: 'views/workshopPayment.html',
                data: {
                    text: "Workshop Payment",
                    visible: false
                }
            }
        }
    ];

var app = angular.module('finance', [
        'ui.router',
        'ui.materialize',
        'ngCookies',
        'ngRoute',
        'ngSanitize',
        'ngCsv'
    ])

    .run(
        function($cookieStore, $location, $rootScope, $state){
            $rootScope.$on('$locationChangeStart', function(event, next, current, fromState, toState){
                /*console.log("at location change");
                console.log("current - " + current);
                console.log("next - " + next);*/
                var authUrl = [
                                "http://localhost:8080/#",
                                "http://localhost:8080",
                                "http://localhost:8081/#",
                                "http://localhost:8081",
                                "http://vault.kurukshetra.org.in/#",
                                "http://vault.kurukshetra.org.in"
                                ];
                var url = "";
                var index = -1, itr;
                for(itr=0; itr < authUrl.length; itr++){
                    index = next.indexOf(authUrl[itr]);
                    if(index != -1){
                        url = authUrl[itr];
                        break;
                    }
                }
               /* console.log("url - " + url);*/
                var currentUrl = current.replace(url, "");
                var nextUrl = next.replace(url, "");
                /*console.log("CurrentUrl - " + currentUrl);
                console.log("nextUrl - " + nextUrl);*/
                if ($cookieStore.get('userDetails')) {
                    var userDetails = $cookieStore.get('userDetails');
                    if(nextUrl != '/login'){
                        $location.path(nextUrl);
                    }
                    else if(currentUrl != '/'){
                        $location.path(currentUrl);
                    }
                    else{
                        $location.path('/login');
                    }
                }
                else {
                    $location.path('/login');
                }
            });

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
                /*console.log("toState" + toState.name);
                 console.log("FromState" + fromState.name);*/
                $rootScope.toState = toState.name;
                /*console.log($rootScope.fromState, $rootScope.toState);*/
                if($rootScope.toState != $rootScope.fromState){
                    $rootScope.fromState = angular.copy($rootScope.toState);
                    $state.go('login');
                }
            });
        }
    )


    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/workshopPayment');

        angular.forEach(states, function(state) {
            $stateProvider.state(state.name, state.state);
        });
    });

})();