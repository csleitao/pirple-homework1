/* handlers.js
*
* Homework 1 - PIRPLE 
* App: RESTful API implementation
* When someone posts anything to the route /hello, you should return a welcome message,
 in JSON format.This message can be anything you want.
*/

// Dependencies

// Define handlers
var handlers = {};

// Hello handler
handlers.hello = function (data, callback) {
    callback(200, { 'message': 'Welcome to the server!' });
};

// Not found handler
handlers.notFound = function (data, callback) {
    callback(404, { 'message': 'Handler not found!' });
};

module.exports = handlers;
