'use strict';
const auth = require('basic-auth');
const admins = {
  'username': {password: 'hogehoge'},
};
 
exports.login = (request, response, next) => {
  const user = auth(request);
  if(!user || !admins[user.name] || admins[user.name].password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="example"');
    console.log(response.status);
    return response.status(401).send();
  }else{
    return next();
    console.log('Access Success!');
  }
};


exports.logout = (request, response) => {
    response.set('WWW-Authenticate', 'Basic realm="example"');
    console.log(response.status);    
    return response.status(401).send();
};
