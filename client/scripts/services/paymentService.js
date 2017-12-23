(function () {
    'use strict';

    angular
        .module('finance')
        .factory('PaymentService',PaymentService);

    PaymentService.$inject = ['$http', '$state', '$rootScope', '$timeout', 'ConfigService'];

    function PaymentService($http, $state, $rootScope, $timeout, ConfigService){

        var service = {};

        service.Login = Login;
        service.GetWorkshopList = GetWorkshopList;
        service.GetWorskhopDetails = GetWorkshopDetails;
        service.UpdatePayment = UpdatePayment;
        service.GetTransactionDetails = GetTransactionDetails;

        return service;

        function Login(params) {
            console.log(params);
            return $http.post(ConfigService.DumeelURI() + '/api/v1/erp/signin', params).then(handleSuccess, handleRemoteError);
        }

        function GetTransactionDetails(params){
            return $http.post(ConfigService.DumeelURI() + '/api/v1/erp/participants/registered', params).then(handleSuccess, handleRemoteError);
        }

        function GetWorkshopList(params){
            return $http.get(ConfigService.CmsURI() + '/workshops.json', params).then(handleSuccess, handleRemoteError);
        }

        function GetWorkshopDetails(params){
            console.log("----" + JSON.stringify(params));
            return $http.get(ConfigService.BaseURI()+'/ops/api/workshop/' + params ,params).then(handleSuccess,handleRemoteError);
        }

        function UpdatePayment(params) {
            return $http.post(ConfigService.DumeelURI()+'/api/v1/erp/participants/mark_paid',params).then(handleSuccess,handleRemoteError);
        }

        function handleRemoteError(data) {
            return data;
        }

        function handleSuccess(data) {
            return data;
        }

    }

})();
