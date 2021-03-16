'use strict'
const express = require('express');
const app = express();

//外部ファイル
const BasicAuth = require('./BasicAuth');

//ポート番号
const port = 8000;

//Basic認証
const auth = require('basic-auth');

//ミドルウェア
app.use(BasicAuth.login);

app.listen(port);
console.log("server starting...");

module.exports = app;