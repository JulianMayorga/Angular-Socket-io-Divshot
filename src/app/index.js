'use strict';

angular.module('tatetiWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'mgcrea.ngStrap', 'btford.socket-io'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
.factory('mySocket', function (socketFactory) {
  var myIoSocket = io.connect('http://thomas-import.codio.io:8080/');

  myIoSocket = socketFactory({
    ioSocket: myIoSocket
  });

  return myIoSocket;
});
