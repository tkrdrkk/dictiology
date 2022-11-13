## cdk init で yarn を使いたい

- cdk init はデフォで npm install を実行する
- が、yarn の方が好き
- package-lock.json 削除+node_modules 削除+yarn で多分行けるけどめんどくさい
- help から--generate-only オプションを発見
- これで解決 ↓

```
cdk init -l typescript --generate-only
yarn
```

## 一旦 graphql をあきらめ api gateway + lambda + dynamodb にする

- 公式の examples があるが、ボイラープレート的に使えるわけじゃないっぽいのでコピペで頑張る
- 理解度を上げられるという前向きな理解
- これ →https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript/api-cors-lambda-crud-dynamodb/

### sdk が v2 記法なのが辛い

- v3 に読み替える
- putitem の input 記法が例の dynamodb json なのがつらすぎる

### Cognito 認証を追加

- https://docs.aws.amazon.com/cdk/api/v1/docs/aws-apigateway-readme.html#cognito-user-pools-authorizer
- cli 経由で confirmed にする https://zenn.dev/longbridge/articles/56678cbb919d61
- 認証手順
  1. ID トークンを得る
  2. API リクエストのヘッダーに`Authorization: Bearer ${idToken}`を含めて投げる

## 複数環境想定の設定

### コンテキストファイルの作成

- いつもお世話になっております →https://maku.blog/p/vx5ta85/
