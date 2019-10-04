const users = {};

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
  if (!params.name || !params.age) {
    const responseJSON = {
      message: 'name and age are both required',
      id: 'badrequest',
    };

    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[params.name]) {
    responseCode = 204;
  } else {
    users[params.name] = {};
    users[params.name].name = params.name;
  }

  users[params.name].age = params.age;

  if (responseCode === 204) {
    return respondJSONMeta(request, response, responseCode);
  }

  const responseJSON = {
    message: 'created successfully',
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
