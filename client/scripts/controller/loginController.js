(function(){
    'use strict';
    angular
        .module('finance')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$state', '$scope', '$interval', 'PaymentService', '$cookieStore', '$window', '$route', '$rootScope'];
    function LoginController($state, $scope, interval, PaymentService, $cookieStore, $window, $route, $rootScope){
        var ctrl = this;
        ctrl.title = "Login Page";
        ctrl.loggedIn = false;
        ctrl.showCount = true;
        checkForCookies();

        function checkForCookies() {
          if($cookieStore.get('userDetails')){
              ctrl.loggedIn = true;
              Materialize.toast("Logged In", 3000);
          }
        }

        /*ctrl.checkForCookies = function(){
            ctrl.loggedIn = !ctrl.loggedIn;
        };*/

        ctrl.login = function(){
            var loginObj = {
                data : {

                    email: ctrl.email,
                    password: ctrl.password
                }
            };
            PaymentService.Login(loginObj).then(function(response){
                /*console.log(JSON.stringify(response));*/
                if(response.status === 200) {
          //          console.log(response);
                    response.data.details['token'] = response.data.token;
                    $cookieStore.put('userDetails', response.data.details);
                    checkForCookies();
                    $state.go('workshopPayment');
                    $route.reload();
                    /*Materialize.toast("Successfully Logged in!", 3000);*/
                }
                else{
                    Materialize.toast("Invalid Username or Password", 3000);
                }
            });
        };

        ctrl.logout = function(){
            $cookieStore.put('userDetails', '');
            $state.go('login');
            ctrl.loggedIn = false;
        };

    }

})();
