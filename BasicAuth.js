'use strict';
const auth = require('basic-auth');
const admins = {
  name: 'username',
  password: 'hogehoge'
};
 
exports.login = (request, response, next) => {
  const user = auth(request);
  if(!user || admins.name !== user.name|| admins.password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="example"');
    console.log(response.status);
    return response.status(401).send();
  }else{
    return next();
  }
};


exports.logout = (request, response) => {
    response.set('WWW-Authenticate', 'Basic realm="example"');
    console.log(response.status);    
    return response.status(401).send();
};

exports.getuser = (request, response) => {
  const user = auth(request);
  console.log(user);
  return user;
}