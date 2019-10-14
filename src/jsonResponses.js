const uuidv1 = require('uuid/v1');

const users = { "0":"New UUID" };

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};


const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};


const getUsers = (request, response) => {
  if (request.method === 'HEAD') {
    return respondJSONMeta(request, response, 200);
  }

  return respondJSON(request, response, 200, { users });
};

const addUser = (request, response, params) => {
  if (!params.list) {
    const responseJSON = {
      message: 'An Error Ocurred. List is invalid.',
      id: 'badrequest',
    };

    return respondJSON(request, response, 400, responseJSON);
  }
  
  let uuidData = params.uuid;
  let listData = params.list;
  
  if (users[params.uuid] == null){
      uuidData = uuidv1();
  }

  let responseCode = 201;

  if (users[params.uuid]) {
    responseCode = 204;
  } else {
    users[params.uuid] = {};
    users[params.uuid].uuid = params.uuid;
  }

  users[params.uuid].list = params.list;

  if (responseCode === 204) {
    return respondJSONMeta(request, response, responseCode);
  }

  const responseJSON = {
    message: 'Successfully saved ',
    uuid: uuidData,
  };

  return respondJSON(request, response, responseCode, responseJSON);
};

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
