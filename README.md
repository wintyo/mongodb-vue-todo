# MongoDBを使ったTODOリストアプリ

## 環境
+ Node: 14.15.x
+ Docker

### MongoDBの起動
`yarn mongodb:start` でMongoDBを立ち上げる。  
データの確認は`localhost:8081`にアクセスすると見れる。  

終了する際は `yarn mongodb:stop` を実行。  

### サーバーの起動
`yarn server` を実行すると`localhost:9000`でサーバーが立ち上がる。  
