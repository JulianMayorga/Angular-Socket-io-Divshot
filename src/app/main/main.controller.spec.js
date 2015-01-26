'use strict';
describe('controllers', function() {
    var scope, socketMock;
    beforeEach(module('Angular-Socket-io-Divshot'));
    beforeEach(inject(function($rootScope) {
                socketMock = new sockMock($rootScope);
        scope = $rootScope.$new();
    }));
    it('should define more than 5 awesome things', inject(function($controller) {
        expect(scope.awesomeThings).toBeUndefined();
        $controller('MainCtrl', {
            $scope: scope,
            mySocket: socketMock
        });
        expect(angular.isArray(scope.awesomeThings)).toBeTruthy();
        expect(scope.awesomeThings.length > 5).toBeTruthy();
    }));
    it('should add to scope the name it receives from the socket', inject(function($controller) {
        $controller('MainCtrl', {
            $scope: scope,
            mySocket: socketMock
        });
        socketMock.receive('socket:send:name', {
            name: 'Bob'
        });
        scope.$apply();
        expect(scope.name).toEqual('Bob')
    }));
});
