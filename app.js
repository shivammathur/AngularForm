var flag = true;
$baseurl = ""; //base url

angular.module('formApp', ['ngAnimate', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider

    // route to show our basic form (/form)
    .state('form', {
    	url: '/form',
    	templateUrl: $baseurl + './form.html',
    	controller: 'formController'
    })

    // nested states 
    // each of these sections will have their own view
    // url will be nested (/form/q1)
    .state('form.q1', {
    	url: '/q1',
    	templateUrl: $baseurl + './q1.html'
    })

    // more questions can be added here

        // url will be  (/form/good)
        .state('form.good', {
        	url: '/good',
        	templateUrl: $baseurl + './good.html'
        })
    //$locationProvider.html5Mode(true);
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/q1');

})

.controller('formController', function($scope, $rootScope, $http) {

    // we will store all of our form data in this object
    $scope.formData = {};

    // function to process the form
    $scope.processForm = function() {
    	$http({
    		method  : 'POST',
    		url     : $baseurl+'/ng-process.php',
    		data    : jQuery.param($scope.formData),
    		headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    	})
    	.success(function(data) {
    		console.log(data);
    	});
    };

    $scope.checkdata = function() {
    	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	var re1 = /^[789]\d{9}$/i;

    	if (document.getElementById('name').value == "") {
    		document.getElementById('nameerror').style.display = "block";
    		flag = false;
    	}
    	if (document.getElementById('phone').value == "") {
    		document.getElementById('phoneerror').style.display = "block";
    		flag = false;
    	}
    	if (document.getElementById('phone').value != "" && re1.test(document.getElementById('phone').value) == false) {
    		document.getElementById('phoneerror1').style.display = "block";
    		flag = false;
    	}
    	if (document.getElementById('area').value == "") {
    		document.getElementById('areaerror').style.display = "block";
    		flag = false;
    	}
    	if (document.getElementById('email').value == "") {
    		document.getElementById('emailerror').style.display = "block";
    		flag = false;
    	}
    	if (document.getElementById('email').value != "" && re.test(document.getElementById('email').value) == false) {
    		document.getElementById('emailerror1').style.display = "block";
    		flag = false;
    	}
    	if (document.getElementById('name').value != "") {
    		document.getElementById('nameerror').style.display = "none";
    	}
    	if (document.getElementById('phone').value != "") {
    		document.getElementById('phoneerror').style.display = "none";
    	}
    	if (document.getElementById('area').value != "") {
    		document.getElementById('areaerror').style.display = "none";
    	}
    	if (document.getElementById('email').value != "") {
    		document.getElementById('emailerror').style.display = "none";
    	}
    	if (document.getElementById('email').value != "" && re.test(document.getElementById('email').value) != false) {
    		document.getElementById('emailerror1').style.display = "none";
    	}
    	if (document.getElementById('name').value != "" && document.getElementById('phone').value != "" && document.getElementById('area').value != "" && document.getElementById('email').value != "" && re.test(document.getElementById('email').value) != false && re1.test(document.getElementById('phone').value) != false) {
    		flag = true;
    	}

    };

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    	if(flag == false)
    		event.preventDefault();
    });

});