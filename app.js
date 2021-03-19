'use strict'
const express = require('express');
//const app = express();

//ポート番号
const port = 8000;

//外部ファイル
const routers = require('./routes/router');
const app = require('./server');

//midleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//ビュー
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.get('/',routers.index);
app.post('/posts/logout',routers.logout);
app.post('/posts/delete',routers.delete);
app.get('/posts',routers.showboard);
//app.post('/posts',routers.addcontent);
app.get('/signup',routers.showsignup);



/*




app.post('/favicon.ico',);

app.post('/signup',);
*/

