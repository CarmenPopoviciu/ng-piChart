'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('myApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, AppService) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope,
            AppService: AppService
        });
    }));

    it('should update the chart values when a new value is filled in', function () {
        expect(scope.values.length).toEqual(0);

        // add
        scope.updateValues('unit', "5");
        expect(scope.values).toEqual([{label: "unit", value: 5}]);

        // add
        scope.updateValues('e2e', "8");
        expect(scope.values).toEqual([{label: "unit", value: 5}, {label: "e2e", value: 8}]);

        // update
        scope.updateValues('e2e', "0");
        expect(scope.values).toEqual([{label: "unit", value: 5}, {label: "e2e", value: 0}]);

        // remove
        scope.updateValues('e2e', undefined);
        expect(scope.values).toEqual([{label: "unit", value: 5}]);

        // undefined values
        scope.updateValues('both', undefined);
        expect(scope.values).toEqual([{label: "unit", value: 5}]);
    });

    it('should update the total number of people who are testing their apps, when a new value is filled in', function() {
        expect(scope.total).toEqual(0);

        scope.updateValues('e2e', "8");
        scope.$digest();
        expect(scope.total).toEqual(8);

        scope.updateValues('both', "2");
        scope.$digest();
        expect(scope.total).toEqual(10);

        scope.updateValues('none', "5");
        scope.$digest();
        expect(scope.total).toEqual(10);
    });
});
