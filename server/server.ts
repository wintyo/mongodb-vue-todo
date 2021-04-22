import Express from 'express';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';

import apiRouter from './apis/';

// 本番じゃない時はローカルのDBに接続する
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../mongodb/.env') });

  const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;
  mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: MONGODB_USERNAME,
    pass: MONGODB_PASSWORD,
    dbName: 'todo',
  })
    .catch((err) => {
      console.error(err);
    });
}

const app = Express();
const port = process.env.PORT || 9000;
const server = http.createServer(app);

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// static以下に配置したファイルは直リンクで見れるようにする
app.use(Express.static(path.resolve(__dirname, 'static')));

// APIの設定
app.use('/api', apiRouter);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
