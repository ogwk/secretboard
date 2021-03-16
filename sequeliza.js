'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
'postgres://postgres:postgres@localhost/secret_board',
{
    logging: false
}
);

//モデル定義
const Post = sequelize.define(
    'Post',
    {
        id:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },       
        content: {
            type: Sequelize.TEXT
        },
        postedBy: {
            type: Sequelize.STRING
        },
        trackingCookie: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,　//テーブルという定義したデータを保存する領域の名前を Post という名前に固定する
        timestamps: true //自動的に createdAt という作成日時と updatedAt という更新日時を自動的に追加
    }
);                   

Post.sync(); //同期
module.exports = Post;