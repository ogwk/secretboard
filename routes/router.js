'use strict';

const express = require('express');
const app = express();

const auth = require('basic-auth')

//cookie
const Cookies = require('cookies');
const trackingIdKey = 'tracking_id';


app.use(express.json())

//外部ファイル
const BasicAuth = require('../BasicAuth');
const Post = require('../sequeliza');

exports.index = async function(req, res){
    //console.log(res);
    const cookies = new Cookies(req,res);

    await addtrackingcookie(cookies);

    Post.findAll().then(posts => {
        console.log(posts.rowCount);
        res.render('board',{posts:posts});
    })
}

exports.showboard = function(req, res){


    
    res.redirect('board');
}

exports.addcontent = function(req, res){
    const content = req.body.content;
    const cookies = new Cookies(req,res);
    console.log(cookies.get(trackingIdKey));

    //データ作成
    Post.create({
        content: content,
        trackingCookie: cookies.get(trackingIdKey),
        postedBy: req.user
    }).then(() => {
        res.redirect('/');
    }).catch((e) =>{
        console.log(e);
    });

    
    //res.redirect('board',{content:content});
}

exports.showsignup = function(req, res){
    res.render('signup');
}


exports.logout = function(req, res){
    BasicAuth.logout;


    res.header('Content-Type', 'text/plain;charset=utf-8');
    res.end('ログアウトしました');
    //console.log(res);
}




function addtrackingcookie(cookies){
    if(!cookies.get(trackingIdKey)){
        const trackingId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        const tomorrow = new Date(Date.now() + (1000 * 60 * 60 * 24));
        cookies.set(trackingIdKey, trackingId, { expires: tomorrow });
    }
}
