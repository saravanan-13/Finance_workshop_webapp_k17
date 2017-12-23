(function () {
    'use strict';

    angular
        .module('finance')
        .factory('ConfigService', ConfigService);

    ConfigService.$inject = ['$http','$rootScope'];
    function ConfigService($http,$rootScope) {
        var service={};
        var server = {
            "local": "localhost",
            "shinigami" : "shinigami.kurukshetra.org.in",
            "dumeel" : "pk9397.co",
            "cms" : "cms.kurukshetra.org.in",
            "port": "8080"
        };
        service.BaseURI = BaseURI;
        service.CmsURI = CmsURI;
        service.DumeelURI = DumeelURI;
        return service;

        function BaseURI()
        {
            return "http://"+server.shinigami;
        }

        function DumeelURI()
        {
            return "https://"+server.dumeel;
        }

        function CmsURI()
        {
            return "http://"+server.cms;
        }

    }
})();
