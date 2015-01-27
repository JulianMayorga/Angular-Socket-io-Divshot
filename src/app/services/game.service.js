'use strict';

var appModule = angular.module('Angular-Socket-io-Divshot');

appModule.factory('ConnectFour', function($http) {

    var ConnectFour = {
        create: function() {
            return $http.post('http://four-connect.herokuapp.com/api/games');
        },
        update: function(game) {
            return $http.put('http://four-connect.herokuapp.com/api/games/1', game);
        },
        get: function() {
            return $http.get('http://four-connect.herokuapp.com/api/games/1');
        },
        dropToken: function(board, action) {

            var result = board.slice();
            var index = _.indexOf(board, _.find(board, function(row) {
                return row[action.column] === 0;
            }));
            result[index][action.column] = action.token;

            return result;
        },
        winner: function(board) {
            var result;
            var horizontal = this._horizontal(board);
            var vertical = this._vertical(board);
            var diagonal = this._diagonal(board);

            if (horizontal) {
                result = horizontal;
            } else if (vertical) {
                result = vertical;
            } else if (diagonal) {
                result = diagonal;
            } else {
                result = false;
            }

            return result;
        },
        _horizontal: function(board) {

            var result;

            var isOne = function isOne(element) {
                return (element === 1);
            };

            var isTwo = function isTwo(element) {
                return (element === 2);
            };

            var connected = function(row) {

                var rest = row.slice();
                var current = isOne;
                var result = 0;
                while (rest.length !== 0) {
                    if (R.head(rest) === 0) {
                        rest.splice(0, 1);
                    } else {
                        var straightNumbers = R.takeWhile(current, rest);
                        rest.splice(0, straightNumbers.length);
                        if (straightNumbers.length >= 4) {
                            result = straightNumbers[0];
                            break;
                        }
                        if (current.name === isOne.name) {
                            current = isTwo;
                        } else {
                            current = isOne;
                        }
                    }
                }

                return result;
            };

            var isOneOrTwo = function isOneOrTwo(element) {
                return (isOne(element) || isTwo(element));
            };

            var rows = board.map(connected);

            result = rows.filter(isOneOrTwo)[0];

            if (result !== undefined) {
                return result;
            } else {
                return 0;
            }

            return result;
        },
        _vertical: function(board) {
            var swapped = transpose(board);
            return this._horizontal(swapped);
        },
        _shiftRowsRight: function(board) {
            var expandedArray = board.map(function() {
                return R.range(0, board[0].length + 6).map(function() {
                    return 0;
                });
            });
            var offset = 5;
            board.forEach(function(row, index) {
                expandedArray[index].splice(offset, row.length, row[0], row[1], row[2], row[3], row[4], row[5]);
                offset -= 1;
            });
            return expandedArray;
        },
        _shiftRowsLeft: function(board) {
            var expandedArray = board.map(function() {
                return R.range(0, board[0].length + 6).map(function() {
                    return 0;
                });
            });
            var offset = 0;
            board.forEach(function(row, index) {
                expandedArray[index].splice(offset, row.length, row[0], row[1], row[2], row[3], row[4], row[5]);
                offset += 1;
            });
            return expandedArray;
        },
        _diagonal: function(board) {
            // Source: http://stackoverflow.com/questions/2862802/traverse-2d-array-matrix-diagonally
            var leftDiagonal = this._shiftRowsLeft(board),
                rightDiagonal = this._shiftRowsRight(board),
                result = 0;

            leftDiagonal = this._vertical(leftDiagonal);
            rightDiagonal = this._vertical(rightDiagonal);

            if (leftDiagonal) {
                result = leftDiagonal;
            } else if (rightDiagonal) {
                result = rightDiagonal;
            }

            return result;
        }
    };

    /**
     * http://www.codesuck.com/2012/02/transpose-javascript-array-in-one-line.html
     */
    var transpose = function transpose(a) {
        return Object.keys(a[0]).map(function(c) {
            return a.map(function(r) {
                return r[c];
            });
        });
    }

    return ConnectFour;
});
