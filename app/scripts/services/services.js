'use strict';

angular.module('myApp')
    .factory('AppService', function() {
        return {
            // just for the sake of the example ;)
            findObjectByPropertyValue: function(propName, propValue, array) {
                var index = -1;
                var elem;
                for(var i=0; i<array.length; i++) {
                    elem = array[i];
                    if(elem.hasOwnProperty(propName) && (elem[propName] === propValue)) {
                        index = i;
                        break;
                    }
                }
                return index;
            }
        }
    });
