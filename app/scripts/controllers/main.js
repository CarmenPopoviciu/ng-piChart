'use strict';

angular.module('myApp')
  .controller('MainCtrl',['$scope', 'AppService', function ($scope, AppService) {
        var UNIT_CODE = "UNIT";
        var E2E_CODE = "E2E";
        var BOTH_CODE = "BOTH";
        var NONE_CODE = "NONE";

        $scope.unitCode = UNIT_CODE;
        $scope.e2eCode = E2E_CODE;
        $scope.bothCode = BOTH_CODE;
        $scope.noneCode = NONE_CODE;

        // piechart config params
        $scope.height = 400;
        $scope.width = 400;
        $scope.values = [];

        // total number of people who test their apps
        $scope.total = 0;

        /**
         * @param {String} code The test code (unit/e2e/both/none)
         * @param {String} value The number of people who <code> test their app
         * @return void
         *
         * @description
         * The method updates the values that will be represented in the piechart based on the values entered by the
         * user. The values array contains items of type {label: the_test_code, value: number_of_people}.
         *
         * If an element with the given code does not exist in the array, it will be added. If it does exist, then the
         * element is updated. Items whose values are zero, will be represented in the chart, but those with undefined
         * values will not.
         */
        $scope.updateValues = function(code, value) {
            var val = value ? Number(value) : undefined;
            var item = {label: code.toLowerCase(), value: val};
            var index = AppService.findObjectByPropertyValue('label', item.label, $scope.values);

            if(index === -1) {
                // add only valid values
                if(item.value != undefined) {
                    $scope.values.push(item);
                }
            }
            else {
                // update
                if(item.value != undefined) {
                    $scope.values[index].value = item.value;
                }
                // remove, because we don't want to show undefined values
                else {
                    $scope.values.splice(index, 1);
                }
            }
        };

        $scope.$watch('values', function(values) {
            $scope.total = 0;
            for(var i=0; i<values.length; i++) {
                if((values[i].label !== 'none') && values[i].value) {
                    $scope.total = $scope.total + values[i].value;
                }
            }
        }, true);
  }]);
