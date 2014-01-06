'use strict';

describe('Directive: pieChart', function() {

    // load the module
    beforeEach(module('myApp'));

    it('should add an empty piechart container to the document body', inject(function($controller, $rootScope, $compile) {
        var scope = $rootScope.$new();
        var element = $compile('<div pi-chart values="values"></div>')(scope);
        scope.values = [{label: "unit", value: 2}];
        scope.$digest();
        expect(element.find('svg').length).toEqual(1);
    }));

    it('should fill in the piechart based on our dataset', inject(function($controller, $rootScope, $compile) {
        var scope = $rootScope.$new();
        var element = $compile('<div pi-chart values="values"><p class="arc"></p></div>')(scope);
        var svgComponent = element.find("svg");

        scope.values = [{label: "unit", value: 2}];
        scope.$digest();

        // we need jQuery for this because jQlite's find() is limited to lookups by tag name
        var arc = svgComponent.find("g.arc");
        expect(arc.text()).toEqual('unit');

        scope.values = [{label: "e2e", value: 5}, {label: "both", value: 3}];
        scope.$digest();
        var arcs = svgComponent.find("g.arc");
        expect(arcs.length).toEqual(3);
    }));
});
