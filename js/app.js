/*!
 * APP init
 */
var app = {};

app = angular.module("app", [
    'ui.router',
    'ngCookies',
    'ngSanitize',
    'ui.tinymce',
    'datatables'
]);

app.constant('API', {
    url: 'http://gtd.api/'
});

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider.state('app', {
            url: '/app',
            templateUrl: 'views/main.html'
        })
        .state('app.404', {
            url: '/erro/404',
            templateUrl: 'views/404.html'
        })
        .state('app.projeto-list', {
            url: '/projeto/listagem',
            templateUrl: 'views/projeto/list.html',
            controller: 'ProjetoListController'
        })
        .state('app.projeto-form', {
            url: '/projeto/cadastro/:id',
            templateUrl: 'views/projeto/form.html',
            controller: 'ProjetoFormController'
        })
        .state('app.tarefa-list', {
            url: '/tarefa/listagem',
            templateUrl: 'views/tarefa/list.html',
            controller: 'TarefaListController'
        })
        .state('app.tarefa-form', {
            url: '/tarefa/cadastro/:id',
            templateUrl: 'views/tarefa/form.html',
            controller: 'TarefaFormController'
        })
        .state('login', {
            url: '/login',
            templateUrl: "views/login.html",
            controller: 'LoginController'
        })
        .state('logout', {
            url: '/logout',
            controller: 'LogoutController'
        });
});

app.run(function($rootScope, $location, $cookies, DTDefaultOptions) {
    // Tradução Datables
    DTDefaultOptions.setLanguageSource('http://cdn.datatables.net/plug-ins/1.10.11/i18n/Portuguese-Brasil.json');

    $rootScope.location = $location;
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if ($cookies.get('token') === undefined) {
            $location.path("/login");
        }
    });
});
