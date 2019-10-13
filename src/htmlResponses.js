const fs = require('fs');

const client = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);
const image = fs.readFileSync(`${__dirname}/../client/media/background.jpg`);


const getIndex = (request, response) => {
  const headers = {
    'Content-Type': 'text/html',
  };

  response.writeHead(200, headers);
  response.write(client);
  response.end();
};

const getStyle = (request, response) => {
  const headers = {
    'Content-Type': 'text/css',
  };

  response.writeHead(200, headers);
  response.write(style);
  response.end();
};

const getImage = (request, response) => {
  const headers = {
    'Content-Type': 'image/jpeg',
  };

  response.writeHead(200, headers);
  response.write(image);
  response.end();
};

module.exports = {
  getIndex,
  getStyle,
  getImage,
};
