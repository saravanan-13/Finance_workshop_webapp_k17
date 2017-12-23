(function(){
    'use strict';
    angular
        .module('finance')
        .controller('WorkshopPaymentController', WorkshopPaymentController);
    WorkshopPaymentController.$inject = ['$state', '$scope', '$interval', 'PaymentService', '$cookieStore'];
    function WorkshopPaymentController(state, scope, interval, PaymentService, $cookieStore){
        var ctrl = this;
        ctrl.workshopPaymentDetailLoaded = false;
        ctrl.options = ["False", "True"];
        ctrl.showPaid = 0;
        ctrl.paid = false;
        ctrl.isAdmin = false;
        getUserDetails();
        GetTransactionDetails();

        ctrl.filterByDate = function()  {
          if (ctrl.fromDate && ctrl.toDate) {
            var fromDate = ctrl.fromDate.getUTCFullYear() + "/" + (ctrl.fromDate.getMonth() +1 ) + "/"+ ctrl.fromDate.getDate();
            var toDate = ctrl.toDate.getUTCFullYear() + "/" +  (ctrl.toDate.getMonth() + 1 ) + "/"+ ctrl.toDate.getDate();
              GetTransactionDetails(fromDate, toDate)
          }else {
            Materialize.toast("Invalid Dates", 4000);
          }
        }

        function getUserDetails(){
            ctrl.userDetails = $cookieStore.get('userDetails');
          //  console.log("user -- " + JSON.stringify(ctrl.userDetails));
            ctrl.isAdmin = ctrl.userDetails.role == "fk" ? true : false;
            if(!ctrl.isAdmin){
                /*findWorkshop();*/
                ctrl.workshop = ctrl.userDetails.role;
            }
        }

        /*function findWorkshop() {
            ctrl.workshop = ctrl.userDetails.userName[0].toUpperCase();
            var match = /[_]/.exec(ctrl.userDetails.userName);
            if(match){
                //index of underscore
                ctrl.workshop = ctrl.workshop + ctrl.userDetails.userName.substr(1, match.index-1) + " " +
                    ctrl.userDetails.userName[match.index+1].toUpperCase() + ctrl.userDetails.userName.substr(match.index+2, ctrl.userDetails.userName.length-1);
            }
            else{
                ctrl.workshop = ctrl.workshop + ctrl.userDetails.userName.substr(1, ctrl.userDetails.userName.length-1);
            }
            console.log(ctrl.workshop);
        }*/

        /* PaymentService.GetWorkshopList().then(function(response){
            console.log("GetWorkshopList");
            console.log(response);
            if(response.status == 200){
                ctrl.workshopsData = response.data.workshops;
                ctrl.workshopsList = [];
                angular.forEach(ctrl.workshopsData, function (value, key) {
                    angular.forEach(value.workshops, function (value1, key1) {
                        ctrl.workshopsList.push(value1);
                    });
                });
                ctrl.workshopDataLoaded = true;
              //  console.log(ctrl.workshopsList);
                if(ctrl.isAdmin){
                    ctrl.workshop = ctrl.workshopsList[0];
                }
                ctrl.getWorkshopDetails(ctrl.workshop);
            }
            else{
                Materialize.toast("Check your Internet Connection and Try again", 3000);
            }
        }); */

        function GetTransactionDetails(fromDate=null, toDate=null) {
        //  console.log(fromDate)
        //  console.log(toDate)
          ctrl.workshopPaymentDetailLoaded = false;
          var data  = {
            "data" : {
              "token" : $cookieStore.get('userDetails').token,
            "filter" : {
              "paid" : ctrl.paid
              }
            }
          }
           if (fromDate && toDate) {
            data.data.filter['from'] = fromDate,
            data.data.filter['to'] = toDate
          }
        //  console.log(data)
          PaymentService.GetTransactionDetails(data).then(function(response){
            if (response.status == 200){
            //  console.log(response);
                ctrl.enrolledList = response.data.data
                ctrl.workshopPaymentDetailLoaded = true;

            }

          })

        }


        ctrl.submit = function() {
          ctrl.workshopPaymentDetailLoaded = false;
          ctrl.finalList =  ctrl.enrolledList.filter(function(item){
            return item.is_payed === true
          }).map(function(item){
            return item.captain_email
          })
      var data = {
        data:{
          "token": $cookieStore.get('userDetails').token,
          "paid": !ctrl.paid,
          "tid": ctrl.finalList
          }
        }
        //  console.log(data)
          PaymentService.UpdatePayment(data).then(function(response){
            if (response.status == 200){
            //    console.log(response);
                ctrl.workshopPaymentDetailLoaded = true;
                GetTransactionDetails();
            }

            else{
                Materialize.toast("Error while updating! Please Check your Internet Connection", 4000);
            }


          })

        }


      /*  ctrl.getWorkshopDetails = function(){
            ctrl.showPaid = 0;
            ctrl.workshopPaymentDetailLoaded = false;
          //  console.log("workshop - " + JSON.stringify(ctrl.workshop));
          //  ctrl.workshopPaymentDetail = response.data.participantInfo;
          //  ctrl.workshopPaymentDetailLoaded = true;
             /*PaymentService.GetWorskhopDetails(ctrl.workshop).then(function(response){
                console.log(response);
                if(response.status == 200){
                    ctrl.workshopPaymentDetail = response.data.participantInfo;
                    ctrl.workshopPaymentDetailLoaded = true;
                    printToday();
                }
                else{
                    Materialize.toast("Check your Internet Connection and Try again", 3000);
                }
            }); */

        ctrl.switch = function(){
          ctrl.workshopPaymentDetailLoaded = false;
          var data  = {
            "data" : {
              "token" : $cookieStore.get('userDetails').token,
              "filter"  : {
                "paid" : ctrl.paid
              }
            }
          }
  //        console.log(data)
          PaymentService.GetTransactionDetails(data).then(function(response){
            if (response.status == 200){
              //  console.log(response);
                ctrl.enrolledList = response.data.data
                ctrl.workshopPaymentDetailLoaded = true;
            //    console.log(ctrl.enrolledList)
            }

            else{
                Materialize.toast("Error while updating! Please Check your Internet Connection", 4000);
            }

          })
        };

    }

})();
