'use strict';

angular.module('myApp')
    /**
     *  d3.js pie chart integration
     *
     *  @param {Array} values An array of objects with 'label' and 'value' properties
     *  @param {Number} width The width of the pie chart
     *  @param {Number} height The height of the pie chart
     *
     *  @example <div pi-chart values="values" height="height" width="width"></div>
     */
    .directive('piChart', ['$filter', function($filter) {
        return {
            restrict: 'A',
            scope: {
                values: '=',
                width: '=',
                height: '='
            },
            link: function(scope, elem, attrs, ctrl) {
                var radius = Math.min(scope.width, scope.height) / 2;
                var color = d3.scale.ordinal().range(["#98abc5", "#7b6888", "#a05d56", "#d0743c"]);

                var arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);

                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d) { return d.value; });

                // append the svg component to our element
                // we do this just once and afterwards we can update it every time our values change
                d3.select(elem[0]).append("svg")
                    .attr("width", 0)
                    .attr("height", 0);

                scope.$watch('values', function(values) {
                    if(values.length === 0) {
                        var svg = d3.select(elem[0]).select("svg");
                        svg.remove(); // if there's nothing to display, just remove the svg element
                    }
                    if (values.length > 0) {
                        // make sure we're using numbers and not strings
                        angular.forEach(values, function (value) {
                            value.value = +value.value;
                        });

                        // display values in descending order
                        // this ensures that zero values will be visible on the chart
                        values = $filter('orderBy')(values, 'value', 'reverse');

                        if(d3.select(elem[0]).select("svg")[0][0] !== null) {
                            // if the svg component is there, use it
                            var svg = d3.select(elem[0]).select("svg")
                                .attr("width", scope.width)
                                .attr("height", scope.height)
                                .append("g")
                                .attr("transform", "translate(" + scope.width / 2 + "," + scope.height / 2 + ")");
                        }
                        else {
                            // otherwise append a new one
                            var svg = d3.select(elem[0]).append("svg")
                                .attr("width", scope.width)
                                .attr("height", scope.height)
                                .append("g")
                                .attr("transform", "translate(" + scope.width / 2 + "," + scope.height / 2 + ")");
                        }

                        var g = svg.selectAll(".arc")
                            .data(pie(values))
                            .enter().append("g")
                            .attr("class", "arc");

                        g.append("path")
                            .attr("d", arc)
                            .style("fill", function (d) {
                                return color(d.data.label);
                            });

                        g.append("text")
                            .attr("transform", function (d) {
                                return "translate(" + arc.centroid(d) + ")";
                            })
                            .attr("dy", ".35em")
                            .style("text-anchor", "middle")
                            .text(function (d) {
                                return d.data.label;
                            });
                    }
            }, true);
        }
    }}]);
