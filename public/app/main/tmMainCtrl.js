angular.module('app').controller('tmMainCtrl', function($scope){
    $scope.courses = [
        {name: "Fundamental Concepts of Cloud Computing", featured: true, published: new Date('06-04-2019')},
        {name: "AWS Basic", featured: true, published: new Date('06-02-2019')},
        {name: "AWS VPC Concepts", featured: true, published: new Date('06-02-2019')},
        {name: "AWS EC2", featured: false, published: new Date('06-02-2019')},
        {name: "AWS Lambda", featured: false, published: new Date('06-02-2019')},
        {name: "AWS Cloud Formation", featured: false, published: new Date('06-02-2019')}
    ];
});