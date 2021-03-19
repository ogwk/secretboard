'use strict';

const express = require('express');
const app = express();

const auth = require('basic-auth');


//cookie
const Cookies = require('cookies');
const trackingIdKey = 'tracking_id';


app.use(express.json())

//外部ファイル
const BasicAuth = require('../BasicAuth');
const Post = require('../sequeliza');

exports.index = async function(req, res){
    console.log('index');
    const user = BasicAuth.getuser;
    const cookies = new Cookies(req,res);

    await addtrackingcookie(cookies);

    Post.findAll().then(posts => {
        res.render('board',{
            posts:posts,
            user:user.name
        });
    })
}

exports.showboard = function(req, res){
    console.log('shoboard');

    
    res.redirect('board');
}

exports.addcontent = function(req, res){
    console.log('addcontent');
    const content = req.body.content;
    const cookies = new Cookies(req,res);
    const user = BasicAuth.getuser;
    if(content !== ''||!content){
        //データ作成
        Post.create({
            content: content,
            trackingCookie: cookies.get(trackingIdKey),
            postedBy: user.name
        }).then(() => {
            res.redirect('/');
        }).catch((e) =>{
            console.log(e);
        });
    }
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

exports.delete = function(req, res){
    console.log('delete');
    const user = BasicAuth.getuser;
    Post.findByPk(req.body.id)
    .then((post) => {
        console.log(user);
        if (user.name === post.postedBy){
            post.destroy().then(() =>{
                res.redirect('/');
            });
        }
    })
    .catch(e => {
        console.log('error' + e);
    });
}


function addtrackingcookie(cookies){
    if(!cookies.get(trackingIdKey)){
        const trackingId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        const tomorrow = new Date(Date.now() + (1000 * 60 * 60 * 24));
        cookies.set(trackingIdKey, trackingId, { expires: tomorrow });
    }
}
