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
    var apiUrl;
    if (window.__env) {
        apiUrl = window.__env.API_URL
    } else {
        apiUrl = 'http://thomas-import.codio.io:8080/';
    }
  var myIoSocket = io.connect(apiUrl);

  myIoSocket = socketFactory({
    ioSocket: myIoSocket
  });

  return myIoSocket;
});
