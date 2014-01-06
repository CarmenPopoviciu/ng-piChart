'use strict';

describe('Service: AppService', function() {
    var service;
    var array;

    // load the module
    beforeEach(module('myApp'));

    beforeEach(inject(function(AppService) {
        service = AppService;
        array = [{id: 1, name: "Anna", age: "23"}, {id: 2, name: "Dan", age: "25"}, {id: 3, name: "John", age: "15"}];
    }));

    describe('findObjectByPropertyValue(propName, propValue, array)', function() {
        it('should return the index of the element in a given array, which has an own property "propName" with value "propValue"', function() {
            expect(service.findObjectByPropertyValue('age', '15', array)).toEqual(2);
            expect(service.findObjectByPropertyValue('name', 'Dan', array)).toEqual(1);
            expect(service.findObjectByPropertyValue('id', 1, array)).toEqual(0);
        });

        it('should return -1 if there is no element in the given array with property "propName" set to "propValue"', function() {
            expect(service.findObjectByPropertyValue('id', 5, array)).toEqual(-1);
            expect(service.findObjectByPropertyValue('age', "30", array)).toEqual(-1);
        });

        it('should return -1 if there is no element in the given array with property "propName"', function() {
            expect(service.findObjectByPropertyValue('address', 'NL', array)).toEqual(-1);
        });

        it('should return -1 if there is no element in the given array with an own property "propName" set to "propValue"', function() {
            var elem = {id: 5, name: "Dan"};
            var childElem = {};
            childElem.__proto__ = elem;
            var array = [{id: 1, name: "Anna"}, childElem];
            expect(service.findObjectByPropertyValue('id', 5, array)).toEqual(-1);
        });
    });
});

