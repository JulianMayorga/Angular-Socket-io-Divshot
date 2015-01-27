'use strict';

describe('Connect Four Service', function() {

    var connectFour, httpBackend;

    beforeEach(module('Angular-Socket-io-Divshot'));
    beforeEach(inject(function($rootScope, $injector, _ConnectFour_) {

        httpBackend = $injector.get('$httpBackend');
        connectFour = _ConnectFour_;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should exist', function() {

        expect(connectFour).toBeDefined();
    });

    describe('#drop', function() {

        it('should put a number on the bottom of its column', function() {
            var board = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            var firstBoard = [
                [1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            var secondBoard = [
                [1, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            var thirdBoard = [
                [1, 1, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            var fourthBoard = [
                [1, 1, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour.dropToken(board, {
                token: 1,
                column: 0
            })).toEqual(firstBoard);
            expect(connectFour.dropToken(board, {
                token: 2,
                column: 0
            })).toEqual(secondBoard);
            expect(connectFour.dropToken(board, {
                token: 1,
                column: 1
            })).toEqual(thirdBoard);
            expect(connectFour.dropToken(board, {
                token: 2,
                column: 6
            })).toEqual(fourthBoard);
        });
    });

    describe('#winner', function() {

        it('should be false if the board does not have four connected tokens', function() {

            var board = [
                [1, 1, 1, 0, 0, 0, 0],
                [2, 2, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour.winner(board)).toEqual(false);
        });

        it('should determine a winner if he has connected four horizontal tokens', function() {

            var board = [
                [1, 1, 1, 1, 0, 0, 0],
                [2, 2, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour.winner(board)).toEqual(1);
        });

        it('should determine a winner if he has connected four horizontal tokens', function() {

            var board = [
                [1, 1, 1, 0, 0, 0, 0],
                [1, 2, 2, 0, 0, 0, 0],
                [1, 2, 0, 0, 0, 0, 0],
                [1, 2, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour.winner(board)).toEqual(1);
        });

        it('should determine a winner if he has connected four diagonal tokens', function() {

            var board = [
                [1, 1, 1, 0, 0, 0, 0],
                [1, 1, 2, 0, 0, 0, 0],
                [1, 2, 1, 0, 0, 0, 0],
                [2, 2, 2, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour.winner(board)).toEqual(1);
        });
    });

    describe('#_horizontal', function() {

        it('should return the token if there are four horizontal ones connected', function() {

            var board = [
                [1, 1, 1, 1, 0, 0, 0],
                [2, 2, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._horizontal(board)).toEqual(1);
        });

        it('should return the token if there are four horizontal twos connected', function() {

            var board = [
                [1, 1, 1, 0, 0, 0, 0],
                [2, 2, 2, 2, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._horizontal(board)).toEqual(2);
        });

        it('should return 0 if there are not four horizontal tokens connected', function() {

            var board = [
                [1, 1, 1, 0, 0, 0, 0],
                [2, 2, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._horizontal(board)).toEqual(0);
        });

        it('should return 0 on a board with more rows', function() {
            var board = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 2, 0, 0],
                [0, 0, 1, 2, 0, 0],
                [0, 1, 2, 2, 0, 0],
                [0, 1, 1, 1, 0, 0],
                [0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [2, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._horizontal(board)).toEqual(0);
        });
    });

    describe('#_vertical', function() {

        it('should return the token if there are four vertical ones connected', function() {

            var board = [
                [1, 1, 1, 0, 0, 0, 0],
                [1, 2, 2, 0, 0, 0, 0],
                [1, 2, 0, 0, 0, 0, 0],
                [1, 2, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._vertical(board)).toEqual(1);
        });

        it('should return the token if there are four vertical twos connected', function() {

            var board = [
                [1, 2, 1, 0, 0, 0, 0],
                [1, 2, 2, 0, 0, 0, 0],
                [1, 2, 0, 0, 0, 0, 0],
                [2, 2, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._vertical(board)).toEqual(2);
        });

        it('should return 0 if there are not four vertical tokens connected', function() {

            var board = [
                [1, 1, 1, 0, 0, 0, 0],
                [2, 2, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._vertical(board)).toEqual(0);
        });

        it('should return 0 on a bigger board', function() {
            var board = [
                [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 2, 0, 1, 0, 0, 0],
                [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._vertical(board)).toEqual(0);
        });
    });

    describe('#_diagonal', function() {

        it('should return the token if there are four diagonal ones connected', function() {

            var board = [
                [1, 1, 1, 0, 0, 0, 0],
                [1, 1, 2, 0, 0, 0, 0],
                [1, 2, 1, 0, 0, 0, 0],
                [2, 2, 2, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._diagonal(board)).toEqual(1);
        });

        it('should return the token if there are four diagonal twos connected', function() {

            var board = [
                [0, 0, 0, 2, 0, 0, 0],
                [1, 1, 2, 0, 1, 0, 0],
                [1, 2, 1, 0, 0, 0, 0],
                [2, 2, 2, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._diagonal(board)).toEqual(2);
        });

        it('should return 0 if there are not four diagonal tokens connected', function() {

            var board = [
                [1, 1, 1, 0, 0, 0, 0],
                [2, 2, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._diagonal(board)).toEqual(0);
        });
    });

    describe('#_shiftRowsRight', function() {

        it('should shift rows right', function() {

            var board = [
                [1, 1, 1, 0, 0, 0, 0],
                [1, 1, 2, 0, 0, 0, 0],
                [1, 2, 1, 0, 0, 0, 0],
                [2, 2, 2, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            var shifted = [
                [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._shiftRowsRight(board)).toEqual(shifted);
        });
    });

    describe('#_shiftRowsLeft', function() {

        it('should shift rows left', function() {

            var board = [
                [0, 0, 0, 2, 0, 0, 0],
                [1, 1, 2, 0, 1, 0, 0],
                [1, 2, 1, 0, 0, 0, 0],
                [2, 2, 2, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            var shifted = [
                [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 2, 0, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 2, 2, 2, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
            expect(connectFour._shiftRowsLeft(board)).toEqual(shifted);
        });
    });

    describe('#create', function() {

        it('should POST to /games', function() {

            httpBackend.expectPOST('http://four-connect.herokuapp.com/api/games').respond({
                winner: 0,
                nextTurn: 1,
                board: [
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]
                ]
            });
            connectFour.create().success(function(game) {

                expect(game.winner).toBe(0);
                expect(game.nextTurn).toBe(1);
            });
            httpBackend.flush();
        });
    });

    describe('#update', function() {

        it('should PUT to /games/{playerId}', function() {

            var updatedBoard = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0]
            ];
            httpBackend.expectPUT('http://four-connect.herokuapp.com/api/games/1').respond({
                winner: 0,
                nextTurn: 2,
                board: updatedBoard
            });

            connectFour.update(updatedBoard).success(function(game) {

                expect(game.winner).toBe(0);
                expect(game.nextTurn).toBe(2);
            });
            httpBackend.flush();
        });

        it('should PUT to /games/{playerId}', function() {

            var updatedBoard = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0]
            ];
            var ids = {
                gameId: 1,
                playerId: 1
            };
            httpBackend.expectPUT('http://four-connect.herokuapp.com/api/games/1').respond({
                winner: 0,
                nextTurn: 2,
                board: updatedBoard
            });

            connectFour.update(ids, updatedBoard).success(function(game) {

                expect(game.winner).toBe(0);
                expect(game.nextTurn).toBe(2);
            });
            httpBackend.flush();
        });
    });

    describe('#get', function() {

        it('should GET to /games/{playerId}', function() {

            var board = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
            httpBackend.expectGET('http://four-connect.herokuapp.com/api/games/1').respond({
                winner: 0,
                nextTurn: 1,
                board: board
            });

            connectFour.get().success(function(game) {

                expect(game.winner).toBe(0);
                expect(game.nextTurn).toBe(1);
            });
            httpBackend.flush();
        });
    });
});
