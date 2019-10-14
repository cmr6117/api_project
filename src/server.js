const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    jsonHandler.addUser(request, response, bodyParams);
  });
};


const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
    
  if (request.method === 'POST' && parsedUrl.pathname === '/addUser') { //List Submit
    parseBody(request, response);
  } else if (parsedUrl.pathname === '/') { //App Page
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/style.css') { //Stylesheet
    htmlHandler.getStyle(request, response);
  } else if (parsedUrl.pathname === '/media/background.jpg') { //Background For App
    htmlHandler.getImage(request, response);
  } else if (parsedUrl.pathname === '/getUsers') { //List Request
    jsonHandler.getUsers(request, response, parsedUrl.query);
  } else {
    jsonHandler.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
