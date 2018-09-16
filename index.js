/* index.js
*
* Homework 1 - PIRPLE 
* App: RESTful API implementation
* When someone posts anything to the route /hello, you should return a welcome message,
 in JSON format.This message can be anything you want.
*/

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var handlers = require('./handlers');

// Instantiating the http server
var httpServer = http.createServer(function(req, res){
  // Get the URL and path
  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the HTTP request method, query string, headers and payload payload
  var method = req.method.toLowerCase();
  var queryStringObject = parsedUrl.query;
  var headers = req.headers;
  var decoder = new StringDecoder('utf-8');

  // Receiving data Event: Receives the stream and decode it
  var buffer = '';
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });

  // End of data Event: After the end of the stream
  req.on('end', function () {
    buffer += decoder.end();

    // Choose the handler to use
    var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct data object to send to the handler
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload) {
      // Use the status code called back by the handler, or default to 200
      statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

      // Use the payload called back by the handler, or default to an empty object
      payload = typeof (payload) == 'object' ? payload : {};
      var payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
});

// Start the http server
httpServer.listen(3000, function(){
  console.log('The HTTP server is listening on the port 3000.');
});

// Define a request router
var router = {
  'hello': handlers.hello
};
