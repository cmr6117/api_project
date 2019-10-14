const uuidv1 = require('uuid/v1'); //npm install uuid, used to generate unique ids

const users = { "0":"New UUID" }; //List Storage

//Full Response
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

//Metadata Response
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

//Recalls a list via its UUID
const getUsers = (request, response, uuid) => {
  if (request.method === 'HEAD') {
    return respondJSONMeta(request, response, 200);
  }
  if(users[uuid] == null){
    const responseJSON = {
      message: 'An Error Ocurred. Invalid ID.',
      id: 'badrequest',
    };
    return respondJSON(request, response, 400, responseJSON);
  }
  return respondJSON(request, response, 200, { "list":users[uuid].list, "uuid":uuid });
};

//Generates a new UUID and saves list under it
const addUser = (request, response, params) => { 
  if (!params.list) {
    const responseJSON = {
      message: 'An Error Ocurred. List is invalid.',
      id: 'badrequest',
    };

    return respondJSON(request, response, 400, responseJSON);
  }
  
  let uuidData = uuidv1();
  
  let responseCode = 201;

  if (users[uuidData]) {
    responseCode = 204;
  } else {
    users[uuidData] = {};
    users[uuidData].uuid = uuidData;
  }

  users[uuidData].list = params.list;

  const responseJSON = {
    message: 'Successfully saved ',
    uuid: uuidData,
  };
  return respondJSON(request, response, responseCode, responseJSON);
};

//Resource not found
const notFound = (request, response) => {
  if (request.method === 'HEAD') {
    return respondJSONMeta(request, response, 404);
  }

  const responseJSON = {
    message: 'resource not found',
    id: 'notfound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  addUser,
  notFound,
};
